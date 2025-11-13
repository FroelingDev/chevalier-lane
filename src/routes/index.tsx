import { createFileRoute } from "@tanstack/react-router";
import { Mail, Sparkles } from "lucide-react";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

const milestones = [
  {
    title: "Bespoke Experiences",
    copy: "Curated itineraries and elevated service for weddings, corporate travel, and private soirées.",
  },
  {
    title: "Signature Fleet",
    copy: "A collection that blends iconic classics with contemporary luxury, maintained to concours standards.",
  },
  {
    title: "Concierge Access",
    copy: "Personal liaisons, real-time travel intelligence, and seamless coordination across every touchpoint.",
  },
];

function RouteComponent() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-luxury-ivory via-white to-luxury-ivory text-luxury-black">
      <div className="relative isolate overflow-hidden py-24 sm:py-32">
        <div className="absolute inset-0 opacity-70 bg-[radial-gradient(circle_at_top,_rgba(184,134,11,0.15),_transparent_55%)]" />
        <div className="absolute inset-0 opacity-60 bg-[linear-gradient(120deg,rgba(184,134,11,0.08)_1px,transparent_1px)] bg-[length:260px_260px]" />

        <div className="relative mx-auto flex max-w-5xl flex-col gap-16 px-6 text-center sm:px-8 lg:px-0">
          <div className="mx-auto max-w-3xl space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-black/5 bg-white/70 px-6 py-2 text-sm uppercase tracking-[0.3em] text-black/60">
              <Sparkles className="h-4 w-4 text-luxury-gold" />
              Chevalier Lane
            </div>
            <h1 className="text-4xl font-light leading-tight text-luxury-black sm:text-5xl lg:text-6xl">
              A new chapter in{" "}
              <span className="luxury-serif text-luxury-gold">
                bespoke travel
              </span>{" "}
              arrives shortly.
            </h1>
            <p className="luxury-serif text-xl text-luxury-black/70 sm:text-2xl">
              We are refining every detail of the Chevalier Lane digital
              experience to mirror the poise, discretion, and artistry of our
              on-the-ground service.
            </p>
          </div>

          <div className="flex flex-col items-center gap-6 rounded-3xl border border-black/5 bg-white/80 p-8 shadow-2xl shadow-luxury-gold/10 backdrop-blur">
            <div className="flex flex-wrap items-center justify-center gap-8 text-left text-luxury-black/80">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-luxury-gold/10">
                  <Mail className="h-6 w-6 text-luxury-gold" />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-wide text-luxury-black/50">
                    Info line
                  </p>
                  <p className="text-lg font-semibold text-luxury-black">
                    info@chevalierlane.com
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full text-sm text-luxury-black/60 sm:text-base">
              Kindly contact our concierge for reservations or bespoke event
              planning while we finalize the new experience.
            </div>
          </div>

          <div className="grid gap-6 text-left sm:grid-cols-2 lg:grid-cols-3">
            {milestones.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-black/5 bg-white/80 p-6 shadow-lg shadow-black/5 transition hover:-translate-y-1 hover:border-luxury-gold/50"
              >
                <p className="luxury-serif text-xl text-luxury-gold">
                  {item.title}
                </p>
                <p className="mt-3 text-sm text-luxury-black/70">{item.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
