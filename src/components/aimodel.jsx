import PropTypes from 'prop-types';

const AIModelLogo = ({ model }) => {
  const baseClasses = "w-8 h-8 mr-2";
  
  return (
    <div className="flex items-center justify-center">
      <div className={`${baseClasses} rounded-full flex items-center justify-center ${
        model === 'Claude' ? 'bg-purple-600' : 'bg-green-600'
      }`}>
        {model === 'Claude' ? (
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="currentColor">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="currentColor">
            <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" fillRule="evenodd" />
          </svg>
        )}
      </div>
      <span>{model}</span>
    </div>
  );
};

AIModelLogo.propTypes = {
  model: PropTypes.string.isRequired,  // Add prop validation
};

export default AIModelLogo
