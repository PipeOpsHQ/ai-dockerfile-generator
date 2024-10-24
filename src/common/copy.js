import { useState } from "react";

export const useCopyToClipboard = () => {
  const [copySuccess, setCopySuccess] = useState({
    dockerfile: false,
    compose: false,
  });

  const copyToClipboard = (content, type) => { 
    navigator.clipboard.writeText(content);
    setCopySuccess((prev) => ({ ...prev, [type]: true }));
    setTimeout(
      () => setCopySuccess((prev) => ({ ...prev, [type]: false })),
      2000
    );
  };

  return { copySuccess, copyToClipboard };
};
