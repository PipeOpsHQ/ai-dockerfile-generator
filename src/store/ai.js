import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
  timeout: 30000,
});

const defaultParams = {
  maxTokens: 1024,
  temperature: 0.7,
  topP: 1,
  topK: 40,
  stream: false,
};

export const generateWithClaude = async (prompt, params = {}) => {
  try {
    const response = await apiClient.post("/generate/claude", {
      prompt,
      ...defaultParams,
      ...params,
    });
    return {
      content: response.data.content,
      usage: response.data.usage,
      model: response.data.model,
    };
  } catch (error) {
    console.error("Generation Error:", error.response?.data || error.message);
    throw new Error(
      error.response?.data?.error || "Failed to generate response"
    );
  }
};

export const generateWithGPT = async (prompt, params = {}) => {
  try {
    const response = await apiClient.post("/generate/gpt", {
      prompt,
      ...defaultParams,
      ...params,
    });
    return {
      content: response.data.content,
      usage: response.data.usage,
      model: response.data.model,
      finish_reason: response.data.finish_reason,
    };
  } catch (error) {
    console.error("Generation Error:", error.response?.data || error.message);
    throw new Error(
      error.response?.data?.error || "Failed to generate response"
    );
  }
};

export const getAvailableModels = async () => {
  try {
    const response = await apiClient.get("/models");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch models:", error);
    throw new Error("Failed to fetch available models");
  }
};