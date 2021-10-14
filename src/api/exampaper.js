import http from '@zt/zongheng-pro/framework/http'

/**
* 分页
* @param {Object} params
*/
export function examPaperList (data) {
  return http.post('examPaper/list', data)
}

/**
* 删除
* @param {Object} data
*/
export function examPaperDel (data) {
  return http.post('examPaper/delete', data)
}

/**
* 新增或修改
* @param {Object} data
*/
export function examPaperSaveOrUpdate (data) {
  const url = data.id ? 'examPaper/update' : 'examPaper/save'
  return http.post(url, data)
}

/**
* 获取详情
* @param {Long} id
* @returns
*/
export function examPaperGetById (id) {
  return http.get('examPaper/getById/' + id)
}


/**
* 获取选择的试卷
* @returns
*/
export function getExamPaperSelectList () {
  return http.get('examPaper/getExamPaperSelectList')
}

