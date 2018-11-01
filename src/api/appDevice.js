import request from '@/utils/request'

export function fetchList(query) {
  console.log('domain=' + query.domain)
  if (query.domain === '亚太机房') {
    query.domain = 'as.revogi.net'
  }
  return request({
    baseURL: process.env.BASE_API + query.domain.split('.')[0],
    url: '/admin/appDevice/pww/list',
    method: 'get',
    params: query
  })
}

export function fetchPwwDetail(query) {
  return request({
    baseURL: process.env.BASE_API + query.domain.split('.')[0],
    url: '/admin/appDevice/pww/detail',
    method: 'get',
    params: query
  })
}

export function fetchFdwList(query) {
  console.log('domain=' + query.domain)
  if (query.domain === '亚太机房') {
    query.domain = 'as.revogi.net'
  }
  return request({
    baseURL: process.env.BASE_API + query.domain.split('.')[0],
    url: '/admin/appDevice/fdw/list',
    method: 'get',
    params: query
  })
}

export function fetchFdwDetail(query) {
  return request({
    baseURL: process.env.BASE_API + query.domain.split('.')[0],
    url: '/admin/appDevice/fdw/detail',
    method: 'get',
    params: query
  })
}

