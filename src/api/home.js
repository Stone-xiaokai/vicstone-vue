import request from '@/utils/request'
export function orderCountreq() {
  return request({
    url:'/member/selectOrderCount',
    method:'get'
  })
}

export function productCountByStatus(params) {
  return request({
    url:'/member/selectProductCount'+params,
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
