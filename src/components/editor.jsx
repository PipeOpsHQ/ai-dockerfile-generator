import { useState } from "react";
import PropTypes from "prop-types";
import { FaCheck, FaCopy, FaDownload } from "react-icons/fa";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/prism";

// Tab Navigation Component
const FileTabs = ({ files, activeFile, setActiveFile }) => {
  return (
    <div className="flex bg-gray-800 text-gray-300 rounded-t-lg">
      {files.map((file) => (
        <button
          key={file.id}
          onClick={() => setActiveFile(file.id)}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeFile === file.id
              ? "text-blue-300 border-blue-500"
              : "border-transparent hover:text-white hover:border-gray-600"
          }`}
        >
          {file.name}
        </button>
      ))}
    </div>
  );
};

// File Editor Component
const FileEditor = ({ content, onCopy, onDownload, copySuccess, fileName }) => (
  <div className="relative bg-gray-900 rounded-b-lg overflow-hidden shadow-md">
    <SyntaxHighlighter
      language={fileName.endsWith(".yml") ? "yaml" : "dockerfile"}
      style={darcula}
      customStyle={{
        backgroundColor: "transparent",
        padding: "1rem",
        borderRadius: "0.5rem",
        maxHeight: "500px",
        overflowY: "auto",
        fontSize: "0.875rem",
      }}
    >
      {content}
    </SyntaxHighlighter>
    <div className="absolute top-2 right-2 flex space-x-2">
      <button
        onClick={() => onCopy(content, fileName)}
        className="p-2 text-gray-400 hover:text-white rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors"
        title="Copy to clipboard"
      >
        {copySuccess ? (
          <FaCheck className="h-5 w-5 text-green-500" />
        ) : (
          <FaCopy className="h-5 w-5" />
        )}
      </button>
      <button
        onClick={() => onDownload(content, fileName)}
        className="p-2 text-gray-400 hover:text-white rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors"
        title={`Download ${fileName}`}
      >
        <FaDownload className="h-5 w-5" />
      </button>
    </div>
  </div>
);

// Main Code Editor Component
const CodeEditor = ({ dockerfile, dockerCompose, copyToClipboard, downloadFile, copySuccess }) => {
  const [activeFile, setActiveFile] = useState("dockerfile");

  const files = [
    { id: "dockerfile", name: "Dockerfile", content: dockerfile },
    ...(dockerCompose
      ? [{ id: "docker-compose", name: "docker-compose.yaml", content: dockerCompose }]
      : []),
  ];

  const activeFileContent = files.find((file) => file.id === activeFile)?.content;

  return (
    <div className="mt-8">
      {/* Tab Navigation */}
      <FileTabs files={files} activeFile={activeFile} setActiveFile={setActiveFile} />

      {/* File Content */}
      {activeFileContent && (
        <FileEditor
          content={activeFileContent}
          onCopy={copyToClipboard}
          onDownload={downloadFile}
          copySuccess={activeFile === "dockerfile" ? copySuccess.dockerfile : copySuccess.compose}
          fileName={activeFile === "dockerfile" ? "dockerfile" : "docker-compose.yml"}
        />
      )}
    </div>
  );
};

// PropTypes for Validation
FileTabs.propTypes = {
  files: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    })
  ).isRequired,
  activeFile: PropTypes.string.isRequired,
  setActiveFile: PropTypes.func.isRequired,
};

FileEditor.propTypes = {
  content: PropTypes.string.isRequired,
  onCopy: PropTypes.func.isRequired,
  onDownload: PropTypes.func.isRequired,
  copySuccess: PropTypes.bool.isRequired,
  fileName: PropTypes.string.isRequired,
};

CodeEditor.propTypes = {
  dockerfile: PropTypes.string.isRequired,
  dockerCompose: PropTypes.string,
  copyToClipboard: PropTypes.func.isRequired,
  downloadFile: PropTypes.func.isRequired,
  copySuccess: PropTypes.shape({
    dockerfile: PropTypes.bool.isRequired,
    compose: PropTypes.bool,
  }).isRequired,
};

export default CodeEditor;
