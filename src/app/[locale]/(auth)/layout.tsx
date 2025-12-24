import { ClerkProvider } from '@clerk/nextjs';
import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/libs/I18nRouting';
import BaseTemplate from '@/templates/BaseTemplate';
import { ClerkLocalizations } from '@/utils/AppConfig';

export default async function AuthLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const clerkLocale = ClerkLocalizations.supportedLocales[locale] ?? ClerkLocalizations.defaultLocale;

  // Logic for Clerk URLs
  let dashboardUrl = '/dashboard';
  if (locale !== routing.defaultLocale) {
    dashboardUrl = `/${locale}${dashboardUrl}`;
  }

  return (
    <ClerkProvider
      appearance={{ cssLayerName: 'clerk' }}
      localization={clerkLocale}
      signInFallbackRedirectUrl={dashboardUrl}
      signUpFallbackRedirectUrl={dashboardUrl}
    >
      {/* WRAP CHILDREN IN BASETEMPLATE HERE.
          This ensures the sidebar and banner are always rendered
          for Dashboard, Transform, History, etc.
      */}
      <BaseTemplate>
        {props.children}
      </BaseTemplate>
    </ClerkProvider>
  );
}
