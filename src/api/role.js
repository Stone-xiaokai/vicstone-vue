import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/role/list',
    method:'get',
    params:params
  })
}
export function createRole(data) {
  return request({
    url:'/role/create',
    method:'post',
    data:data
  })
}
export function updateShowStatus(data) {
  return request({
    url:'/role/update/showStatus',
    method:'post',
    data:data
  })
}

export function updateFactoryStatus(data) {
  return request({
    url:'/role/update/factoryStatus',
    method:'post',
    data:data
  })
}

export function deleteRole(id) {
  return request({
    url:'/role/delete/'+id,
    method:'get',
  })
}

export function getRole(id) {
  return request({
    url:'/role/'+id,
    method:'get',
  })
}

export function updateRole(id,data) {
  return request({
    url:'/role/update/'+id,
    method:'post',
    data:data
  })
}

