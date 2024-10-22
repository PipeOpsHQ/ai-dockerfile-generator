import { Save, X } from "lucide-react";
import { useState } from "react";
import PropTypes from 'prop-types';


const CustomRequirementInput = ({ requirement, onSave, onCancel }) => {
  const [name, setName] = useState(requirement?.name || '');
  const [version, setVersion] = useState(requirement?.version || '');

  return (
    <div className="flex space-x-2">
      <input
        type="text"
        placeholder="Package name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="flex-1 bg-gray-700 border-gray-600 rounded-lg text-gray-200 text-sm"
      />
      <input
        type="text"
        placeholder="Version (optional)"
        value={version}
        onChange={(e) => setVersion(e.target.value)}
        className="w-32 bg-gray-700 border-gray-600 rounded-lg text-gray-200 text-sm"
      />
      <button
        onClick={() => onSave({ name, version })}
        className="p-2 text-green-400 hover:text-green-300"
        disabled={!name}
      >
        <Save className="h-5 w-5" />
      </button>
      <button
        onClick={onCancel}
        className="p-2 text-red-400 hover:text-red-300"
      >
        <X className="h-5 w-5" />
      </button>
    </div>
  );
};

CustomRequirementInput.propTypes = {
  requirement: PropTypes.string.isRequired,  // Add prop validation
  onSave: PropTypes.func.isRequired,  // Add prop validation
  onCancel: PropTypes.func.isRequired,  // Add prop validation
};

export default CustomRequirementInput