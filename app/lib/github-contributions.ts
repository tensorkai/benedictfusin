import { alignContributionWeeks } from "./contribution-calendar";
import { cacheLife } from "next/cache";

export interface ContributionDay {
  date: string;
  count: number;
  level: number;
  week: number;
  weekday: number;
}

export interface ContributionData {
  username: string;
  total: number;
  activeDays: number;
  longestStreak: number;
  bestDay: ContributionDay | null;
  days: ContributionDay[];
  updatedAt: string;
}



export async function getGitHubContributions(
  username: string,
): Promise<ContributionData | null> {
  "use cache";
  cacheLife("hours");

  try {
    const response = await fetch(`https://github.com/users/${username}/contributions`, {
      headers: {
        Accept: "text/html",
        "User-Agent": "portfolio-contribution-visualizer",
      },
    });

    if (!response.ok) return null;

    const html = await response.text();
    const cellPattern = /data-date="([^"]+)"[\s\S]*?data-level="(\d+)"[\s\S]*?<\/td>\s*<tool-tip[^>]*>([^<]+)<\/tool-tip>/g;
    const parsed: Array<Omit<ContributionDay, "week" | "weekday">> = [];

    for (const match of html.matchAll(cellPattern)) {
      const countMatch = match[3].match(/(\d+) contribution/);
      parsed.push({
        date: match[1],
        level: Number(match[2]),
        count: countMatch ? Number(countMatch[1]) : 0,
      });
    }

    if (parsed.length === 0) return null;

    const days = alignContributionWeeks(parsed);

    let longestStreak = 0;
    let currentStreak = 0;
    let bestDay: ContributionDay | null = null;

    for (const day of days) {
      if (day.count > 0) {
        currentStreak += 1;
        longestStreak = Math.max(longestStreak, currentStreak);
      } else {
        currentStreak = 0;
      }

      if (!bestDay || day.count > bestDay.count) bestDay = day;
    }

    return {
      username,
      total: days.reduce((sum, day) => sum + day.count, 0),
      activeDays: days.filter((day) => day.count > 0).length,
      longestStreak,
      bestDay,
      days,
      updatedAt: new Date().toISOString(),
    };
  } catch {
    return null;
  }
}
