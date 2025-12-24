import { setRequestLocale } from 'next-intl/server';

export default async function DashboardLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  // Return children directly. They are already wrapped by the (auth) layout.
  return <>{props.children}</>;
}