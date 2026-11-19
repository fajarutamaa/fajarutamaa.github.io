'use client';

import { useEffect, useState } from 'react';
import { ArrowUpRight, RefreshCw } from 'lucide-react';
import {
  DEPLOY_WORKFLOW_URL,
  STATUS_FEED,
  STATUS_REPOSITORY,
  isHealthy,
  isStale,
  statusSnapshotSchema,
  summarizeChecks,
  type DeploymentRun,
  type StatusSnapshot,
} from '@/lib/status/snapshot';

const REFRESH_MS = 60_000;

interface DashboardState {
  snapshot: StatusSnapshot | null;
  now: number;
  pending: boolean;
  issue: 'missing' | 'error' | null;
}

const chartLegend = {
  healthy: { label: 'All checks passed', color: 'bg-emerald-500/75 dark:bg-emerald-400/75' },
  partial: { label: 'Some checks failed', color: 'bg-amber-500/75 dark:bg-amber-400/75' },
  down: { label: 'All checks failed', color: 'bg-rose-500/75 dark:bg-rose-400/75' },
  empty: { label: 'No checks', color: 'bg-muted' },
};

function CheckedTime({ value }: { value?: string }) {
  return value ? <time dateTime={value}>{new Date(value).toLocaleString()}</time> : <>—</>;
}

function Availability({
  label,
  total,
  healthy,
}: {
  label: string;
  total: number;
  healthy: number;
}) {
  return (
    <div className="rounded-xl border bg-card p-3.5">
      <dt className="text-sm text-muted-foreground">{label}</dt>
      <dd className="mt-1 text-2xl font-semibold tabular-nums">
        {total ? `${((healthy / total) * 100).toFixed(2)}%` : '—'}
      </dd>
      <dd className="text-xs text-muted-foreground">
        {healthy} of {total} checks passed
      </dd>
    </div>
  );
}

function RunRow({ label, run }: { label: string; run?: DeploymentRun | null }) {
  const state = run?.status === 'completed' ? (run.conclusion ?? 'completed') : run?.status;

  return (
    <div className="flex flex-wrap items-start justify-between gap-2 px-4 py-3.5">
      <div className="space-y-1">
        <dt className="text-sm font-medium">{label}</dt>
        <dd className="text-xs text-muted-foreground">
          {run ? <CheckedTime value={run.updatedAt} /> : 'Not available'}
        </dd>
      </div>
      {run && (
        <dd className="flex flex-wrap items-center gap-2">
          <span className="rounded-md bg-muted px-2 py-1 text-xs capitalize text-muted-foreground">
            {state?.replaceAll('_', ' ')}
          </span>
          <a
            href={`https://github.com/${STATUS_REPOSITORY}/actions/runs/${run.id}`}
            className="inline-flex items-center gap-1 rounded font-mono text-xs text-primary hover:underline"
            aria-label={`${label}, commit ${run.sha.slice(0, 7)}, on GitHub`}
          >
            {run.sha.slice(0, 7)} <ArrowUpRight size={13} aria-hidden="true" />
          </a>
        </dd>
      )}
    </div>
  );
}

