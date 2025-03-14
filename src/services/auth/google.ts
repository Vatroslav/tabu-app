// the axios instance and types
import http from '../api'

async function checkEmail(name: string, email: string) {
  return await http({
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
    },
  })
}

export { checkEmail }
