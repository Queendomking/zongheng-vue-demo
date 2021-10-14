<template>
    <page-card title="管理"
               sub-title="编辑"
               :need-back="true">
        <a-form :form="form"
                :label-col="{ span: 6 }"
                :wrapper-col="{ span: 12 }">
            <a-form-item label="ID"
                         v-show="false">
                <a-input v-decorator="['id']" />
            </a-form-item>
            <a-form-item label="">
                <a-input v-decorator="['userId']" />
            </a-form-item>
            <a-form-item label="">
                <a-input v-decorator="['questionId']" />
            </a-form-item>
            <a-form-item label="">
                <a-input v-decorator="['userOption']" />
            </a-form-item>
            <a-form-item label="">
                <a-input v-decorator="['correctFlag']" />
            </a-form-item>
            <a-form-item label="">
                <a-input v-decorator="['point']" />
            </a-form-item>
            <a-form-item label="">
                <a-input v-decorator="['createTime']" />
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
import { userExamSaveOrUpdate, userExamGetById } from '@/api/userexam'

export default {
  data () {
    return {
      form: this.$form.createForm(this)
    }
  },
  mounted () {
    const params = this.$route.query
    if (Object.keys(params).length == 0) {
      return
    }
    if (params.id) {
      userExamGetById(params.id).then(response => {
        this.form.setFieldsValue(response)
      })
    }
  },
  methods: {
    handleSave () {
      this.form.validateFieldsAndScroll((err, values) => {
        if (err) {
          return
        }
        userExamSaveOrUpdate(values).then((response) => {
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
