import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/admin/appUser/list',
    method: 'get',
    params: query
  })
}

export function fetchUserDevices(query) {
  return request({
    baseURL: process.env.BASE_API + query.domain.split('.')[0],
    url: '/admin/appUser/deviceInfo',
    method: 'get',
    params: query
  })
}
