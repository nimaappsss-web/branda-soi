"use client";

import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { MoveRight, ShoppingCart } from "lucide-react";
import { MarketCode } from "@/types/brand";
import { MarketSelector } from "@/features/market/components/MarketSelector";
import { useCartStore } from "@/features/cart/store/useCartStore";

const CLOSE_MS = 450;

export const Header = () => {
  const params = useParams();
  const pathname = usePathname();
  const market = params.market as MarketCode;
  const itemCount = useCartStore(
    (state) => state.items.reduce((count, item) => count + item.quantity, 0),
  );
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const navItems = [
    { label: "Home", href: `/${market}` },
    { label: "Services", href: `/${market}/service` },
  ];

  const openMenu = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setClosing(false);
    setOpen(true);
  };

  const closeMenu = () => {
    if (closing || !open) return;
    setClosing(true);
    closeTimer.current = setTimeout(() => {
      closeTimer.current = null;
      setOpen(false);
      setClosing(false);
    }, CLOSE_MS);
  };

  const closeMenuRef = useRef(closeMenu);
  useEffect(() => {
    closeMenuRef.current = closeMenu;
  });

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenuRef.current();
    };
    const onResize = () => {
      if (window.innerWidth >= 768) {
        if (closeTimer.current) {
          clearTimeout(closeTimer.current);
          closeTimer.current = null;
        }
        setOpen(false);
        setClosing(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  return (
    <>
      <header className="sticky top-0 z-40 hidden w-full border-b border-border/60 bg-background md:block">
        <div className="container mx-auto flex h-16 items-center justify-between gap-4 px-4">
          <div className="flex items-center gap-6">
            <Link href={`/${market}`} className="group flex items-center gap-2.5">
              <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
                B
              </span>
              <span className="font-heading text-lg font-bold tracking-tight">
                Branda
                <span className="ml-1 rounded-full bg-secondary px-1.5 py-0.5 align-middle text-[0.6rem] font-bold text-secondary-foreground">
                  V2
                </span>
              </span>
            </Link>
            <nav className="hidden items-center gap-1 text-sm md:flex">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={pathname === item.href ? "page" : undefined}
                  className="rounded-full px-3 py-1.5 font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <MarketSelector />
            <Link
              href={`/${market}/cart`}
              aria-label="Cart"
              className="relative flex size-9 items-center justify-center rounded-xl border border-border/60 bg-card text-foreground transition-colors hover:bg-secondary"
            >
              <ShoppingCart className="h-4 w-4" />
              {itemCount > 0 && (
                <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[0.65rem] font-bold text-primary-foreground">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      <div aria-hidden className="h-[76px] md:hidden" />

      <Link
        href={`/${market}`}
        aria-label="Branda home"
        className="fixed left-4 top-4 z-[60] flex items-center gap-2 rounded-xl bg-primary px-3 py-2.5 text-primary-foreground shadow-lg duration-300 animate-in fade-in-0 slide-in-from-top-4 fill-mode-both md:hidden"
        style={{ animationDelay: "0.1s" }}
      >
        <span className="flex size-6 items-center justify-center rounded-md bg-primary-foreground text-xs font-bold text-primary">
          B
        </span>
        <span className="text-sm font-bold tracking-tight">Branda</span>
      </Link>

      <button
        type="button"
        onClick={() => (open && !closing ? closeMenu() : openMenu())}
        className="fixed right-4 top-4 z-[60] flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-xl bg-primary shadow-lg duration-300 animate-in fade-in-0 slide-in-from-top-4 fill-mode-both md:hidden"
        style={{ animationDelay: "0.15s" }}
        aria-label={open ? "Close menu" : "Menu"}
        aria-expanded={open}
      >
        <span
          className={`block h-0.5 w-5 bg-primary-foreground transition-transform duration-300 ${
            open && !closing ? "translate-y-[3.5px] rotate-45" : ""
          }`}
        />
        <span
          className={`block h-0.5 w-5 bg-primary-foreground transition-opacity duration-300 ${
            open && !closing ? "opacity-0" : ""
          }`}
        />
        <span
          className={`block h-0.5 w-5 bg-primary-foreground transition-transform duration-300 ${
            open && !closing ? "-translate-y-[3.5px] -rotate-45" : ""
          }`}
        />
      </button>

      {(open || closing) && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className={`fixed inset-0 z-50 flex flex-col bg-primary text-primary-foreground overscroll-none fill-mode-both duration-200 md:hidden ${
            closing ? "animate-out fade-out-0" : "animate-in fade-in-0"
          }`}
        >
          <nav className="flex flex-1 flex-col justify-center px-6 py-4">
            {navItems.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
                onClick={closeMenu}
                className={`group flex items-center gap-4 rounded-2xl py-2.5 fill-mode-both duration-300 ${
                  closing
                    ? "animate-out fade-out-0"
                    : "animate-in fade-in-0 slide-in-from-bottom-4"
                }`}
                style={{
                  animationDelay: closing
                    ? `${(navItems.length - 1 - i) * 0.04}s`
                    : `${0.2 + i * 0.07}s`,
                }}
              >
                <span className="w-5 shrink-0 font-mono text-[11px] text-primary-foreground/50">
                  0{i + 1}
                </span>
                <span className="text-[34px] font-semibold uppercase leading-none tracking-tight transition-colors group-hover:text-primary-foreground/70 sm:text-[40px]">
                  {item.label}
                </span>
                <MoveRight
                  size={22}
                  strokeWidth={1.75}
                  className="ml-auto -translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                />
              </Link>
            ))}
          </nav>

          <div
            className={`flex shrink-0 flex-col gap-3 border-t border-primary-foreground/10 px-6 pt-5 pb-8 fill-mode-both duration-300 ${
              closing ? "animate-out fade-out-0" : "animate-in fade-in-0 slide-in-from-bottom-4"
            }`}
            style={{ animationDelay: closing ? "0.06s" : "0.5s" }}
          >
            <MarketSelector onSelect={closeMenu} />
            <Link
              href={`/${market}/cart`}
              onClick={closeMenu}
              className="rounded-full bg-primary-foreground py-3.5 text-center text-[15px] font-semibold text-primary transition-colors active:bg-primary-foreground/80"
            >
              Cart{itemCount > 0 ? ` (${itemCount})` : ""}
            </Link>
          </div>
        </div>
      )}
    </>
  );
};
