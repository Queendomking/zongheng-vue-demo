<template>
  <page-card :title="userExamTitle + '在线考试'"
             style="">
    <div class="table-page-search-wrapper">
      <a-card v-for="(item,index) in userExamQuestionList"
              style="margin-bottom: 10px;"
              :title="item.question.title"
              :key="index">
        <a slot="extra">
          <a-input placeholder="请输入答案选项"
                   v-model="item.userOption"></a-input>
        </a>
        <p v-for="(childItem,childItemIndex) in item.question.children"
           :title="childItem.title"
           :key="childItemIndex">{{childItemIndex+1}}、{{childItem.title}}</p>
      </a-card>
    </div>
    <a-form :label-col="{ span: 6 }"
            :wrapper-col="{ span: 12 }">
      <a-form-item label=" "
                   :colon="false">
        <div style="text-align:center">
          <a-button type="primary"
                    icon="plus"
                    @click="submitUserExamPaper()">
            提交
          </a-button>
        </div>
      </a-form-item>
    </a-form>
  </page-card>
</template>
<script>
import { getUserExamPaper, submitUserExamPaper } from '@/api/userexam'

export default {
  data () {
    return {
      userExamTitle: '',
      userExamQuestionList: [],
    }
  },
  created () {
    if (this.hasPermissions('edit', 'delete')) {
      this.columns.push({
        title: '操作',
        width: 130,
        align: 'center',
        scopedSlots: { customRender: 'action' }
      })
    }
    this.getUserExamPaper()
  },
  activated () {
  },
  methods: {
    getUserExamPaper () {
      getUserExamPaper().then((response) => {
        this.userExamTitle = response.userExamTitle
        this.userExamQuestionList = response.userExamList
      })
    },
    submitUserExamPaper () {
      let that = this
      that.confirm({
        content: '确定提交吗？',
        onOk () {
          submitUserExamPaper(that.userExamQuestionList).then((response) => {
            that.message.success(response.result)
          })
        },
        onCancel () {
        },
      });
    }
  }
}
</script>
<style scoped lang="less">
/deep/.ant-page-header-heading-title {
  text-align: center;
}
</style>