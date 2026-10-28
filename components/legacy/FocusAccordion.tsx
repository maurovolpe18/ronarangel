"use client";

import { useState } from "react";
import { services } from "@/data/content";

export function FocusAccordion() {
  const [active, setActive] = useState<number | null>(0);

  return (
    <div className="border-t border-ink/15">
      {services.map((service, index) => {
        const isOpen = active === index;

        return (
          <div
            key={service.number}
            className="border-b border-ink/15 transition-colors"
          >
            <button
              type="button"
              className="group grid w-full grid-cols-12 items-center gap-4 py-8 text-left md:gap-8 md:py-10"
              aria-expanded={isOpen}
              onClick={() => setActive(isOpen ? null : index)}
            >
              <div className="col-span-3 md:col-span-2">
                <span
                  className="display-mag text-5xl leading-none tabular-nums md:text-7xl lg:text-8xl"
                  style={{ color: "var(--ink)", fontWeight: 200 }}
                >
                  {service.number}
                </span>
              </div>
              <div className="col-span-7 md:col-span-8">
                <h3
                  className="display-mag text-4xl leading-[0.95] md:text-6xl lg:text-7xl"
                  style={{ color: "var(--ink)", fontWeight: 600 }}
                >
                  {service.title}
                </h3>
              </div>
              <div className="col-span-2 flex justify-end">
                <span
                  className={`inline-flex h-10 w-10 items-center justify-center rounded-full transition-all duration-500 md:h-12 md:w-12 ${
                    isOpen ? "rotate-45" : ""
                  }`}
                  style={{
                    backgroundColor: isOpen ? "#b54d25" : "transparent",
                    border: "1px solid #b54d25",
                    color: isOpen ? "var(--cream)" : "#b54d25"
                  }}
                  aria-hidden="true"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M7 1V13M1 7H13"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="square"
                    />
                  </svg>
                </span>
              </div>
            </button>
            <div
              className={`grid transition-[grid-template-rows,opacity] duration-700 ease-[cubic-bezier(0.25,0.8,0.25,1)] ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div className="grid grid-cols-12 gap-4 pb-10 md:gap-8 md:pb-14">
                  <div className="col-span-12 md:col-start-3 md:col-span-8">
                    <p className="max-w-2xl text-base font-light leading-relaxed text-ink-soft md:text-lg">
                      {service.copy}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
