import { useEffect } from 'react';
import { AlertCircle, Check, Copy, Download, Loader2, RefreshCw } from 'lucide-react';
import downloadFile from './common/download';
import AIModelLogo from './components/aimodel';
import ServiceCard from './components/service-card';
import { useCopyToClipboard } from './common/copy';
import { useDockerfileGenerator } from './common/generators';
// import StyledCheckbox from './components/styled-checkbox';
import CompactToggle from './components/compact-toggle';

const languages = [
  'Python', 'JavaScript', 'Java', 'C#', 'PHP', 'Go', 'Ruby', 'TypeScript', 
  'Swift', 'Kotlin', 'Rust', 'Scala', 'Dart', 'Elixir', 'Haskell', 'C++', 
  'Perl', 'R', 'Objective-C', 'Shell', 'Lua', 'Clojure', 'F#', 'Erlang'
];

const frameworks = {
  Python: ['Django', 'Flask', 'FastAPI', 'Pyramid', 'Tornado', 'Bottle'],
  JavaScript: ['Express.js', 'React', 'Angular', 'Vue.js', 'Next.js', 'Meteor'],
  Java: ['Spring Boot', 'Hibernate', 'Struts', 'JavaServer Faces', 'Play Framework'],
  'C#': ['.NET Core', 'ASP.NET', 'Entity Framework', 'Xamarin', 'Unity'],
  PHP: ['Laravel', 'Symfony', 'CodeIgniter', 'Yii', 'CakePHP', 'Zend Framework'],
  Go: ['Gin', 'Echo', 'Beego', 'Buffalo', 'Revel', 'Fiber'],
  Ruby: ['Ruby on Rails', 'Sinatra', 'Hanami', 'Padrino', 'Grape'],
  TypeScript: ['Angular', 'NestJS', 'Express.js with TypeScript', 'Deno'],
  Swift: ['Vapor', 'Perfect', 'Kitura', 'SwiftNIO'],
  Kotlin: ['Ktor', 'Spring Boot with Kotlin', 'Android Development'],
  Rust: ['Rocket', 'Actix', 'Warp', 'Iron'],
  Scala: ['Play Framework', 'Akka', 'Lift', 'Scalatra'],
  Dart: ['Flutter', 'AngularDart', 'Aqueduct'],
  Elixir: ['Phoenix', 'Nerves', 'Absinthe'],
  Haskell: ['Yesod', 'Snap', 'Servant', 'Scotty'],
  'C++': ['Qt', 'Boost', 'Poco', 'Cinder', 'JUCE'],
  Perl: ['Catalyst', 'Dancer', 'Mojolicious'],
  R: ['Shiny', 'Plumber'],
  'Objective-C': ['Cocoa', 'Cocoa Touch'],
  Shell: ['Bash', 'Zsh', 'Fish'],
  Lua: ['LÖVE', 'OpenResty', 'Lapis'],
  Clojure: ['Ring', 'Compojure', 'Luminus'],
  'F#': ['Giraffe', 'Saturn'],
  Erlang: ['Cowboy', 'Chicago Boss', 'N2O']
};

