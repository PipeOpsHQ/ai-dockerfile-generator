import PropTypes from 'prop-types';


const CompactToggle = ({ label, onToggle, checked }) => (
  <div className="flex items-center justify-between">
    <span className="text-sm text-gray-300">{label}</span>
    <button
      onClick={() => onToggle(!checked)}
      className={`relative inline-flex items-center h-6 w-11 transition-colors ${
        checked ? 'bg-blue-600' : 'bg-gray-600'
      } rounded-full`}
    >
      <span
        className={`${
          checked ? 'translate-x-6' : 'translate-x-1'
        } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
      />
    </button>
  </div>
);

CompactToggle.propTypes = {
  label: PropTypes.string.isRequired,
  onToggle: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
};

export default CompactToggle;
