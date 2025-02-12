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
  }
})
```

## TypeScript Configuration

The project uses multiple `tsconfig` files for different environments:

- **tsconfig.app.json**
- **tsconfig.json**
- **tsconfig.node.json**
- **tsconfig.vitest.json**

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

## Environment Variables

The `.env.example` file provides example environment variables:

```
VITE_APP_GOOGLE_CLIENT_ID=<google_client_id>
VITE_API_ENDPOINT=http://localhost:3001/
