import request from '@/utils/request'

export function fetchList(query) {
  console.log('domain=' + query.domain)
  if (query.domain === '亚太机房') {
    query.domain = 'as.revogi.net'
  }
  return request({
    baseURL: 'http://' + query.domain + ':8088',
    url: '/admin/appDevice/pww/list',
    method: 'get',
    params: query
  })
}

// export function fetchUserDevices(query) {
//   return request({
//     baseURL: 'http://localhost:8088',
//     url: '/admin/appUser/deviceInfo',
//     method: 'get',
//     params: query
//   })
// }
