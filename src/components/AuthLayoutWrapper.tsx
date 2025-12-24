'use client';

import { usePathname } from 'next/navigation';
import BaseTemplate from '@/templates/BaseTemplate';

export default function AuthLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Show sidebar only for dashboard routes and their children
  const showSidebar = pathname.includes('/dashboard');

  return (
    <BaseTemplate showSidebar={showSidebar}>
      {children}
    </BaseTemplate>
  );
}
