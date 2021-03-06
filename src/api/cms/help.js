import request from '@/utils/request'
export function fetchList(params) {
    return request({
        url:'/cms/help/list',
        method:'get',
        params:params
    })
}
export function createHelp(data) {
    return request({
        url:'/cms/help/create',
        method:'post',
        data:data
    })
}

export function deleteHelp(id) {
    return request({
        url:'/cms/help/delete/'+id,
        method:'get',
    })
}

export function getHelp(id) {
    return request({
        url:'/cms/help/'+id,
        method:'get',
    })
}

export function updateHelp(id,data) {
    return request({
        url:'/cms/help/update/'+id,
        method:'post',
        data:data
    })
}

