<template>
  <page-card title="试卷"
             sub-title="编辑"
             :need-back="true">
    <a-form :form="form"
            :label-col="{ span: 6 }"
            :wrapper-col="{ span: 12 }">
      <a-form-item label="ID"
                   v-show="false">
        <a-input v-decorator="['id']" />
      </a-form-item>
      <a-form-item label="名称"
                   v-show="false">
        <a-input v-decorator="['name']" />
      </a-form-item>
      <a-form-item label="名称1111">
        <a-select default-value="lucy"
                  style="width: 120px"
                  @change="handleChange">
          <a-select-option value="jack">
            Jack
          </a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item label="年级">

        <Selector v-decorator="['grade',{ rules: [{ required: true, message: '请选择年级!' }]}]"
                  placeholder="试卷所属年级"
                  :allowClear="true"
                  :size="'default'"
                  :optionValue="gradeDict.optionValue"
                  :url="gradeDict.url"
                  :param="gradeDict.param"
                  :method="gradeDict.method"
                  :optionKey="gradeDict.optionKey" />
      </a-form-item>
      <a-form-item label="类型">
        <Selector v-decorator="['type',{ rules: [{ required: true, message: '请选择试卷类型!' }]}]"
                  placeholder="试卷所属类型"
                  :allowClear="true"
                  :size="'default'"
                  :optionValue="typeDict.optionValue"
                  :url="typeDict.url"
                  :param="typeDict.param"
                  :method="typeDict.method"
                  :optionKey="typeDict.optionKey" />

      </a-form-item>
      <a-form-item label="学科">
        <Selector v-decorator="['subject',{ rules: [{ required: true, message: '请选择学科!' }]}]"
                  placeholder="试卷所属学科"
                  :allowClear="true"
                  :size="'default'"
                  :optionValue="subjectDict.optionValue"
                  :url="subjectDict.url"
                  :param="subjectDict.param"
                  :method="subjectDict.method"
                  :optionKey="subjectDict.optionKey" />
      </a-form-item>
      <a-form-item label="考试时长(分)">
        <a-input-number :min="30"
                        :max="500"
                        width="100"
                        placeholder="考试时长，最少30分钟，最大300分钟"
                        v-decorator="['duration']" />
      </a-form-item>
      <a-form-item label="备注">
        <a-input v-decorator="['remark',{ rules: [{ required: true, message: '请选择试卷备注!' }]}]"
                 placeholder="试卷备注" />
      </a-form-item>

      <a-form-item label=" ">
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
import { examPaperSaveOrUpdate, examPaperGetById } from '@/api/exampaper'
import { Selector } from 'zenith-vue-components'
export default {
  data () {
    return {
      form: this.$form.createForm(this),
      typeDict: {
        mode: 'default',
        url: 'system/SysDict/queryList',
        param: { code: 'ExamType' },
        optionValue: 'dictKey',
        optionKey: 'dictValue',
        method: 'post'
      },
      subjectDict: {
        mode: 'default',
        url: 'system/SysDict/queryList',
        param: { code: 'ExamSubject' },
        optionValue: 'dictKey',
        optionKey: 'dictValue',
        method: 'post'
      },
      gradeDict: {
        mode: 'default',
        url: 'system/SysDict/queryList',
        param: { code: 'ExamGrade' },
        optionValue: 'dictKey',
        optionKey: 'dictValue',
        method: 'post'
      },
    }
  },
  components: { Selector },
  mounted () {
    const params = this.$route.query
    if (Object.keys(params).length == 0) {
      return
    }
    if (params.id) {
      examPaperGetById(params.id).then(response => {
        debugger
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
        examPaperSaveOrUpdate(values).then((response) => {
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
