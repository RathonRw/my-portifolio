"use client";

import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: for now
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return;
    }
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = original;
      window.removeEventListener("keydown", onKey);
    };
  }, [isMobileMenuOpen]);

  const prefix = isHome ? "" : "/";
  const navLinks = [
    { href: `${prefix}#home`, label: "Home" },
    { href: `${prefix}#projects`, label: "Projects" },
    // { href: `${prefix}#skills`, label: "Skills" },
    { href: `${prefix}#stack`, label: "Stack" },
    { href: `${prefix}#contact`, label: "Contact" },
    { href: "/certificates", label: "Certificates" },
    { href: "/blog", label: "Blog" },
    { href: "/photos", label: "Photos" },
  ];

  return (
    <nav
      className={`fixed top-0 right-0 left-0 z-50 animate-navbar-entry transition-colors duration-300 ${
        isScrolled || isMobileMenuOpen
          ? "border-border/50 border-b bg-background/70 backdrop-blur-xl"
          : "md:bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-5xl px-6 md:px-12">
        <div className="flex h-14 items-center justify-end md:justify-center">
          <div className="hidden items-center gap-0.5 md:flex">
            {navLinks.map((link, index) => (
              <div
                className="animate-link-entry"
                key={link.href}
                style={{ animationDelay: `${0.3 + index * 0.1}s` }}
              >
                <a
                  className="inline-flex h-8 items-center rounded-lg px-3 font-medium text-muted-foreground text-xs outline-none transition-colors duration-150 hover:bg-muted/60 hover:text-foreground focus-visible:ring-2 focus-visible:ring-foreground/20"
                  href={link.href}
                >
                  {link.label}
                </a>
              </div>
            ))}
          </div>

          <button
            aria-controls="mobile-navigation-menu"
            aria-expanded={isMobileMenuOpen}
            aria-label={
              isMobileMenuOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            className="-mr-1.5 inline-flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground outline-none transition-colors duration-150 hover:bg-muted/60 hover:text-foreground focus-visible:ring-2 focus-visible:ring-foreground/20 active:scale-95 md:hidden"
            onClick={() => setIsMobileMenuOpen((v) => !v)}
            type="button"
          >
            {isMobileMenuOpen ? (
              <X className="size-4.5" />
            ) : (
              <Menu className="size-4.5" />
            )}
          </button>
        </div>
      </div>

      <div
        className={`overflow-hidden transition-[max-height,opacity] duration-200 ease-out md:hidden ${
          isMobileMenuOpen ? "max-h-112 opacity-100" : "max-h-0 opacity-0"
        }`}
        id="mobile-navigation-menu"
      >
        <div className="mx-auto max-w-5xl px-4 pt-1 pb-3">
          <ul className="flex flex-col">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  className="flex h-10 w-full items-center rounded-md px-2 text-muted-foreground text-sm outline-none transition-colors duration-150 hover:bg-muted/60 hover:text-foreground focus-visible:ring-2 focus-visible:ring-foreground/20 active:bg-muted"
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
