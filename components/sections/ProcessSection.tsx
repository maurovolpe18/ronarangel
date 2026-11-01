import { ProcessTimeline } from "@/components/ProcessTimeline";

export function ProcessSection() {
  return (
    <section data-nav="dark" className="relative overflow-hidden bg-[var(--wine-deep)] py-16 text-cream md:py-24">
      <h2 className="mb-10 px-6 font-display text-title font-light uppercase tracking-[-0.03em] text-rust md:mb-12 md:px-[8vw]">
        Work <span className="font-bold">Process</span>
      </h2>
      <ProcessTimeline />
    </section>
  );
}
