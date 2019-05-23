import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/member/list',
    method:'get',
    params:params
  })
}
export function createMember(data) {
  return request({
    url:'/member/create',
    method:'post',
    data:data
  })
}
export function updateShowStatus(data) {
  return request({
    url:'/member/update/showStatus',
    method:'post',
    data:data
  })
}

export function updateFactoryStatus(data) {
  return request({
    url:'/member/update/factoryStatus',
    method:'post',
    data:data
  })
}

export function deleteMember(id) {
  return request({
    url:'/member/delete/'+id,
    method:'get',
  })
}

export function getMember(id) {
  return request({
    url:'/member/'+id,
    method:'get',
  })
}

export function updateMember(id,data) {
  return request({
    url:'/member/update/'+id,
    method:'post',
    data:data
  })
}

export function orderCountreq() {
  return request({
    url:'/member/selectOrderCount',
    method:'get'
  })
}

export function productCountByStatus(params) {
  return request({
    url:'/member/selectProductCount/'+params,
    method:'get'
  })
}

export function productCount() {
  return request({
    url:'/member/selectProductCount',
    method:'get'
  })
}

export function userCount() {
  return request({
    url:'/member/selectUserCount',
    method:'get'
  })
}

export function selectProductCountCate() {
  return request({
    url:'/member/selectProductCountCate',
    method:'get'
  })
}



