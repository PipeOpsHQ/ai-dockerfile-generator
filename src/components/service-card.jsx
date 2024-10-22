import { Check } from "lucide-react";
import PropTypes from 'prop-types';


const ServiceCard = ({ service, selected, onToggle }) => {
  return (
    <button
      onClick={() => onToggle(service.value)}
      className={`p-4 rounded-lg border-2 transition-all ${
        selected
          ? 'border-blue-500 bg-blue-500/20'
          : 'border-gray-600 hover:border-blue-400'
      }`}
    >
      <div className="flex flex-col items-center">
        <div className="mb-2">
          {service.icon}
        </div>
        <div className="text-sm font-medium">{service.name}</div>
        <div className="text-xs text-gray-400 mt-1">Port: {service.port}</div>
        {selected && (
          <div className="mt-2 text-xs text-blue-400 flex items-center">
            <Check className="w-3 h-3 mr-1" />
            Selected
          </div>
        )}
      </div>
    </button>
  );
};

ServiceCard.propTypes = {
  service: PropTypes.object.isRequired,  // Add prop validation
  selected: PropTypes.bool.isRequired,  // Add prop validation
  onToggle: PropTypes.func.isRequired,  // Add prop validation
};

export default ServiceCard