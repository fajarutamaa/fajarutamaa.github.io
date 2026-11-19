import { z } from 'zod';

export const STATUS_REPOSITORY = 'fajarutamaa/fajarutamaa.github.io';
export const STATUS_FEED = `https://raw.githubusercontent.com/${STATUS_REPOSITORY}/refs/heads/status-data/status.json`;
export const DEPLOY_WORKFLOW_URL = `https://github.com/${STATUS_REPOSITORY}/actions/workflows/nextjs.yml`;

const checkSchema = z.object({
  checkedAt: z.iso.datetime(),
  statusCode: z.number().int().min(100).max(599).nullable(),
  responseMs: z.number().int().nonnegative().nullable(),
});

const deploymentRunSchema = z.object({
  id: z.number().int().positive(),
  status: z.string(),
  conclusion: z.string().nullable(),
  updatedAt: z.iso.datetime(),
  sha: z.string().regex(/^[a-f0-9]{40}$/i),
});

export const statusSnapshotSchema = z.object({
  version: z.literal(1),
  checks: z.array(checkSchema),
  deploy: z
    .object({
      checkedAt: z.iso.datetime(),
      latest: deploymentRunSchema.nullable(),
      lastSuccessful: deploymentRunSchema.nullable(),
    })
    .nullable(),
});

export type StatusSnapshot = z.infer<typeof statusSnapshotSchema>;
export type WebsiteCheck = z.infer<typeof checkSchema>;
export type DeploymentRun = z.infer<typeof deploymentRunSchema>;

const HOUR_MS = 60 * 60 * 1000;
const STALE_AFTER_MS = 20 * 60 * 1000;

export function isHealthy(check: WebsiteCheck) {
  return check.statusCode !== null && check.statusCode >= 200 && check.statusCode < 300;
}

export function isStale(checkedAt: string, now: number) {
  return now - Date.parse(checkedAt) >= STALE_AFTER_MS;
}

export function summarizeChecks(checks: WebsiteCheck[], now: number) {
  const sorted = checks
    .map((check) => ({ check, time: Date.parse(check.checkedAt) }))
    .filter(({ time }) => time <= now)
    .sort((a, b) => a.time - b.time);
  const latest = sorted.at(-1)?.check;
  const lastDay = sorted.filter(({ time }) => time > now - 24 * HOUR_MS);
  const lastWeek = sorted.filter(({ time }) => time > now - 7 * 24 * HOUR_MS);
  const countHealthy = (entries: typeof sorted) =>
    entries.filter(({ check }) => isHealthy(check)).length;

  const hours = Array.from({ length: 24 }, (_, index) => {
    const end = now - (23 - index) * HOUR_MS;
    const entries = lastDay.filter(({ time }) => time > end - HOUR_MS && time <= end);
    return { end, total: entries.length, healthy: countHealthy(entries) };
  });

  return {
    latest,
    day: { total: lastDay.length, healthy: countHealthy(lastDay) },
    week: { total: lastWeek.length, healthy: countHealthy(lastWeek) },
    hours,
  };
}
