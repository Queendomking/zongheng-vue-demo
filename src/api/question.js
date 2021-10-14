import http from '@zt/zongheng-pro/framework/http'

/**
* 分页
* @param {Object} params
*/
export function questionList (data) {
  return http.post('question/list', data)
}

/**
* 删除
* @param {Object} data
*/
export function questionDel (data) {
  return http.post('question/delete', data)
}

/**
* 新增或修改
* @param {Object} data
*/
export function questionSaveOrUpdate (data) {
  const url = data.id ? 'question/update' : 'question/save'
  return http.post(url, data)
}

/**
* 获取详情
* @param {Long} id
* @returns
*/
export function questionGetById (id) {
  return http.get('question/getById/' + id)
}




