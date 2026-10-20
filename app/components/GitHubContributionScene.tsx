import ContributionCalendar from "./ContributionCalendar";
import { getGitHubContributions } from "../lib/github-contributions";

const USERNAME = "tensorkai";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00Z`));
}

export default async function GitHubContributionScene() {
  const data = await getGitHubContributions(USERNAME);

  if (!data) {
    return (
      <div className="contribution-unavailable">
        <p>GitHub activity is temporarily unavailable.</p>
        <a href={`https://github.com/${USERNAME}`} target="_blank" rel="noopener noreferrer">
          View @{USERNAME} on GitHub ↗
        </a>
      </div>
    );
  }

  return (
    <div className="contribution-display">
      <div className="contribution-display__meta">
        <div>
          <p>Live GitHub signal</p>
          <h3>{data.total.toLocaleString()} contributions</h3>
          <span>from @{data.username} · rolling 12 months</span>
        </div>
        <a href={`https://github.com/${USERNAME}`} target="_blank" rel="noopener noreferrer">
          Verify on GitHub <span aria-hidden="true">↗</span>
        </a>
      </div>

      <ContributionCalendar days={data.days} />

      <dl className="contribution-facts">
        <div><dt>Active days</dt><dd>{data.activeDays}</dd></div>
        <div><dt>Longest streak</dt><dd>{data.longestStreak}d</dd></div>
        <div>
          <dt>Strongest day</dt>
          <dd>{data.bestDay?.count ?? 0}</dd>
          <span>{data.bestDay ? formatDate(data.bestDay.date) : "—"}</span>
        </div>
        <div><dt>Data source</dt><dd>GitHub</dd><span>Refreshes hourly</span></div>
      </dl>
    </div>
  );
}
