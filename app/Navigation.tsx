'use client'

import React, { useState, useEffect } from 'react'
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
    <span className="block text-gray-200 hover:bg-indigo-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out">
      {children}
    </span>
  </Link>
);

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleNavigation = (href: string) => {
    closeMenu();
    router.push(href);
  };

  return (
    <>
      <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="md:hidden bg-indigo-600 inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-700 focus:ring-white transition duration-300 ease-in-out"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <Menu className="block h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="flex-1 flex justify-center md:justify-start">
              <div className="flex-shrink-0">
                <Link href="/" onClick={closeMenu}>
                  <span className="text-white text-xl font-bold">
                    RailBites
                  </span>
                </Link>
              </div>
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
        </div>
      </nav>

      {/* Drawer-like mobile menu */}
      <div className={`fixed inset-0 z-50 md:hidden ${isOpen ? 'visible' : 'invisible'}`}>
        {/* Overlay */}
        <div 
          className={`absolute inset-0 bg-black transition-opacity duration-300 ease-in-out ${isOpen ? 'opacity-50' : 'opacity-0'}`} 
          onClick={closeMenu}
        ></div>
        
        {/* Drawer */}
        <div className={`absolute top-0 left-0 w-64 h-full bg-indigo-800 shadow-lg transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="p-5">
            <button
              onClick={closeMenu}
              className="absolute top-3 right-3 text-white hover:text-gray-300"
            >
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="mt-8 flex flex-col space-y-3">
              <NavItem href="/" onClick={() => handleNavigation('/')}>Home</NavItem>
              <NavItem href="/order" onClick={() => handleNavigation('/order')}>Orders</NavItem>
              <NavItem href="/#how-it-works" onClick={() => handleNavigation('/#how-it-works')}>How It Works</NavItem>
              <NavItem href="/trackorder" onClick={() => handleNavigation('/trackorder')}>Track Orders</NavItem>
              <NavItem href="/#about" onClick={() => handleNavigation('/#about')}>About Us</NavItem>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;