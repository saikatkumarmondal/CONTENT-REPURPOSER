import { setRequestLocale } from 'next-intl/server';

export default async function DashboardLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  // Simply return children; the sidebar is already wrapped by the parent layout
  return <>{props.children}</>;
}
