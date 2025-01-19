/* eslint-disable no-undef */
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import axios from "axios";

dotenv.config();

const app = express();

// Rate limiting
const limiter = rateLimit({
  windowMs: 2 * 60 * 1000,
  max: 2,
});

const allowlist = process.env.NODE_ENV === "production" 
    ? process.env.FRONTEND_URL 
    : "http://localhost:5173";

const corsOptionsDelegate = function (req, callback) {
  const origin = req.header("Origin");
  const url = req.url;
  let corsOptions;
  if (origin === allowlist || url === "/") {
    console.log("CORS allowed for:", origin);
    corsOptions = { origin: true, methods: ["GET", "POST"] }; // Enable CORS
    callback(null, corsOptions); // Proceed with the request
  } else {
    console.log("CORS not allowed for:", origin);
    corsOptions = { origin: false }; // Disable CORS for disallowed origins
    callback(new Error("Not allowed by CORS"), corsOptions); // abort request with custom error
  }
};

// Apply CORS middleware
app.use(cors(corsOptionsDelegate));
app.use(express.json());
app.use(limiter);

// Configure API clients
const anthropicClient = axios.create({
  baseURL: "https://api.anthropic.com/v1",
  headers: {
    "x-api-key": process.env.CLAUDE_API_KEY,
    "anthropic-version": "2023-06-01",
  },
});

const openaiClient = axios.create({
  baseURL: "https://api.openai.com/v1",
  headers: {
    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
  },
});

// Validate and sanitize API parameters
const validateParams = (params) => {
  const { maxTokens, temperature, topP, topK, model, systemPrompt, stream } =
    params;

  return {
    maxTokens: Math.min(Math.max(1, maxTokens || 1024), 4096),
    temperature: Math.min(Math.max(0, temperature || 0.7), 1),
    topP: Math.min(Math.max(0, topP || 1), 1),
    topK: Math.min(Math.max(1, topK || 40), 100),
    model: model || "claude-3-opus-20240229",
    systemPrompt: systemPrompt || "",
    stream: stream || false,
  };
};

// Generate response using Claude
app.post("/api/generate/claude", async (req, res) => {
  try {
    const { prompt, ...params } = req.body;
    const validatedParams = validateParams(params);

    const messages = [];
    if (validatedParams.systemPrompt) {
      messages.push({
        role: "system",
        content: validatedParams.systemPrompt,
      });
    }

    messages.push({
      role: "user",
      content: prompt,
    });

    const response = await anthropicClient.post("/messages", {
      model: validatedParams.model,
      max_tokens: validatedParams.maxTokens,
      messages: messages,
      temperature: validatedParams.temperature,
      top_p: validatedParams.topP,
      top_k: validatedParams.topK,
      stream: validatedParams.stream,
    });

    res.json({
      content: response.data.content[0].text,
      usage: response.data.usage,
      model: response.data.model,
    });
  } catch (error) {
    console.error("Claude API Error:", error.response?.data || error.message);
    res.status(500).json({
      error: "Failed to generate response with Claude",
      details: error.response?.data,
    });
  }
});

// Generate response using GPT
app.post("/api/generate/gpt", async (req, res) => {
  console.log("GPT API called");
  try {
    const { prompt, ...params } = req.body;
    const validatedParams = validateParams(params);

    const messages = [];
    if (validatedParams.systemPrompt) {
      messages.push({
        role: "system",
        content: validatedParams.systemPrompt,
      });
    }

    messages.push({
      role: "user",
      content: prompt,
    });

    const response = await openaiClient.post("/chat/completions", {
      model: validatedParams.model || "gpt-4-turbo-preview",
      messages: messages,
      max_tokens: validatedParams.maxTokens,
      temperature: validatedParams.temperature,
      top_p: validatedParams.topP,
      stream: validatedParams.stream,
      presence_penalty: 0,
      frequency_penalty: 0,
      n: 1,
    });

    res.json({
      content: response.data.choices[0].message.content,
      usage: response.data.usage,
      model: response.data.model,
      finish_reason: response.data.choices[0].finish_reason,
    });
  } catch (error) {
    console.error("OpenAI API Error:", error.response?.data || error.message);
    res.status(500).json({
      error: "Failed to generate response with GPT",
      details: error.response?.data,
    });
  }
});

// Get available models
app.get("/api/models", (req, res) => {
  const models = {
    claude: [
      "claude-3-opus-20240229",
      "claude-3-sonnet-20240229",
      "claude-3-haiku-20240307",
    ],
    gpt: ["gpt-4-turbo-preview", "gpt-4", "gpt-3.5-turbo"],
  };
  res.json(models);
});

// Health check endpoint
app.get("/", cors(), (req, res) => {
  res.json({
    status: "ok",
    message: "Prompt Runner is up and running!",
    timestamp: new Date().toISOString(),
    services: {
      claude: "available",
      gpt: "available",
    },
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
