import CosmicAtmosphere from "./CosmicAtmosphere";
import type { ReactNode } from "react";
import SiteNavigation from "./SiteNavigation";

export default function SiteShell({ mode, children }: { mode: "career" | "personal"; children: ReactNode }) {
  return (
    <div className={`site-shell theme-${mode}`} id="top">
      <CosmicAtmosphere />
      <a className="skip-link" href="#main">Skip to content</a>
      <SiteNavigation key={mode} mode={mode} />
      {children}
    </div>
  );
}
