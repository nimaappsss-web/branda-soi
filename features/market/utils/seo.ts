import type { Metadata } from "next";
import { MarketCode } from "@/types/brand";

const LOCALE_BY_MARKET: Record<MarketCode, string> = {
  ng: "en-NG",
  us: "en-US",
  uk: "en-GB",
  ca: "en-CA",
};

export const MARKET_CODES: MarketCode[] = ["ng", "us", "uk", "ca"];

export function buildAlternates(
  market: MarketCode,
  path = ""
): Metadata["alternates"] {
  const languages: Record<string, string> = {};
  for (const code of MARKET_CODES) {
    languages[LOCALE_BY_MARKET[code]] = `/${code}${path}`;
  }
  languages.en = `/ng${path}`;
  languages["x-default"] = `/ng${path}`;

  return {
    canonical: `/${market}${path}`,
    languages,
  };
}
