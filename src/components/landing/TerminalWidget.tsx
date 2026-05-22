"use client";

import { useEffect, useMemo, useState } from "react";

type FareRow = {
  provider: "OLA MINI" | "UBER GO" | "RAPIDO";
  price: number;
  eta: number;
  flash: boolean;
};

const START_ROWS: FareRow[] = [
  { provider: "OLA MINI", price: 242, eta: 6, flash: false },
  { provider: "UBER GO", price: 228, eta: 5, flash: false },
  { provider: "RAPIDO", price: 236, eta: 4, flash: false },
];

function randomBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function TerminalWidget() {
  const [rows, setRows] = useState<FareRow[]>(START_ROWS);

  useEffect(() => {
    let active = true;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      setRows((prev) =>
        prev.map((row, index) => {
          const priceDelta = randomBetween(-8, 8);
          const etaDelta = randomBetween(-1, 1);
          return {
            ...row,
            price: Math.max(159, row.price + priceDelta),
            eta: Math.max(2, row.eta + etaDelta),
            flash: index === randomBetween(0, 2),
          };
        }),
      );

      if (active) {
        timer = setTimeout(tick, randomBetween(3000, 5000));
      }
    };

    timer = setTimeout(tick, randomBetween(3000, 5000));
    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, []);

  const cheapestProvider = useMemo(() => {
    return rows.reduce((best, row) => (row.price < best.price ? row : best), rows[0])
      .provider;
  }, [rows]);

  const maxPrice = Math.max(...rows.map((row) => row.price));
  const minPrice = Math.min(...rows.map((row) => row.price));
  const deltaPercent = Math.round(((maxPrice - minPrice) / maxPrice) * 100);

  return (
    <aside className="surface-card relative overflow-hidden p-5">
      <div className="terminal-scan" />
      <div className="relative flex items-center justify-between border-b border-[#222222] pb-3">
        <div className="flex items-center gap-2">
          <span className="section-label !text-[10px]">Live Fare Signal</span>
          <span className="pulse-dot" />
        </div>
        <span className="text-[11px] text-[#7A7A7A]">Mumbai T2 → BKC</span>
      </div>

      <div className="relative mt-4 space-y-2">
        {rows.map((row) => {
          const isCheapest = row.provider === cheapestProvider;
          return (
            <div
              key={row.provider}
              className={`grid grid-cols-[1fr_auto_auto] items-center border border-[#222222] px-3 py-2 text-[13px] transition-colors duration-150 ${
                row.flash ? "bg-[#161616]" : "bg-[#101010]"
              }`}
            >
              <span className="text-[#F0EDE8]">{row.provider}</span>
              <span className={isCheapest ? "text-[#F5A623]" : "text-[#F0EDE8]"}>
                Rs {row.price}
              </span>
              <span className="ml-4 text-[#7A7A7A]">{row.eta} min</span>
            </div>
          );
        })}
      </div>

      <div className="relative mt-4 border-t border-[#222222] pt-3 text-[11px] text-[#F5A623]">
        FARE DELTA -{deltaPercent}% · ETA CONFIDENCE 94%
      </div>

      <p className="relative mt-2 text-[10px] text-[#7A7A7A]">
        * Artificial demo values for landing preview only.
      </p>
    </aside>
  );
}