const App = () => {
  const {copySuccess, copyToClipboard} = useCopyToClipboard();
  const {
    generateDockerConfiguration,
    generateCompose,
    setGenerateCompose,
    selectedServices,
    setSelectedServices,
    services,
    dockerCompose,
    setDockerCompose,
    dockerfile, setDockerfile,
    isLoading,
    language, setLanguage,
    framework, setFramework,
    error, setError,
    aiModel, setAiModel,
    context, setContext,
    contextValue, setContextValue 
  } = useDockerfileGenerator();

  useEffect(() => {
    setAiModel('GPT');
  }, [setAiModel]);

  const handleServiceToggle = (service) => {
    setSelectedServices(prev =>
      prev.includes(service)
        ? prev.filter(s => s !== service)
        : [...prev, service]
    );
  };

  const resetForm = () => {
    setLanguage('');
    setFramework('');
    setDockerfile('');
    setDockerCompose('');
    setSelectedServices([]);
    setGenerateCompose(false);
    setAiModel("GPT");
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-blue-300">Dockerfile Generator</h1>
          <p className="mt-2 text-xl text-gray-400">Create optimized Dockerfiles for your projects</p>
        </header>

        <main className="bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-blue-300 mb-6">Generate Your Custom Dockerfile</h2>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="language" className="block text-sm font-medium text-gray-300 mb-1">
                    Programming Language
                  </label>
                  <select
                    id="language"
                    value={language}
                    onChange={(e) => {
                      setLanguage(e.target.value);
                      setFramework('');
                    }}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-600 bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg text-gray-200"
                    >
                    <option value="">Select a language</option>
                    {languages.map(lang => (
                      <option key={lang} value={lang}>{lang}</option>
                    ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="framework" className="block text-sm font-medium text-gray-300 mb-1">
                    Framework
                    </label>
                    <select
                    id="framework"
                    value={framework}
                    onChange={(e) => setFramework(e.target.value)}
                    disabled={!language}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-600 bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg text-gray-200 disabled:opacity-50"
                    >
                    <option value="">Select a framework</option>
                    {language && frameworks[language]?.map(fw => (
                      <option key={fw} value={fw}>{fw}</option>
                    ))}
                    </select>
                  </div>
                  </div>

                  <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">AI Model</label>
                  <div className="grid grid-cols-2 gap-4">
                    {['GPT', 'Claude'].map((model) => (
                    <button
                      key={model}
                      onClick={() => setAiModel(model)}
                      className={`flex items-center justify-center p-4 rounded-lg border-2 transition-all ${
                      aiModel === model
                        ? 'border-blue-500 bg-blue-500/20'
                        : 'border-gray-600 hover:border-blue-400'
                      }`}
                      disabled={model === 'Claude'}
                    >
                      <AIModelLogo model={model} />
                      {model === 'Claude' && (
                      <span className="ml-2 text-xs text-yellow-400">Coming Soon</span>
                      )}
                    </button>
                    ))}
                  </div>
                  </div>

                  <div className="space-y-6">
                  {/* Add Docker Compose Section */}
                <div className="bg-gray-800 p-4 rounded-lg shadow-md">
                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-medium text-gray-300">
                      Add Docker Compose File
                    </label>
                    <CompactToggle
                      checked={generateCompose}
                      onToggle={setGenerateCompose}
                    />
                  </div>

                  {generateCompose && (
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Additional Services
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {services.map((service) => (
                          <ServiceCard
                            key={service.value}
                            service={service}
                            selected={selectedServices.includes(service.value)}
                            onToggle={handleServiceToggle}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Context Section */}
                <div className="bg-gray-800 p-4 rounded-lg shadow-md">
                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-medium text-gray-300">
                      Add Context for Your Dockerfile
                    </label>
                    <CompactToggle
                      checked={context}
                      onToggle={setContext}
                    />
                  </div>

                  {context && (
                    <div className="mt-4">
                      <textarea
                        value={contextValue}
                        onChange={(e) => setContextValue(e.target.value)}
                        className="w-full p-2 bg-gray-700 text-gray-200 rounded-lg focus:ring-blue-500"
                        placeholder="(e.g., custom packages, environment variables, build arguments, etc.)"
                        rows="3"
                        style={{ maxHeight: '500px' }}
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={generateDockerConfiguration}
                  disabled={!language || !framework || isLoading}
                  className="flex-1 flex justify-center items-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="animate-spin mr-2" />
                      Generating...
                    </>
                  ) : (
                    'Generate Dockerfile'
                  )}
                </button>
                <button
                  onClick={resetForm}
                  className="px-4 py-2 border border-gray-600 rounded-lg shadow-sm text-sm font-medium text-gray-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <RefreshCw className="h-5 w-5" />
                </button>
              </div>
            </div>

            {error && (
              <div className="mt-6 p-4 bg-red-900/50 border-l-4 border-red-500 rounded-lg">
                <div className="flex">
                  <AlertCircle className="h-5 w-5 text-red-400" />
                  <p className="ml-3 text-sm text-red-300">{error}</p>
                </div>
              </div>
            )}

            {dockerfile && (
              <div className="mt-8 space-y-6">
                {/* Dockerfile Section */}
                <div>
                  <h3 className="text-lg font-medium text-blue-300 mb-4">Dockerfile</h3>
                  <div className="relative">
                    <pre
                      className="bg-gray-900 rounded-lg p-4 text-sm text-green-400 font-mono overflow-y-auto"
                      style={{ maxHeight: '500px' }}
                    >
                      {dockerfile}
                    </pre>
                    <div className="absolute top-2 right-2 flex space-x-2">
                      <button
                        onClick={() => copyToClipboard(dockerfile, 'dockerfile')}
                        className="p-2 text-gray-400 hover:text-white rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors"
                        title="Copy to clipboard"
                      >
                        {copySuccess.dockerfile ? (
                          <Check className="h-5 w-5 text-green-500" />
                        ) : (
                          <Copy className="h-5 w-5" />
                        )}
                      </button>
                      <button
                        onClick={() => downloadFile(dockerfile, 'dockerfile')}
                        className="p-2 text-gray-400 hover:text-white rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors"
                        title="Download Dockerfile"
                      >
                        <Download className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* docker-compose.yaml Section */}
                {generateCompose && dockerCompose && (
                  <div>
                    <h3 className="text-lg font-medium text-blue-300 mb-4">docker-compose.yaml</h3>
                    <div className="relative">
                      <pre
                        className="bg-gray-900 rounded-lg p-4 text-sm text-green-400 font-mono overflow-y-auto"
                        style={{ maxHeight: '500px' }}
                      >
                        {dockerCompose}
                      </pre>
                      <div className="absolute top-2 right-2 flex space-x-2">
                        <button
                          onClick={() => copyToClipboard(dockerCompose, 'compose')}
                          className="p-2 text-gray-400 hover:text-white rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors"
                          title="Copy to clipboard"
                        >
                          {copySuccess.compose ? (
                            <Check className="h-5 w-5 text-green-500" />
                          ) : (
                            <Copy className="h-5 w-5" />
                          )}
                        </button>
                        <button
                          onClick={() => downloadFile(dockerCompose, 'compose')}
                          className="p-2 text-gray-400 hover:text-white rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors"
                          title="Download docker-compose.yml"
                        >
                          <Download className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </main>

        <footer className="mt-8 text-center text-sm text-gray-400">
          <div className="flex items-center justify-center space-x-2">
            <span>Built with</span>
            <span className="text-red-400">❤️</span>
            <span>by</span>
            <a
              href="https://pipeops.io"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              pipeops.io
            </a>
          </div>
          <div className="mt-2">
            Powered by {aiModel === 'Claude' ? 'Anthropic' : 'OpenAI'}
          </div>
          <div className="mt-2">
            <a
              href="https://github.com/PipeOpsHQ/ai-dockerfile-generator"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-300 transition-colors flex items-center justify-center"
            >
              <svg
                className="w-5 h-5 mr-1"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.34-3.369-1.34-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.607.069-.607 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.646 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.91-1.294 2.75-1.025 2.75-1.025.544 1.376.202 2.393.1 2.646.64.699 1.028 1.592 1.028 2.683 0 3.842-2.337 4.687-4.565 4.936.36.31.68.92.68 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.013 10.013 0 0022 12c0-5.523-4.477-10-10-10z"
                  clipRule="evenodd"
                />
              </svg>
              Contribute on GitHub
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;