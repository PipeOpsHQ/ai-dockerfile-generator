import { useState } from "react";
import services from "./services";
import { generateWithClaude, generateWithGPT } from "../store/ai";
import {
  fetchSystemPrompt,
  fetchSystemPromptForDockerCompose,
} from "../store/prompt";
// import { useCopyToClipboard } from "./copy";

export const useDockerfileGenerator = () => {
  // State management
  const [isLoading, setIsLoading] = useState(false);
  const [dockerfile, setDockerfile] = useState("");
  const [dockerCompose, setDockerCompose] = useState("");
  const [error, setError] = useState("");
  const [selectedServices, setSelectedServices] = useState([]);
  const [generateCompose, setGenerateCompose] = useState(false);
  const [context, setContext] = useState(false);
  const [contextValue, setContextValue] = useState("");
  const [language, setLanguage] = useState("");
  const [framework, setFramework] = useState("");
  const [aiModel, setAiModel] = useState("");

  const getServicePort = (serviceValue) => {
    const service = serviceValue;
    return service ? service.port : "8000";
  };

  const resetForm = () => {
    setDockerfile("");
    setDockerCompose("");
    setError("");
  };

  const generateDockerConfiguration = async () => {
    resetForm();

    if (!language || !framework) {
      setError("Please select both a language and framework.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Generate Dockerfile
      const dockerfilePrompt = `Create a production-ready Dockerfile for a ${language} application using the ${framework} framework. 
        Requirements:
        - Use the official ${language} base image
        - Follow best practices for security and optimization
        - Handle dependency installation
        - Set up the proper working directory
        - Configure appropriate ports
        - Set up the proper CMD or ENTRYPOINT
        - Minimize the image size
        - Ensure the Dockerfile is suitable for a production environment
        ${contextValue ? `Additional context: ${contextValue}` : ""}
        Please provide only the Dockerfile content without any explanations.`;

      let dockerfileResult;
      if (aiModel.includes("GPT")) {
        dockerfileResult = await generateWithGPT(dockerfilePrompt, {
          // model: "gpt-3.5-turbo-0125",
          model: "gpt-4-turbo",
          temperature: 0.3,
          maxTokens: 2048,
          systemPrompt: await fetchSystemPrompt().catch((error) => {
            console.error("Error:", error);
            throw error;
          }),
          stream: false,
        });
      } else {
        dockerfileResult = await generateWithClaude(dockerfilePrompt, {
          model: "claude-3-opus-20240229",
          temperature: 0.3,
          maxTokens: 2048,
          systemPrompt: fetchSystemPrompt()
            .then((content) => content)
            .catch((error) => console.error("Error:", error)),
          stream: false,
        });
      }

      setDockerfile(dockerfileResult.content);

      // Generate Docker Compose if enabled
      if (generateCompose && selectedServices.length > 0) {
        const composePrompt = `Create a docker-compose.yml file for a ${language} ${framework} application with the following services: ${selectedServices.join(
          ", "
        )}.
      Requirements:
      - Version 3.8 syntax
      - Include the main application service
      - Configure appropriate ports for each service
      - Set up proper service dependencies
      - Include network configuration if needed
      - Add appropriate environment variables
      
      - Configure the following for each service:
      - Expose necessary ports.
      - Define service-specific dependencies (depends_on) to ensure correct startup order.
      - Attach services to appropriate networks (e.g., shared or custom networks).  
      
      ### Additional Considerations:
      - Ensure all configurations adhere to Docker Compose best practices.
      - Use secure and minimal settings for production readiness.
      - Include fallback options or defaults for common services, such as databases or caching layers.
      ${contextValue ? `Additional context: ${contextValue}` : ""}
      Please provide only the docker-compose.yml content without any explanations.`;

        let composeResult;
        if (aiModel.includes("GPT")) {
          composeResult = await generateWithGPT(composePrompt, {
            // model: "gpt-3.5-turbo-0125",
            model: "gpt-4-turbo",
            systemPrompt: await fetchSystemPromptForDockerCompose()
              .catch((error) => {
                console.error("Error:", error);
                throw error;
              })
              .then((content) => content)
              .catch((error) => console.error("Error:", error)),
            stream: false,
          });
        } else {
          composeResult = await generateWithClaude(composePrompt, {
            model: "claude-3-opus-20240229",
            temperature: 0.3,
            maxTokens: 2048,
            systemPrompt: fetchSystemPromptForDockerCompose()
              .then((content) => content)
              .catch((error) => console.error("Error:", error)),
            stream: false,
          });
        }

        setDockerCompose(composeResult.content);
      }
    } catch (err) {
      setError(
        err.message ||
          "Failed to generate Docker configuration. Please try again."
      );
      console.error("Generation error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    // State
    isLoading,
    dockerfile,
    dockerCompose,
    error,
    selectedServices,
    generateCompose,
    language,
    framework,
    aiModel,
    context,
    contextValue,

    // Setters
    setSelectedServices,
    setGenerateCompose,
    setLanguage,
    setFramework,
    setDockerfile,
    setDockerCompose,
    setError,
    setAiModel,
    setContext,
    setContextValue,

    // Actions
    generateDockerConfiguration,
    getServicePort,

    // Constants
    services: services,
  };
};
