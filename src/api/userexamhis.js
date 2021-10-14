import http from '@zt/zongheng-pro/framework/http'

/**
* 分页
* @param {Object} params
*/
export function userExamHisList (data) {
  return http.post('userExamHis/list', data)
}

/**
* 删除
* @param {Object} data
*/
export function userExamHisDel (data) {
  return http.post('userExamHis/delete', data)
}

/**
* 新增或修改
* @param {Object} data
*/
export function userExamHisSaveOrUpdate (data) {
  const url = data.id ? 'userExamHis/update' : 'userExamHis/save'
  return http.post(url, data)
}

/**
* 获取详情
* @param {Long} id
* @returns
*/
export function userExamHisGetById (id) {
  return http.get('userExamHis/getById/' + id)
}


