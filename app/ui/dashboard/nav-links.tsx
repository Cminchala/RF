"use client";
import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/outline';

import Link from 'next/link';
import {usePathname} from 'next/navigation'
import clsx from 'clsx';
import { Protect } from '@clerk/nextjs';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  {
    name: 'Invoices',
    href: '/dashboard/invoices',
    icon: DocumentDuplicateIcon,
    protected: true, // Mark as protected
  },
  {
    name: 'Customers',
    href: '/dashboard/customers',
    icon: UserGroupIcon,
    protected: true, // Mark as protected
  },
  {
    name: 'Earnings',
    href: '/dashboard/earnings',
    icon: CurrencyDollarIcon,
    protected: true, // Mark as protected
  },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        const linkElement = (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-sky-100 text-blue-600': pathname === link.href,
              },
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );

        return link.protected ? (
          <Protect role='org:admin' key={link.name}>{linkElement}</Protect>
        ) : (
          linkElement
        );
      })}
    </>
  );
}
