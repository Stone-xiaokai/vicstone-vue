import request from '@/utils/request'
// export function fetchList(params) {
//   return request({
//     url:'/product/list',
//     method:'get',
//     params:params
//   })
// }

export function fetchList(data) {
  return request({
    url:'/product/selectByExample',
    method:'post',
    data:data
  })
}

export function productCateSmall(params) {
  return request({
    url:'/productCategory/'+params,
    method:'get'
    // params:params
  })
}

export function fetchSimpleList(params) {
  return request({
    url:'/product/simpleList',
    method:'get',
    params:params
  })
}

export function updateDeleteStatus(params) {
  return request({
    url:'/product/update/deleteStatus',
    method:'post',
    params:params
  })
}

export function updateNewStatus(params) {
  return request({
    url:'/product/update/newStatus',
    method:'post',
    params:params
  })
}

export function updateRecommendStatus(params) {
  return request({
    url:'/product/update/recommendStatus',
    method:'post',
    params:params
  })
}

export function updatePublishStatus(params) {
  return request({
    url:'/product/update/productStatus',
    method:'post',
    params:params
  })
}

export function createProduct(data) {
  return request({
    url:'/product/create',
    method:'post',
    data:data
  })
}

export function updateProduct(id,data) {
  return request({
    url:'/product/update/'+id,
    method:'post',
    data:data
  })
}

export function getProduct(id) {
  return request({
    url:'/product/updateInfo/'+id,
    method:'get',
  })
}

