import { siteConfig } from "@/config/site";
import { formatGithubThousands, githubRestHeaders } from "@/lib/github-api";
import { Hero } from "./hero";

async function getGithubStats() {
  try {
    const token = process.env.GITHUB_TOKEN;
    const user = siteConfig.githubUser;

    let totalStars = 0;
    let totalForks = 0;

    const fetchReposPage = async (page: number, useToken: boolean) => {
      const url = `https://api.github.com/users/${user}/repos?per_page=100&page=${page}&type=owner`;
      return await fetch(url, {
        headers: githubRestHeaders(useToken && token ? token : undefined),
        next: { revalidate: 600 },
      });
    };

    for (let page = 1; page <= 50; page++) {
      let response = await fetchReposPage(page, true);

      if (response.status === 401 && token) {
        response = await fetchReposPage(page, false);
      }

      if (!response.ok) {
        break;
      }

      const repos: {
        stargazers_count: number;
        forks_count: number;
        fork: boolean;
      }[] = await response.json();
      if (!Array.isArray(repos) || repos.length === 0) {
        break;
      }

      for (const repo of repos) {
        if (repo.fork) {
          continue;
        }
        totalStars += repo.stargazers_count ?? 0;
        totalForks += repo.forks_count ?? 0;
      }

      if (repos.length < 100) {
        break;
      }
    }

    if (totalStars === 0) {
      return { stars: "—", forks: "—" };
    }

    return {
      stars: formatGithubThousands(totalStars),
      forks: formatGithubThousands(totalForks),
    };
  } catch {
    return { stars: "—", forks: "—" };
  }
}

export async function HeroWithStats() {
  const [githubStats] = await Promise.all([getGithubStats()]);
  return <Hero initialStats={githubStats} />;
}
