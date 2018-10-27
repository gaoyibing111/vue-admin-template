import request from '@/utils/request'

export function fetchList(query) {
  return request({
    baseURL: 'http://localhost:8088',
    url: '/admin/appUser/list',
    method: 'get',
    params: query
  })
}

export function fetchUserDevices(query) {
  return request({
    baseURL: 'http://localhost:8088',
    url: '/admin/appUser/deviceInfo',
    method: 'get',
    params: query
  })
}