export function StatusDashboard() {
  const [refresh, setRefresh] = useState(0);
  const [{ snapshot, pending, now, issue }, setState] = useState<DashboardState>({
    snapshot: null,
    pending: true,
    now: 0,
    issue: null,
  });

  useEffect(() => {
    const controller = new AbortController();
    let timer: ReturnType<typeof setTimeout>;

    async function load() {
      try {
        if (document.hidden) return;
        setState((current) => ({ ...current, pending: true }));
        const response = await fetch(STATUS_FEED, {
          cache: 'no-store',
          signal: AbortSignal.any([controller.signal, AbortSignal.timeout(10_000)]),
        });
        if (controller.signal.aborted) return;
        if (response.status === 404) {
          setState((current) => ({
            ...current,
            pending: false,
            now: Date.now(),
            issue: current.snapshot ? 'error' : 'missing',
          }));
          return;
        }
        if (!response.ok) throw new Error('Could not refresh the status snapshot');
        const data = statusSnapshotSchema.parse(await response.json());
        if (!controller.signal.aborted) {
          setState({ snapshot: data, now: Date.now(), pending: false, issue: null });
        }
      } catch {
        if (!controller.signal.aborted) {
          setState((current) => ({ ...current, now: Date.now(), pending: false, issue: 'error' }));
        }
      } finally {
        if (!controller.signal.aborted) timer = setTimeout(load, REFRESH_MS);
      }
    }

    void load();
    return () => {
      controller.abort();
      clearTimeout(timer);
    };
  }, [refresh]);

  const { latest, day, week, hours } = summarizeChecks(snapshot?.checks ?? [], now);
  const deploy = snapshot?.deploy;
  const stale = latest ? isStale(latest.checkedAt, now) : false;
  const deployStale = deploy ? isStale(deploy.checkedAt, now) : false;
  const healthy = latest ? isHealthy(latest) : false;
  const indicator =
    !latest || stale ? 'bg-muted-foreground' : healthy ? 'bg-emerald-500' : 'bg-rose-500';
  const headline = latest
    ? stale
      ? 'Check history is stale'
      : healthy
        ? 'Website reachable'
        : 'Latest check failed'
    : issue === 'missing'
      ? 'Waiting for the first snapshot'
      : pending
        ? 'Loading website checks'
        : 'Website checks unavailable';

  return (
    <div className="space-y-8">
      <section aria-labelledby="website-status" className="space-y-4">
        <div className="rounded-2xl border bg-card p-4 sm:p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="space-y-1.5">
              <h2 id="website-status" className="section-title flex items-center gap-2.5">
                <span
                  aria-hidden="true"
                  className={`size-2.5 shrink-0 rounded-full ${indicator}`}
                />
                <span role="status">{headline}</span>
              </h2>
              <p className="text-sm text-muted-foreground">
                Last checked: <CheckedTime value={latest?.checkedAt} />
                {latest &&
                  (latest.statusCode === null ? ' · Unreachable' : ` · HTTP ${latest.statusCode}`)}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setRefresh((value) => value + 1)}
              disabled={pending}
              className="action-link border bg-background hover:bg-muted disabled:opacity-60"
            >
              <RefreshCw size={15} aria-hidden="true" />
              Refresh
            </button>
          </div>
          {issue && (
            <p className="mt-3 text-sm text-muted-foreground">
              {issue === 'missing'
                ? 'Measurements will appear after the monitoring workflow publishes its first check.'
                : 'Could not fetch the latest data. Any previous measurements are shown with their original timestamps.'}
            </p>
          )}
        </div>

        <dl className="grid gap-3 sm:grid-cols-3">
          <Availability label="24-hour availability" {...day} />
          <Availability label="7-day availability" {...week} />
          <div className="rounded-xl border bg-card p-3.5">
            <dt className="text-sm text-muted-foreground">Latest response time</dt>
            <dd className="mt-1 text-2xl font-semibold tabular-nums">
              {latest?.responseMs != null ? `${latest.responseMs} ms` : '—'}
            </dd>
            <dd className="text-xs text-muted-foreground">Time to HTTP response headers</dd>
          </div>
        </dl>

        <div className="space-y-2 rounded-xl border bg-card p-3.5">
          <h3 className="text-sm font-semibold">Past 24 hours</h3>
          <div
            className="grid grid-cols-[repeat(24,minmax(0,1fr))] gap-0.5 sm:gap-1"
            role="img"
            aria-label={`${day.healthy} of ${day.total} checks passed in the past 24 hours`}
          >
            {hours.map(({ end, total, healthy: passed }) => {
              const result = !total
                ? chartLegend.empty
                : passed === total
                  ? chartLegend.healthy
                  : passed
                    ? chartLegend.partial
                    : chartLegend.down;
              return (
                <span
                  key={end}
                  title={
                    now
                      ? `${new Date(end).toLocaleString()}: ${passed}/${total} checks passed`
                      : undefined
                  }
                  className={`h-7 rounded-sm ${result.color}`}
                />
              );
            })}
          </div>
          <ul className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
            {Object.values(chartLegend).map(({ label, color }) => (
              <li key={label} className="flex items-center gap-1">
                <span aria-hidden="true" className={`size-2 rounded-sm ${color}`} /> {label}
              </li>
            ))}
          </ul>
          <p className="text-xs leading-relaxed text-muted-foreground">
            GitHub Actions aims to check every five minutes. Availability is the share of observed
            checks that returned HTTP 2xx; missing checks are not counted as outages.
          </p>
        </div>
      </section>

      <section aria-labelledby="deployment-status" className="space-y-3">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <h2 id="deployment-status" className="section-title">
              Deployments
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Last checked: <CheckedTime value={deploy?.checkedAt} />
              {deployStale && ' · Stale data'}
            </p>
          </div>
          <a
            href={DEPLOY_WORKFLOW_URL}
            className="inline-flex items-center gap-1 rounded text-sm text-primary hover:underline"
          >
            Pages workflow <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </div>
        <dl className="divide-y overflow-hidden rounded-xl border bg-card">
          <RunRow label="Latest workflow run" run={deploy?.latest} />
          <RunRow label="Last successful deploy" run={deploy?.lastSuccessful} />
        </dl>
      </section>
    </div>
  );
}
