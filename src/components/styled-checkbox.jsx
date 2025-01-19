import { Check } from 'lucide-react';
import PropTypes from 'prop-types';


const StyledCheckbox = ({ label, checked, onChange, description }) => {
  return (
    <label className="flex items-center space-x-2 group cursor-pointer select-none">
      <div className="relative flex items-center justify-center">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="sr-only peer"
        />
        <div className="w-5 h-5 border-2 rounded-md border-gray-500 peer-checked:border-blue-500 
                      bg-gray-700 peer-checked:bg-blue-500 transition-all duration-200 
                      group-hover:border-blue-400">
          <Check 
            className={`w-4 h-4 text-white transform transition-all duration-200 ${
              checked ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
            }`}
          />
        </div>
      </div>
      <div className="flex-1">
        <div className="text-sm font-medium text-gray-200">{label}</div>
        {description && (
          <div className="mt-1 text-xs text-gray-400 transition-all duration-200 group-hover:text-gray-300">
            {description}
          </div>
        )}
      </div>
    </label>
  );
};

StyledCheckbox.propTypes = {
  label: PropTypes.string.isRequired,  // Add prop validation
  checked: PropTypes.bool.isRequired,  // Add prop validation
  onChange: PropTypes.func.isRequired,  // Add prop validation
  description: PropTypes.string.isRequired,  // Add prop validation
};

export default StyledCheckbox;