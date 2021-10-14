import http from '@zt/zongheng-pro/framework/http'



/**
* 查试卷
* @param {Object} params
*/
export function getUserExamPaper () {
  return http.post('userExam/getUserExamPaper')
}
/**
* 提交试卷
* @param {Object} params
*/
export function submitUserExamPaper (data) {
  return http.post('userExam/submitUserExamPaper', data)
}

/**
* 分页
* @param {Object} params
*/
export function userExamList (data) {
  return http.post('userExam/list', data)
}

/**
* 删除
* @param {Object} data
*/
export function userExamDel (data) {
  return http.post('userExam/delete', data)
}

/**
* 新增或修改
* @param {Object} data
*/
export function userExamSaveOrUpdate (data) {
  const url = data.id ? 'userExam/update' : 'userExam/save'
  return http.post(url, data)
}

/**
* 获取详情
* @param {Long} id
* @returns
*/
export function userExamGetById (id) {
  return http.get('userExam/getById/' + id)
}


