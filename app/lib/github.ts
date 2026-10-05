const GITHUB_USERNAME = "sebaxe07";

export async function fetchReadme(repoName: string): Promise<string | null> {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${GITHUB_USERNAME}/${repoName}/readme`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
      }
    );

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    const base64Content = data.content.replace(/\s/g, "");

    const binaryString = atob(base64Content);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    return new TextDecoder("utf-8").decode(bytes);
  } catch {
    return null;
  }
}
