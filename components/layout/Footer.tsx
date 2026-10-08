import Link from "next/link";
import { MarketCode } from "@/types/brand";
import { marketsConfig } from "@/features/market/config/markets";

interface FooterProps {
  market: MarketCode;
}

export const Footer = ({ market }: FooterProps) => {
  return (
    <footer className="border-t border-border/60 bg-muted/30">
      <div className="container mx-auto grid gap-10 px-4 py-12 md:grid-cols-[1.6fr_1fr_1fr]">
        <div className="max-w-sm">
          <div className="flex items-center gap-2.5">
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
              B
            </span>
            <span className="font-heading text-lg font-bold tracking-tight">Branda V2</span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Digital, gifts, create, studio and print services — one marketplace
            powering brands across four markets.
          </p>
        </div>

        <nav aria-label="Footer">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Explore
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <Link
                href={`/${market}/service`}
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                All services
              </Link>
            </li>
            <li>
              <Link
                href={`/${market}/service?category=Digital`}
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                Digital
              </Link>
            </li>
            <li>
              <Link
                href={`/${market}/service?category=Prints`}
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                Prints
              </Link>
            </li>
            <li>
              <Link
                href={`/${market}/cart`}
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                Cart
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-label="Markets">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Markets
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {Object.values(marketsConfig).map((m) => (
              <li key={m.code}>
                <Link
                  href={`/${m.code}`}
                  className={`text-muted-foreground transition-colors hover:text-primary ${
                    m.code === market ? "font-semibold text-foreground" : ""
                  }`}
                >
                  {m.flag} {m.country}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-border/60 py-5">
        <p className="container mx-auto px-4 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Branda V2. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
