Create a docker-compose.yml file for a ${language} ${framework} application with the following services: ${selectedServices.join(
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
      
      Please provide only the docker-compose.yml content without any explanations.