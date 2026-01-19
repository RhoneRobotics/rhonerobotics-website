"use client";
import { usePathname } from "next/navigation";
import {
  Nav,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useState } from "react";

const NavbarExtra = ({ className, children, visible }: { className?: string, children: React.ReactNode, visible?: boolean }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export function Navbar() {
  const pathname = usePathname();
  const navItems = [
    {
      name: "Services",
      link: "#services",
    },
    {
      name: "Process",
      link: "#process",
    },
    {
      name: "Team",
      link: "#team",
    },
    {
      name: "Case Studies",
      link: "#case-studies",
    }
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="relative w-full overflow-x-hidden">
      <Nav className="fixed top-0 left-0 right-0 z-50">
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems.map(item => ({ ...item, link: pathname === "/" ? item.link : `/${item.link}` }))} />
          <div className="flex items-center gap-4">
            <NavbarButton variant="primary" href={pathname === "/" ? "#contact" : "/#contact"}>Contact Us</NavbarButton>
          </div>
        </NavBody>


        <NavbarExtra className="fixed bottom-5 right-5 z-[60]">
          <NavbarButton
            variant="primary"
            href="/hiring"
            className="bg-gradient-to-b from-[#000000] via-[#484848] via-70% to-[#3f3f3f] hover:bg-green-600 text-neutral-50 border-0 shadow-lg text-[10px] md:text-lg font-semibold px-3 py-2 md:px-6 md:py-3"
          >
            We are Hiring !
          </NavbarButton>
        </NavbarExtra>

        {/* Mobile Navigation */}
        <MobileNav className="   ">

          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={pathname === "/" ? item.link : `/${item.link}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}

            <div className="flex w-full flex-col gap-4">

              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full "
              >
                Contact Us
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Nav>

    </div>
  );
}