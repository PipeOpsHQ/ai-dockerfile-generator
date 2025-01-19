export async function fetchSystemPrompt() {
  try {
    // Fetch the Markdown file from the given URL
    const response = await fetch("url/to/prompts.md");

    if (!response.ok) {
      throw new Error(`Failed to fetch prompts: ${response.statusText}`);
    }

    // Get the content of the Markdown file
    const markdownContent = await response.text();

    // Return the plain text content
    return markdownContent;
  } catch (error) {
    console.error("Error while fetching prompts:", error);
    throw error; // Re-throw the error for the caller to handle
  }
}

export async function fetchSystemPromptForDockerCompose() {
  try {
    // Fetch the Markdown file from the given URL
    const response = await fetch("url/to/prompts.md");

    if (!response.ok) {
      throw new Error(`Failed to fetch prompts: ${response.statusText}`);
    }

    // Get the content of the Markdown file
    const markdownContent = await response.text();

    // Return the plain text content
    return markdownContent;
  } catch (error) {
    console.error("Error while fetching prompts:", error);
    throw error; // Re-throw the error for the caller to handle
  }
}
