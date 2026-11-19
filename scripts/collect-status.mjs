import { readFile, writeFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';

const WEBSITE = 'https://fajarutamaa.github.io/';
const RETENTION_MS = 7 * 24 * 60 * 60 * 1000;
const TIMEOUT_MS = 10_000;

export async function checkWebsite(fetcher = fetch) {
  const startedAt = performance.now();
  try {
    const response = await fetcher(WEBSITE, {
      signal: AbortSignal.timeout(TIMEOUT_MS),
      redirect: 'manual',
    });
    const elapsedMs = Math.round(performance.now() - startedAt);
    // Only measure the time to response headers, not the page's rendering or download.
    void response.body?.cancel().catch(() => {});
    return {
      checkedAt: new Date().toISOString(),
      statusCode: response.status,
      responseMs: elapsedMs,
    };
  } catch {
    return { checkedAt: new Date().toISOString(), statusCode: null, responseMs: null };
  }
}

export function retainChecks(checks, next) {
  const cutoff = Date.parse(next.checkedAt) - RETENTION_MS;
  return [...checks, next].filter((check) => Date.parse(check.checkedAt) >= cutoff);
}

export async function readDeployments(repository, branch, token, fetcher = fetch) {
  const endpoint = `https://api.github.com/repos/${repository}/actions/workflows/nextjs.yml/runs`;
  const common = new URLSearchParams({ branch, per_page: '1' });
  const fetchRun = async (params) => {
    const response = await fetcher(`${endpoint}?${params}`, {
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${token}`,
      },
      signal: AbortSignal.timeout(TIMEOUT_MS),
      redirect: 'error',
    });
    if (!response.ok) throw new Error(`GitHub responded with HTTP ${response.status}`);
    const { workflow_runs: runs } = await response.json();
    const [run] = runs;
    return run
      ? {
          id: run.id,
          status: run.status,
          conclusion: run.conclusion,
          updatedAt: run.updated_at,
          sha: run.head_sha,
        }
      : null;
  };
  const successful = new URLSearchParams(common);
  successful.set('status', 'success');
  const [latest, lastSuccessful] = await Promise.all([fetchRun(common), fetchRun(successful)]);
  return { checkedAt: new Date().toISOString(), latest, lastSuccessful };
}

async function main() {
  const [, , path] = process.argv;
  const { GH_TOKEN, GITHUB_REPOSITORY, GITHUB_REF_NAME } = process.env;
  if (!path || !GH_TOKEN || !GITHUB_REPOSITORY || !GITHUB_REF_NAME) {
    throw new Error('An output path and GitHub Actions credentials are required');
  }

  let previous = { version: 1, checks: [], deploy: null };
  try {
    previous = JSON.parse(await readFile(path, 'utf8'));
    if (previous.version !== 1 || !Array.isArray(previous.checks)) {
      throw new Error('Unexpected status snapshot format');
    }
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }

  const [check, deploy] = await Promise.all([
    checkWebsite(),
    readDeployments(GITHUB_REPOSITORY, GITHUB_REF_NAME, GH_TOKEN).catch((error) => {
      console.warn(`Keeping the previous deployment snapshot: ${error.message}`);
      return previous.deploy;
    }),
  ]);
  const snapshot = { version: 1, checks: retainChecks(previous.checks, check), deploy };
  await writeFile(path, `${JSON.stringify(snapshot)}\n`);
  console.log(
    `Recorded HTTP ${check.statusCode ?? 'unreachable'}; ${snapshot.checks.length} samples retained`
  );
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await main();
}
