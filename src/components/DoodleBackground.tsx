import type { ReactNode } from "react";
import doodlePattern from "../assets/doodle-pattern.svg?url";

export default function DoodleBackground({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-brand-50 via-white to-white">
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.3]"
        style={{
          backgroundImage: `url(${doodlePattern})`,
          backgroundRepeat: "repeat",
          backgroundSize: "480px 480px",
        }}
        aria-hidden="true"
      />
      {children}
    </div>
  );
}
