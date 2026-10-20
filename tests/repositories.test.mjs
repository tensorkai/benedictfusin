import { test } from "node:test";
import assert from "node:assert/strict";
import { filterRepositories } from "../app/lib/repositories.ts";

const base = { description: null, url: "https://github.com/example/example", forks: 0, topics: [], archived: false };
const repos = [
  { ...base, name: "zebra", language: "Python", stars: 2, updated: "2026-10-01", topics: ["edge-ai"] },
  { ...base, name: "alpha", language: "TypeScript", stars: 4, updated: "2026-10-02", description: "An edge-ai dashboard" },
  { ...base, name: "beta", language: null, stars: 4, updated: "2026-10-03" },
];
const names = (rows) => rows.map((r) => r.name);

test("search matches topics and descriptions, trims input, and combines with language", () => {
  assert.deepEqual(names(filterRepositories(repos, " EDGE-AI ", "All", "name")), ["alpha", "zebra"]);
  assert.deepEqual(names(filterRepositories(repos, "edge-ai", "Python", "name")), ["zebra"]);
  assert.deepEqual(filterRepositories(repos, "edge-ai", "Rust", "name"), []);
});
test("all sort options are deterministic and do not mutate source data", () => {
  assert.deepEqual(names(filterRepositories(repos, "", "All", "updated")), ["beta", "alpha", "zebra"]);
  assert.deepEqual(names(filterRepositories(repos, "", "All", "stars")), ["alpha", "beta", "zebra"]);
  assert.deepEqual(names(filterRepositories(repos, "", "All", "name")), ["alpha", "beta", "zebra"]);
  assert.deepEqual(names(repos), ["zebra", "alpha", "beta"]);
});
test("handles unnamed languages, empty input, and no results", () => {
  assert.equal(filterRepositories(repos, "beta", "All", "updated").length, 1);
  assert.deepEqual(filterRepositories(repos, "missing", "All", "updated"), []);
  assert.deepEqual(filterRepositories([], "", "All", "updated"), []);
});
