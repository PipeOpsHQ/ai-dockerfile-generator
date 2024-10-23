# AI-Powered Dockerfile Generator

A modern, user-friendly web application that generates optimized Dockerfiles and Docker Compose configurations based on your project's technology stack.

![Dockerfile Generator Interface](/api/placeholder/800/400)

## Features

- 🎨 Modern, dark-mode UI with a responsive design
- 🤖 AI-powered Dockerfile generation (supports Claude and GPT models)
- 📦 Support for multiple programming languages and frameworks:
  - Python (Django, Flask, FastAPI, etc.)
  - JavaScript (Express.js, React, Angular, etc.)
  - Java (Spring Boot, Hibernate, etc.)
  - And many more!
- 🔧 Docker Compose configuration generation
- 🔌 Additional service integration (PostgreSQL, MySQL, MongoDB, Redis, etc.)
- 📋 One-click copy to clipboard
- 💾 Direct Dockerfile download
- ✨ Real-time validation and error handling

## Technology Stack

- React.js
- Tailwind CSS
- Lucide React Icons
- Modern JavaScript (ES6+)

## Prerequisites

- Node.js (v14.0.0 or higher)
- npm or yarn
- Modern web browser

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/dockerfile-generator.git
cd dockerfile-generator
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:3000`

## Usage

1. Select your programming language from the dropdown menu
2. Choose the framework or library you're using
3. Select your preferred AI model (Claude or GPT)
4. Optionally enable Docker Compose generation and select additional services
5. Click "Generate Dockerfile" to create your configuration
6. Copy the generated Dockerfile or download it directly

## Project Structure

```
dockerfile-generator/
├── src/
│   ├── components/
│   │   └── DockerfileGenerator.tsx
│   ├── constants/
│   │   └── languages.ts
│   ├── hooks/
│   │   └── useDockerfile.ts
│   └── App.tsx
├── public/
├── package.json
└── README.md
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Customization

### Adding New Languages

Add new languages to the `languages` array in the source code:

```javascript
const languages = [
  'Python',
  'JavaScript',
  // Add your language here
];
```

### Adding New Frameworks

Add frameworks to the `frameworks` object:

```javascript
const frameworks = {
  Python: ['Django', 'Flask', /* Add new Python framework */],
  JavaScript: ['Express.js', 'React', /* Add new JavaScript framework */],
  // Add frameworks for new languages
};
```

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments

- Built with ❤️ by [PipeOps](https://pipeops.io)
- Icons provided by [Lucide](https://lucide.dev)
- Styling powered by [Tailwind CSS](https://tailwindcss.com)

## Support

For support, email support@pipeops.io or create an issue in the repository.
