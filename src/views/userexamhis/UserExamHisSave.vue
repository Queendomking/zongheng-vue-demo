<template>
    <page-card title="考生试卷记录管理"
               sub-title="保存"
               :need-back="true">
        <a-form :form="form"
                :label-col="{ span: 6 }"
                :wrapper-col="{ span: 12 }">
            <a-form-item label="总分">
                <a-input v-decorator="['totalPoint']" />
            </a-form-item>
            <a-form-item label="试卷名+姓名+考试序号(时间戳)">
                <a-input v-decorator="['name']" />
            </a-form-item>
            <a-form-item label="试卷id">
                <a-input v-decorator="['examPaperId']" />
            </a-form-item>
            <a-form-item label="考生id">
                <a-input v-decorator="['userId']" />
            </a-form-item>
            <a-form-item label="试题id">
                <a-input v-decorator="['questionId']" />
            </a-form-item>
            <a-form-item label="学生答案">
                <a-input v-decorator="['userOption']" />
            </a-form-item>
            <a-form-item label="是否正确">
                <a-input v-decorator="['correctFlag']" />
            </a-form-item>
            <a-form-item label="真实得分">
                <a-input v-decorator="['point']" />
            </a-form-item>
            <a-form-item label="创建时间">
                <a-input v-decorator="['createTime']" />
            </a-form-item>
            <a-form-item label="考试开始时间">
                <a-input v-decorator="['beginTime']" />
            </a-form-item>
            <a-form-item label="考试结束时间">
                <a-input v-decorator="['endTime']" />
            </a-form-item>

            <a-form-item label=" "
                         :colon="false">
                <div style="text-align:center">
                    <a-button type="primary"
                              action
                              @click="handleSave"
                              style="width:80px;">保存</a-button>
                </div>
            </a-form-item>
        </a-form>

    </page-card>
</template>

<script>
import { userExamHisSaveOrUpdate } from '@/api/userexamhis'

export default {
  data () {
    return {
      form: this.$form.createForm(this)
    }
  },
  mounted () {

  },
  methods: {
    handleSave () {
      this.form.validateFieldsAndScroll((err, values) => {
        if (err) {
          return
        }
        userExamHisSaveOrUpdate(values).then((response) => {
          this.message.success('保存成功')
          this.$router.go(-1)
        })
      })
    }
  }
}
</script>

<style>
</style>
