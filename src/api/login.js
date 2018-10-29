import request from '@/utils/request'

export function login(username, password) {
  return request({
    baseURL: 'http://localhost:8088',
    url: '/admin/user/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getInfo(token) {
  return request({
    baseURL: 'http://localhost:8088',
    url: '/admin/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    baseURL: 'http://localhost:8088',
    url: '/admin/user/logout',
    method: 'post'
  })
}
