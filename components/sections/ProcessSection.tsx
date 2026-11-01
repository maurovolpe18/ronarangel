import { ProcessTimeline } from "@/components/ProcessTimeline";

export function ProcessSection() {
  return (
    <section className="relative overflow-hidden bg-[var(--wine-deep)] py-20 text-cream md:py-32">
      <h2 className="mb-10 px-6 font-display text-[14vw] font-light uppercase leading-[0.9] tracking-[-0.04em] text-rust md:mb-12 md:px-[8vw] md:text-[8.2vw]">
        Work <span className="font-bold">Process</span>
      </h2>
      <ProcessTimeline />
    </section>
  );
}
