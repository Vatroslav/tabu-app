# Dependencies

The project uses the following dependencies, as specified in `package.json`:

## Production Dependencies

- **axios**: ^1.7.7 - Promise based HTTP client for the browser and node.js
  - Used for making API requests to the backend server
  - Configured with base URL from environment variables
  - Handles authentication headers and error responses

- **vue**: ^3.5.12 - Vue.js is a progressive, incrementally-adoptable JavaScript framework for building UI on the web
  - Core framework for building the application
  - Uses Composition API for component logic
  - Provides reactivity system and component lifecycle

- **vue-multiselect**: ^3.2.0 - Advanced select component for Vue.js
  - Used in forms for selecting multiple options
  - Provides searchable dropdown functionality
  - Customizable styling and behavior

- **vue-router**: ^4.4.5 - The official router for Vue.js
  - Handles client-side routing
  - Supports lazy loading of route components
  - Manages navigation guards and route meta fields

- **vue3-google-login**: ^2.0.33 - Google Login Plugin for Vue 3
  - Handles Google OAuth authentication
  - Manages user session and tokens
  - Provides login/logout functionality

## Development Dependencies

### TypeScript and Configuration
- **@tsconfig/node20**: ^20.1.4 - TypeScript configuration for Node.js 20
- **@types/jsdom**: ^21.1.7 - TypeScript types for jsdom
- **@types/node**: ^20.16.11 - TypeScript types for Node.js
- **@vue/tsconfig**: ^0.5.1 - TypeScript config for Vue.js projects
- **typescript**: ~5.5.4 - TypeScript language for application-scale JavaScript
- **vue-tsc**: ^2.1.6 - TypeScript Vue Plugin (volar)
  - Used for type checking and compilation
  - Provides IDE support and type safety
  - Ensures code quality and consistency

### Build and Development Tools
- **@vitejs/plugin-vue**: ^5.1.4 - Vite plugin for Vue.js
- **vite**: ^6.2.1 - Next generation frontend tooling
- **vite-plugin-vue-devtools**: ^7.4.6 - Vite plugin for Vue DevTools
  - Provides fast development server
  - Handles hot module replacement
  - Optimizes production builds
  - Enables Vue DevTools integration

### Testing
- **@vue/test-utils**: ^2.4.6 - Utilities for testing Vue components
- **vitest**: ^3.0.7 - A Vite-native test framework
- **jsdom**: ^25.0.1 - JavaScript implementation of the WHATWG DOM and HTML standards
  - Used for unit testing components
  - Provides DOM simulation for tests
  - Enables component testing in isolation

### Code Quality
- **eslint**: ^9.12.0 - ESLint static analysis tool
- **@vitest/eslint-plugin**: 1.1.7 - ESLint plugin for Vitest
- **@vue/eslint-config-prettier**: ^10.0.0 - ESLint config for Prettier
- **@vue/eslint-config-typescript**: ^14.0.1 - ESLint config for TypeScript in Vue.js projects
- **eslint-plugin-vue**: ^9.29.0 - ESLint plugin for Vue.js
- **prettier**: ^3.3.3 - An opinionated code formatter
  - Enforces code style and best practices
  - Provides automatic code formatting
  - Catches potential errors and issues

### Script Management
- **npm-run-all2**: ^6.2.3 - CLI tool to run multiple npm-scripts in parallel or sequential
  - Used in build process to run multiple tasks
  - Enables parallel execution of scripts
  - Manages complex build workflows

## Dependency Management

- All dependencies are managed through npm
- Version numbers follow semantic versioning
- Development dependencies are used for building, testing, and linting
- Production dependencies are bundled with the application
- Regular updates are performed to maintain security and features
- Dependencies are audited for vulnerabilities
