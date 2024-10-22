import { useState } from "react";
import services from "./services";
// import { useCopyToClipboard } from "./copy";

export const useDockerfileGenerator = () => {
  // State management
  const [isLoading, setIsLoading] = useState(false);
  const [dockerfile, setDockerfile] = useState("");
  const [dockerCompose, setDockerCompose] = useState("");
  const [error, setError] = useState("");
  const [selectedServices, setSelectedServices] = useState([]);
  const [generateCompose, setGenerateCompose] = useState(false);
  const [language, setLanguage] = useState("");
  const [framework, setFramework] = useState("");
  const [aiModel, setAiModel] = useState("Claude");

  const getServicePort = (serviceValue) => {
    const service = serviceValue;
    return service ? service.port : "8000";
  };

  const generateDockerConfiguration = async () => {
    if (!language || !framework) {
      setError("Please select both a language and framework.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Generate Dockerfile
      const appPort = language.toLowerCase() === "python" ? "8000" : "3000";
      const generatedDockerfile = `FROM ${language.toLowerCase()}:latest
WORKDIR /app
COPY . .
RUN ${
        language.toLowerCase() === "python"
          ? "pip install -r requirements.txt"
          : "npm install"
      }
EXPOSE ${appPort}
CMD ${
        language.toLowerCase() === "python"
          ? '["python", "app.py"]'
          : '["npm", "start"]'
      }`;

      setDockerfile(generatedDockerfile);

      // Generate Docker Compose if enabled
      if (generateCompose && selectedServices.length > 0) {
        const composeServices = selectedServices.reduce((acc, serviceValue) => {
          acc[serviceValue] = {
            image: `${serviceValue}:latest`,
            ports: [
              `${getServicePort(serviceValue)}:${getServicePort(serviceValue)}`,
            ],
          };
          return acc;
        }, {});

        const generatedCompose = `version: '3.8'
services:
  app:
    build: .
    ports:
      - "${appPort}:${appPort}"
    depends_on:
      ${selectedServices.map((s) => `- ${s}`).join("\n      ")}
${Object.entries(composeServices)
  .map(
    ([name, config]) => `
  ${name}:
    image: ${config.image}
    ports:
      - "${config.ports[0]}"`
  )
  .join("")}`;

        setDockerCompose(generatedCompose);
      }
    } catch (err) {
      setError("Failed to generate Dockerfile. Please try again.");
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

    // Setters
    setSelectedServices,
    setGenerateCompose,
    setLanguage,
    setFramework,
    setDockerfile,
    setDockerCompose,
    setError,
    setAiModel,

    // Actions
    generateDockerConfiguration,

    // Constants
    services: services,
  };
};
