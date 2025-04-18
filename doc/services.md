# Services

The project includes several service files organized in the `src/services` directory.

## Key Services

- **api.ts**: API client configuration with authentication and error handling
- **types.ts**: TypeScript type definitions for API responses
- **auth/**: Directory for authentication-related services
  - **index.ts**: Core authentication functions
  - **google.ts**: Google authentication integration

## Service Structure

### api.ts

```typescript
import axios from 'axios'
import { setTokens, logout } from './auth'

const createApiInstance = () => {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_API_ENDPOINT,
    timeout: 2000,
    headers: { 'X-Custom-Header': 'foobar' },
  })

  // Request interceptor for adding auth token
  instance.interceptors.request.use(
    config => {
      const accessToken = localStorage.getItem('accessToken')
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
      }
      return config
    },
    error => Promise.reject(error)
  )

  // Response interceptor for handling tokens and errors
  instance.interceptors.response.use(
    response => {
      if (response.data.tokens) {
        setTokens(response.data.tokens.accessToken, response.data.tokens.refreshToken)
      }
      return response
    },
    async error => {
      // Handle token refresh on 401 errors
      if (error.response.status === 401 && !error.config._retry) {
        // ... token refresh logic
      }
      return Promise.reject(error)
    }
  )

  return instance
}

const apiInstance = createApiInstance()
export default apiInstance
```

### types.ts

```typescript
export type APIResponse<T> = {
  success: boolean
  content: T
  status?: number
}
```

### auth/index.ts

```typescript
import axios from 'axios'
import router from '@/router'

export const setTokens = (newAccessToken: string, newRefreshToken: string) => {
  localStorage.setItem('accessToken', newAccessToken)
  localStorage.setItem('refreshToken', newRefreshToken)
}

export const logout = async () => {
  const refreshToken = localStorage.getItem('refreshToken')
  await axios.post(`${import.meta.env.VITE_API_ENDPOINT}api/auth/revoke`, {}, {
    headers: {
      Authorization: `Bearer ${refreshToken}`
    }
  })
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
  await router.push('/login')
}
```

### auth/google.ts

```typescript
import { setTokens } from './index'
import http from '../api'
import router from '@/router'

async function checkEmail(name: string, email: string, credential: string) {
  const response = await http({
    url: 'api/user/check',
    method: 'POST',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
    data: {
      isGoogleLogin: true,
      email: email,
      name: name,
      credential: credential,
    },
  })

  const data = response.data
  if (data.success && data.response.tokens) {
    const { accessToken, refreshToken } = data.response.tokens
    setTokens(accessToken, refreshToken)
    localStorage.setItem('userData', JSON.stringify({
      "name": data.response.name,
      "unique_id": data.response.id
    }))
    
    if (data.success) {
      if (!data.response.exists) {
        router.push('/logout')
        return
      } else {
        router.push('/results')
      }
    }
  }

  return data
}

export { checkEmail }
```

## Service Features

### API Service
- Configurable base URL from environment variables
- Automatic token management
- Request/response interceptors
- Token refresh handling
- Error handling and logging

### Authentication Service
- Token management (set/remove)
- Google OAuth integration
- User session handling
- Automatic redirection based on auth state
- Token revocation on logout

### Type System
- Generic API response type
- Type safety for API responses
- Consistent error handling structure
