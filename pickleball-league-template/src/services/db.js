// src/services/db.js
import { Octokit } from "@octokit/rest";

const REPO_OWNER = "your-github-username";
const REPO_NAME = "pickleball-league-template";
const DATA_PATH = "data/season_2025.json";

const getClient = () => {
  const token = localStorage.getItem("gh_token");
  if (!token) throw new Error("Authentication required");
  return new Octokit({ auth: token });
};

export const getLeagueData = async () => {
  const client = getClient();
  const response = await client.repos.getContent({
    owner: REPO_OWNER,
    repo: REPO_NAME,
    path: DATA_PATH,
  });

  const content = atob(response.data.content);
  return { data: JSON.parse(content), sha: response.data.sha };
};

export const saveLeagueData = async (newData, currentSha) => {
  const client = getClient();
  const content = btoa(JSON.stringify(newData, null, 2));

  await client.repos.createOrUpdateFileContents({
    owner: REPO_OWNER,
    repo: REPO_NAME,
    path: DATA_PATH,
    message: `Update scores: ${new Date().toISOString()}`,
    content,
    sha: currentSha,
  });
};
