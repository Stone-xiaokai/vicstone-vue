import request from '@/utils/request'
export function fetchList(params) {
    return request({
        url:'/cms/subject/list',
        method:'get',
        params:params
    })
}
export function createSubject(data) {
    return request({
        url:'/cms/subject/create',
        method:'post',
        data:data
    })
}

export function deleteSubject(id) {
    return request({
        url:'/cms/subject/delete/'+id,
        method:'get',
    })
}

export function getSubject(id) {
    return request({
        url:'/cms/subject/'+id,
        method:'get',
    })
}

export function updateSubject(id,data) {
    return request({
        url:'/cms/subject/update/'+id,
        method:'post',
        data:data
    })
}

