import BackgroundSection from "./components/BackgroundSection";
import FloatingCertificate from "./components/FloatingCertificate";
import TechLogo from "./components/TechLogo";

import ProjectCarousel from "./components/ProjectCarousel";
import SiteShell from "./components/SiteShell";
import FloatingHero from "./components/FloatingHero";
import GitHubContributionScene from "./components/GitHubContributionScene";
import {
  education,
  experience,
  profile,
  projectSlots,
  stack,
} from "./content";

export default function Home() {
  return (
    <SiteShell mode="career">
      <main id="main">
        <section className="hero-section" aria-labelledby="hero-heading">
          <div className="container"><FloatingHero /></div>
        </section>

        <section id="toolkit" className="toolkit section">
          <div className="container">
            <div className="toolkit__heading">
              <p className="section-kicker">The toolkit</p>
              <h2>Fluent across the whole signal path.</h2>
              <p>From an interface gesture to an API, a model, a database, or a physical sensor.</p>
            </div>

            <div className="toolkit__body"><div className="stack-table">
              {stack.map((row) => (
                <div key={row.group} className="stack-row">
                  <div className="stack-row__heading">
                    <h3>{row.group}</h3>
                    <p>{row.subtitle}</p>
                  </div>
                  <ul>
                    {row.items.map((tech) => (
                      <li key={tech.name}>
                        <TechLogo src={tech.logo} name={tech.name} />
                        <span>{tech.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div><FloatingCertificate placement="toolkit" /></div>
          </div>
        </section>

        <section id="selected-work" className="selected-work section">
          <div className="container">
            <div className="section-heading">
              <div>
                <p className="section-kicker">Selected work</p>
                <h2>Proof lives in the build.</h2>
              </div>
              <a href={`${profile.github}?tab=repositories`} target="_blank" rel="noopener noreferrer">
                Browse all repositories <span aria-hidden="true">↗</span>
              </a>
            </div>

            <ProjectCarousel projects={projectSlots} />
          </div>
        </section>

        <div className="container"><FloatingCertificate placement="activity" /></div>

        <section id="practice" className="practice section">
          <div className="container">
            <div className="practice__statement">
              <p className="section-kicker">The daily practice</p>
              <h2>{profile.practice.heading}</h2>
              <p>
                Repetition turns curiosity into range: firmware sketches, model experiments,
                interface studies, and the discipline to keep shipping.
              </p>
              <a href={profile.github} target="_blank" rel="noopener noreferrer">
                View the activity graph <span aria-hidden="true">↗</span>
              </a>
            </div>
            <GitHubContributionScene />
          </div>
        </section>

        <BackgroundSection id="education" title="Education" intro="The foundation behind the work." entries={education} />
        <BackgroundSection id="experience" title="Experience" intro="Professional experience and community involvement." entries={experience}>
          <FloatingCertificate placement="milestones" />
        </BackgroundSection>


      </main>

      <footer className="footer">
        <div className="container">
          <p className="footer__prelude">Have a difficult idea?</p>
          <div className="footer__callout">
            <p>Let&apos;s make it real.</p>
            <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="Contact Benedict on GitHub">
              <span aria-hidden="true">↗</span>
            </a>
          </div>
          <div className="footer__meta">
            <span>© 2026 Benedict Fusin</span>
            <span>Electronics engineer / developer / visual maker</span>
            <span>Manila ↔ Hangzhou</span>
          </div>
        </div>
      </footer>
    </SiteShell>
  );
}
