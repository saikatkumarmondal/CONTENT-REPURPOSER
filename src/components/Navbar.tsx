'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Laptop, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

type NavItem = {
  name: string;
  href?: string;
  hasDropdown?: boolean;
};

const navItems: NavItem[] = [
  { name: 'Top features', hasDropdown: true },
  { name: 'Integrations', href: '/integrations' },
  { name: 'Industries', hasDropdown: true },
  { name: 'Resources', hasDropdown: true },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Enterprise', href: '/enterprise' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
      <nav className="sticky top-0 z-50 border-b bg-white">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex h-16 items-center justify-between">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <motion.div
                  whileHover={{ rotate: 10, y: -2 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-lg bg-blue-50 p-2"
              >
                <Laptop className="h-5 w-5 text-blue-600" />
              </motion.div>
              <span className="text-lg font-semibold text-gray-900">
              AutoPost
            </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden items-center gap-8 md:flex">
              {navItems.map(item => (
                  <NavLink key={item.name} item={item} />
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden items-center gap-4 md:flex">
              <Link
                  href="/login"
                  className="text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                Log in
              </Link>

              <Link href="/sign-up">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="rounded-lg bg-slate-900 px-5 py-2 text-sm font-medium text-white"
                >
                  Start your free trial
                </motion.button>
              </Link>
            </div>

            {/* Mobile Toggle */}
            <button
                onClick={() => setMobileOpen(true)}
                className="text-gray-700 pr-4 md:hidden"
            >
              <Menu />
            </button>
          </div>
        </div>

        {/* ---------------- Mobile Drawer ---------------- */}
        <AnimatePresence>
          {mobileOpen && (
              <>
                {/* Overlay */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.4 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setMobileOpen(false)}
                    className="fixed inset-0 z-40 bg-black md:hidden"
                />

                {/* Drawer */}
                <motion.div
                    initial={{ x: '-100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '-100%' }}
                    transition={{ type: 'spring', stiffness: 260, damping: 30 }}
                    className="fixed left-0 top-0 z-50 h-full w-[85%] max-w-sm bg-white shadow-xl md:hidden"
                >
                  <div className="flex items-center justify-between border-b px-4 py-4">
                    <span className="text-lg font-semibold">Menu</span>
                    <button onClick={() => setMobileOpen(false)}>
                      <X />
                    </button>
                  </div>

                  <div className="space-y-1 px-4 py-4">
                    {navItems.map(item => (
                        <MobileNavItem
                            key={item.name}
                            item={item}
                            closeMenu={() => setMobileOpen(false)}
                        />
                    ))}

                    <div className="space-y-2 pt-4">
                      <Link href="/login">
                        <button className="w-full mb-2 rounded-lg border px-4 py-2 text-sm font-medium hover:bg-gray-50 active:scale-[0.98]">
                          Log in
                        </button>
                      </Link>

                      <Link href="/sign-up">
                        <button className="w-full rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 active:scale-[0.98]">
                          Start your free trial
                        </button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </>
          )}
        </AnimatePresence>
      </nav>
  );
}

/* ---------------- Desktop Nav Item ---------------- */

function NavLink({ item }: { item: NavItem }) {
  return (
      <motion.div
          className="group relative flex cursor-pointer items-center gap-1"
          whileHover="hover"
          initial="rest"
          animate="rest"
      >
      <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
        {item.name}
      </span>

        {item.hasDropdown && (
            <motion.span
                variants={{
                  rest: { rotate: 0 },
                  hover: { rotate: 180 },
                }}
                transition={{ duration: 0.25 }}
            >
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </motion.span>
        )}
      </motion.div>
  );
}

/* ---------------- Mobile Nav Item ---------------- */

function MobileNavItem({
                         item,
                         closeMenu,
                       }: {
  item: NavItem;
  closeMenu: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
      <div className="pl-6">
        <button
            onClick={() => setOpen(!open)}
            className="flex w-full mt-2 items-center justify-between rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 active:bg-gray-200"
        >
          {item.name}

          {item.hasDropdown && (
              <motion.span
                  animate={{ rotate: open ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
              >
                <ChevronDown className="h-4 w-4" />
              </motion.span>
          )}
        </button>
      </div>
  );
}
