'use client';

import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { useState } from 'react';

export default function BaseTemplate({
  children,
  showSidebar = true,
}: {
  children: React.ReactNode;
  showSidebar?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const params = useParams();
  const locale = params.locale as string;

  const sidebarItems = [
    { label: 'Dashboard', href: `/${locale}/dashboard` },
    { label: 'Transform', href: `/${locale}/dashboard/transform` },
    { label: 'Templates', href: `/${locale}/dashboard/templates` },
    { label: 'History', href: `/${locale}/dashboard/history` },
    { label: 'Settings', href: `/${locale}/dashboard/settings` },
  ];

  // Only close the drawer on mobile (width < 1024px)
  const handleLogoClick = () => {
    if (window.innerWidth < 1024) {
      setOpen(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* ================= TOP BANNER ================= */}
      {showSidebar && (
        <div className="z-60 flex h-16 w-full shrink-0 items-center justify-between bg-gray-500 px-6">
          <span className="text-xl font-bold whitespace-nowrap text-white">
            CONTENT REPURPOSER
          </span>

          <button
            type="button"
            className="rounded-md p-2 text-white transition-colors hover:bg-gray-600 lg:hidden"
            onClick={() => setOpen(v => !v)}
            aria-label="Toggle Menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      )}

      <div className="relative flex flex-1 overflow-hidden">
        {/* ================= OVERLAY ================= */}
        {showSidebar && open && (
          <div
            onClick={() => setOpen(false)}
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                setOpen(false);
              }
            }}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
            role="button"
            tabIndex={0}
            aria-label="Close sidebar"
          />
        )}

        {/* ================= SIDEBAR ================= */}
        {showSidebar && (
          <aside
            className={`
              fixed inset-y-0 left-0 z-50 w-64 transform border-r border-gray-200 bg-white transition-transform duration-300 ease-in-out max-lg:top-16 lg:static
              lg:translate-x-0
              ${open ? 'translate-x-0' : '-translate-x-full'}
            `}
          >
            <nav className="space-y-1 p-4">
              {sidebarItems.map((item) => {
                const isActive
                  = pathname === item.href
                    || pathname.startsWith(`${item.href}/`);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={handleLogoClick}
                    className={`
                      relative flex items-center rounded-lg px-4 py-2.5 text-sm font-medium
                      transition-all duration-200 ease-in-out
                      ${
                  isActive
                    ? 'border-l-4 border-[#66b2b2] bg-[#66b2b2]/10 text-[#66b2b2]'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-[#66b2b2]'
                  }
                    `}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </aside>
        )}

        {/* ================= CONTENT AREA ================= */}
        <div className={`flex min-w-0 flex-1 flex-col ${showSidebar ? '' : 'lg:ml-0'}`}>
          <main className="flex-1 overflow-y-auto p-6 md:p-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
