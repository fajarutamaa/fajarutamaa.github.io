import { PageIntro } from '@/components/layout/PageIntro';
import { SearchPlayground } from '@/components/playground/SearchPlayground';

export const metadata = {
  title: 'Search Playground - Fajar Dwi Utomo',
  description: 'An interactive demo of search filters and relevance ranking.',
};

export default function PlaygroundPage() {
  return (
    <div className="site-container space-y-8 py-10 sm:space-y-10 sm:py-14">
      <PageIntro
        label="Playground / 01"
        title="Search Playground"
        description="Filter a sample catalog, compare sort orders, and see how each keyword contributes to a result’s score."
      />
      <SearchPlayground />
    </div>
  );
}
