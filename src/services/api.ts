import axios from 'axios'

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT,
  timeout: 2000,
  headers: { 'X-Custom-Header': 'foobar' },
})

instance.interceptors.request.use(
  config => {
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  response => {
    if (response.data.tokens) {
      localStorage.setItem('accessToken', response.data.tokens.accessToken)
      localStorage.setItem('refreshToken', response.data.tokens.refreshToken)
    }
    return response
  },
  async error => {
    const originalRequest = error.config
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      const refreshToken = localStorage.getItem('refreshToken')
      const refreshResponse = await axios.post('${import.meta.env.VITE_API_ENDPOINT}/api/auth/refresh-token', {
        refreshToken,
      })
      localStorage.setItem('accessToken', refreshResponse.data.accessToken)
      localStorage.setItem('refreshToken', refreshResponse.data.refreshToken)
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + refreshResponse.data.accessToken
      originalRequest.headers['Authorization'] = 'Bearer ' + refreshResponse.data.accessToken
      return instance(originalRequest)
    }
    return Promise.reject(error)
  }
)

export const setTokens = (newAccessToken: string, newRefreshToken: string) => {
  localStorage.setItem('accessToken', newAccessToken)
  localStorage.setItem('refreshToken', newRefreshToken)
}

export const logout = async () => {
  const refreshToken = localStorage.getItem('refreshToken')
  const response = await axios.post(`${import.meta.env.VITE_API_ENDPOINT}/api/auth/revoke`, {}, {
    headers: {
      Authorization: `Bearer ${refreshToken}`
    }
  })
  // console.log('Token revocation response:', response.data)
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
  window.location.href = '/login'
}

export default instance
