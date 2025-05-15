# Configuration

The project uses several configuration files to manage different aspects of the development environment.

## Vite Configuration

The `vite.config.ts` file configures Vite for the project:

```typescript
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    allowedHosts: true,
  }
})
```

Key features:
- Vue and Vue DevTools plugins enabled
- Path alias `@` pointing to `src` directory
- Server configuration allowing all hosts

## TypeScript Configuration

The project uses multiple `tsconfig` files for different environments:

- **tsconfig.json**: Base TypeScript configuration
- **tsconfig.app.json**: Application-specific TypeScript configuration
- **tsconfig.node.json**: Node.js-specific TypeScript configuration
- **tsconfig.vitest.json**: Testing-specific TypeScript configuration

## ESLint Configuration

The `eslint.config.js` file configures ESLint for the project:

```javascript
import pluginVue from 'eslint-plugin-vue'
import vueTsEslintConfig from '@vue/eslint-config-typescript'
import pluginVitest from '@vitest/eslint-plugin'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
  },

  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
  },

  ...pluginVue.configs['flat/essential'],
  ...vueTsEslintConfig(),
  
  {
    ...pluginVitest.configs.recommended,
    files: ['src/**/__tests__/*'],
  },
  skipFormatting,
]
```

Features:
- Lints TypeScript and Vue files
- Ignores build and coverage directories
- Uses Vue, TypeScript, and Vitest plugins
- Skips formatting (handled by Prettier)

## Environment Variables

The `.env.example` file provides example environment variables:

```
# Request from project owner or use your own client ID
VITE_APP_GOOGLE_CLIENT_ID=<google_client_id>
# Set to tabu-db-api backend server (defaults to default docker container)
VITE_API_ENDPOINT=http://localhost:3001/
```

Additional configuration files:
- **.env.d.ts**: TypeScript declarations for environment variables
- **.prettierrc.json**: Prettier code formatting configuration
- **.editorconfig**: Editor configuration for consistent coding styles
- **vitest.config.ts**: Vitest testing framework configuration
