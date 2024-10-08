'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface NavItemProps {
  href: string;
  children: React.ReactNode;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ href, children, onClick }) => (
  <Link href={href} onClick={onClick}>
    <span className="text-gray-200 hover:bg-indigo-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out">
      {children}
    </span>
  </Link>
);

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleNavigation = (href: string) => {
    closeMenu();
    router.push(href);
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/" onClick={closeMenu}>
                <span className="text-white text-xl font-bold">
                  RailBites
                </span>
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <NavItem href="/" onClick={() => handleNavigation('/')}>Home</NavItem>
                <NavItem href="/order" onClick={() => handleNavigation('/order')}>Orders</NavItem>
                <NavItem href="/#how-it-works" onClick={() => handleNavigation('/#how-it-works')}>How It Works</NavItem>
                <NavItem href="/trackorder" onClick={() => handleNavigation('/trackorder')}>Track Orders</NavItem>
                <NavItem href="/#about" onClick={() => handleNavigation('/#about')}>About Us</NavItem>
              </div>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="bg-indigo-600 inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-700 focus:ring-white transition duration-300 ease-in-out"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavItem href="/" onClick={() => handleNavigation('/')}>Home</NavItem>
            <NavItem href="/order" onClick={() => handleNavigation('/order')}>Orders</NavItem>
            <NavItem href="/#how-it-works" onClick={() => handleNavigation('/#how-it-works')}>How It Works</NavItem>
            <NavItem href="/trackorder" onClick={() => handleNavigation('/trackorder')}>Track Orders</NavItem>
            <NavItem href="/#about" onClick={() => handleNavigation('/#about')}>About Us</NavItem>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;