# Project Overview

The frontend repo is a Vue 3 application using Vite for build and development. The project is well-structured with clear configurations and dependencies, making it easy to maintain and extend.

## Key Features

- **Vue 3**: Frontend framework.
- **Vue Router**: Routing.
- **Axios**: HTTP requests.
- **vue3-google-login**: Google authentication.

## Scripts

- **Development**: `vite`
- **Build**: `vite build`
- **Testing**: `vitest`
- **Linting**: `eslint . --fix`
- **Formatting**: `prettier --write src/`

## Vite Configuration

- **Plugins**: Vue and Vue DevTools.
- **Alias**: `@` points to the `src` directory.

## Entry Point

- The application is created using `createApp` from Vue.
- The router is used with `app.use(router)`.
- Google Login is configured with a client ID from environment variables.

## Routing

- **Routes**: `/home`, `/login`, `/about`, `/results`.
- **Lazy Loading**: Used for the `/about` and `/results` routes.

## Project Structure

- **Public Assets**: Static assets including a favicon and various logo images.
- **Components**: Key components include `HomeItem.vue`, `LoginItem.vue`, `NavbarItem.vue`, and icon components.
- **Views**: Main views include `AboutView.vue`, `HomeView.vue`, `LoginView.vue`, and `ResultsView.vue`.
- **Services**: API service functions in `api.ts` and TypeScript types in `types.ts`. Authentication-related services in the `auth` directory.

## Configuration Files

- **TypeScript Configuration**: Multiple `tsconfig` files for different environments.
- **ESLint Configuration**: Configured to lint `.ts`, `.mts`, `.tsx`, and `.vue` files, ignoring `dist`, `dist-ssr`, and `coverage` directories. Uses plugins for Vue, TypeScript, and Vitest.
- **Environment Variables**: Example variables for Google Client ID and API endpoint.
