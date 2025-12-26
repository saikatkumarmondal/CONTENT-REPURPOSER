import { ClerkProvider } from '@clerk/nextjs';
import { setRequestLocale } from 'next-intl/server';
import AuthLayoutWrapper from '@/components/AuthLayoutWrapper';
import { ClerkLocalizations } from '@/utils/AppConfig';

export default async function AuthLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const clerkLocale = ClerkLocalizations.supportedLocales[locale] ?? ClerkLocalizations.defaultLocale;

  return (
    <ClerkProvider
      appearance={{ cssLayerName: 'clerk' }}
      localization={clerkLocale}
    >
      <AuthLayoutWrapper>
        {props.children}
      </AuthLayoutWrapper>
    </ClerkProvider>
  );
}
