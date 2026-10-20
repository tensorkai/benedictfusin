export type Repository = {
  name: string;
  description: string | null;
  language: string | null;
  url: string;
  stars: number;
  forks: number;
  topics: string[];
  updated: string;
  archived: boolean;
};

export function filterRepositories(repositories: Repository[], query: string, language: string, sort: string) {
  const search = query.trim().toLowerCase();
  return repositories.filter((repo) =>
    (language === "All" || repo.language === language) &&
    `${repo.name} ${repo.description ?? ""} ${repo.topics.join(" ")}`.toLowerCase().includes(search),
  ).sort((a, b) => sort === "name" ? a.name.localeCompare(b.name) : sort === "stars" ? b.stars - a.stars || a.name.localeCompare(b.name) : b.updated.localeCompare(a.updated));
}
