const downloadFile = (content, type) => {
  const element = document.createElement("a");
  const file = new Blob([content], { type: "text/plain" });
  element.href = URL.createObjectURL(file);

  // Set correct filename and extension
  switch (type) {
    case "dockerfile":
      element.download = "Dockerfile"; // Dockerfile has no extension
      break;
    case "compose":
      element.download = "docker-compose.yml"; // Use .yml extension
      break;
    case "compose-override":
      element.download = "docker-compose.override.yml";
      break;
    case "compose-prod":
      element.download = "docker-compose.prod.yml";
      break;
    case "compose-dev":
      element.download = "docker-compose.dev.yml";
      break;
    default:
      element.download = "docker-config.txt";
  }

  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};
export default downloadFile;
