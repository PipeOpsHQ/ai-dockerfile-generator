import { Check, Copy, Download } from "lucide-react";
import downloadFile from "../common/download";
import { useCopyToClipboard } from "../common/copy";
import PropTypes from 'prop-types';

const EditorPanel = ({ content, refProp, filename }) => {
    
const {copySuccess, copyToClipboard} = useCopyToClipboard();

    return (
    <div className="space-y-4">
      <div className="bg-gray-900 rounded-lg overflow-hidden shadow-inner">
        <textarea
          ref={refProp}
          value={content}
          readOnly
          className="w-full h-64 p-4 text-sm text-green-400 bg-transparent border-0 focus:ring-0 resize-none font-mono"
          spellCheck="false"
        />
      </div>
      <div className="flex justify-end space-x-4">
        <button
          onClick={() => copyToClipboard(content)}
          className="inline-flex items-center px-4 py-2 border border-gray-600 rounded-lg shadow-sm text-sm font-medium text-gray-300 bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
        >
          {copySuccess ? (
            <>
              <Check className="h-5 w-5 mr-2 text-green-500" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="h-5 w-5 mr-2" />
              Copy to Clipboard
            </>
          )}
        </button>
        <button
          onClick={() => downloadFile(content, filename)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
        >
          <Download className="h-5 w-5 mr-2" />
          Download {filename}
        </button>
      </div>
    </div>
  );
}

EditorPanel.propTypes = {
  content: PropTypes.string.isRequired,  // Add prop validation
  refProp: PropTypes.string.isRequired,  // Add prop validation
  filename: PropTypes.string.isRequired,  // Add prop validation
};

  export default EditorPanel