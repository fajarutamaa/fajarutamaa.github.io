import { PageIntro } from '@/components/layout/PageIntro';
import { StatusDashboard } from '@/components/status/StatusDashboard';

export const metadata = {
  title: 'Website Status - Fajar Dwi Utomo',
  description: 'Recent website availability, response times, and GitHub Pages deployments.',
};

export default function StatusPage() {
  return (
    <div className="site-container space-y-8 py-10 sm:space-y-10 sm:py-14">
      <PageIntro
        label="Monitoring"
        title="Website status"
        description="See recent website checks and GitHub Pages deployments. This dashboard refreshes every minute while it’s open."
      />
      <StatusDashboard />
    </div>
  );
}
