# Services

The project includes several service files organized in the `src/services` directory.

## Key Services

- **api.ts**: Contains API service functions.
- **types.ts**: Contains TypeScript types used across the services.
- **auth/**: Directory for authentication-related services.

## Service Structure

### api.ts

```typescript
import axios from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const fetchData = async () => {
  try {
    const response = await apiClient.get('/data')
    return response.data
  } catch (error) {
    throw new Error('Failed to fetch data')
  }
}

// Other API service functions
```

### types.ts

```typescript
export interface ApiResponse {
  data: any
  status: number
  statusText: string
}

export interface AuthResponse {
  token: string
  user: {
    id: string
    name: string
    email: string
  }
}

// Other TypeScript types
```

### auth/google.ts

```typescript
import { googleToolkit } from 'vue3-google-login'

export const initGoogleAuth = () => {
  googleToolkit.load().then(() => {
    googleToolkit.init({
      clientId: import.meta.env.VITE_APP_GOOGLE_CLIENT_ID,
    })
  })
}

export const signInWithGoogle = () => {
  return new Promise((resolve, reject) => {
    googleToolkit.signIn().then(
      (user) => {
        resolve(user)
      },
      (error) => {
        reject(error)
      }
    )
  })
}

// Other Google authentication functions
