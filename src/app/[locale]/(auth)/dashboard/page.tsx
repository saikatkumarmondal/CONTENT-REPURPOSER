import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'Dashboard',
  });

  return {
    title: t('meta_title'),
  };
}

export default function Dashboard() {
  // Value stored in an array as requested
  const transformations = [
    { id: 1, date: 'Dec 20', from: 'Blog', to: 'LinkedIn Post' },
    { id: 2, date: 'Dec 19', from: 'Email', to: 'Twitter Thread' },
    { id: 3, date: 'Dec 18', from: 'Article', to: 'Instagram Caption' },
  ];

  const stats = {
    used: 45,
    total: 100,
  };

  return (
    <div className="max-w-5xl space-y-6">
      {/* Usage Stats Card */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900">Usage Stats This Month</h2>
        <p className="text-gray-600">
          Transformations used:
          {stats.used}
          /
          {stats.total}
        </p>
      </div>

      {/* Recent Transformations Card */}
      <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
        <div className="p-6">
          <h2 className="mb-4 text-xl font-bold text-gray-900">Recent Transformations</h2>

          <div className="divide-y divide-gray-100">
            {transformations.map(item => (
              <div key={item.id} className="py-4 text-gray-700">
                <span className="font-medium">{item.date}</span>
                <span className="mx-2 text-gray-400">|</span>
                <span>
                  {item.from}
                  {' '}
                  →
                  {' '}
                  {item.to}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* New Transformation Button */}
      <button className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-500">
        + New Transformation
      </button>
    </div>
  );
}
