# Project Overview

The frontend repo is a Vue 3 application using Vite for build and development. The project is well-structured with clear configurations and dependencies, making it easy to maintain and extend.

## Tech Stack
- **Framework**: Vue.js 3.5
- **Language**: TypeScript
- **Build Tool**: Vite 6.2
- **Package Manager**: npm
- **Testing Framework**: Vitest
- **Code Quality**: ESLint, Prettier
- **Key Dependencies**:
  - axios: HTTP client
  - vue-router: Routing
  - vue-multiselect: Advanced select component
  - vue3-google-login: Google authentication

## Project Structure
```
tabu-app/
├── src/                    # Source code
│   ├── assets/            # Static assets
│   ├── components/        # Reusable Vue components
│   ├── router/            # Vue Router configuration
│   ├── services/          # API and service layer
│   │   ├── auth/         # Authentication services
│   │   │   ├── google.ts # Google authentication
│   │   │   └── index.ts  # Auth service exports
│   │   ├── api.ts        # API client configuration
│   │   ├── types.ts      # TypeScript type definitions
│   │   ├── salary.ts     # Salary-related services
│   │   ├── submission.ts # Submission services
│   │   └── ...          # Other service files
│   ├── types/            # TypeScript type definitions
│   ├── utils/            # Utility functions
│   ├── views/            # Page components
│   ├── App.vue           # Root component
│   └── main.ts           # Application entry point
├── public/               # Public static assets
├── .env                  # Environment variables
├── .env.example         # Example environment variables
├── vite.config.ts       # Vite configuration
└── tsconfig.json        # TypeScript configuration
```

## Development Tools
- **IDE Configuration**: Includes `.vscode/` settings
- **Code Formatting**: 
  - Prettier configuration in `.prettierrc.json`
  - EditorConfig in `.editorconfig`
- **Linting**: ESLint configuration in `eslint.config.js`
- **TypeScript**: Multiple TSConfig files for different purposes:
  - `tsconfig.json`: Base configuration
  - `tsconfig.app.json`: App-specific configuration
  - `tsconfig.node.json`: Node-specific configuration
  - `tsconfig.vitest.json`: Testing configuration

## Available Scripts
- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build
- `npm run test:unit`: Run unit tests
- `npm run lint`: Run ESLint with auto-fix
- `npm run format`: Format code with Prettier

## Vite Configuration
- **Plugins**: Vue and Vue DevTools
- **Alias**: `@` points to the `src` directory
- **Build Configuration**: Optimized for production builds
- **Server Configuration**: Allows all hosts for development

## Entry Point
- The application is created using `createApp` from Vue
- The router is used with `app.use(router)`
- Google Login is configured with a client ID from environment variables

## Routing
- **Routes**: `/login`, `/results`
- **Lazy Loading**: Used for the `/results` route

## Project Structure Details
- **Public Assets**: Static assets including a favicon and various logo images
- **Components**: Key components include `LoginItem.vue`, `NavbarItem.vue`, and icon components
- **Views**: Main views include `LoginView.vue` and `ResultsView.vue`
- **Services**: 
  - API client configuration in `api.ts`
  - Authentication services in `auth/` directory
  - Salary and submission services
  - Various data filtering and listing services
  - TypeScript type definitions in `types.ts`

## Environment Variables
The project uses environment variables (stored in `.env`) with an example template provided in `.env.example`. Environment variable types are defined in `env.d.ts`.

## Project Guidelines
- Code of Conduct available in `CODE_OF_CONDUCT.md`
- Security guidelines in `SECURITY.md`
- Contribution guidelines in `CONTRIBUTING.md`
- License information in `LICENSE`
