<template>
  <page-card title="试题"
             sub-title="保存"
             :need-back="true">
    <a-form :form="form"
            :label-col="{ span: 6 }"
            :wrapper-col="{ span: 12 }">
      <a-form-item label="所属试卷">
        <a-select placeholder="所属试卷"
                  v-decorator="['examPaperId',{ rules: [{ required: true, message: '请选择所属试卷' }] }]">
          <a-select-option v-for="(item, index) in examPaperList"
                           style="width: 100%"
                           :value="item.id"
                           :key="index">
            {{ item.name }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="试题标识"
                   v-show="isTitle">
        <a-radio-group v-decorator="['titleFlag',{ initialValue: '1',rules: [{ required: true, message: '请选择试卷题目类型!' }]}]">
          <a-radio value="1"> 题干 </a-radio>
          <a-radio value="0"> 选项 </a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="题目类型"
                   v-show="isTitle">
        <Selector v-decorator="['type',{ rules: [{ required: true, message: '请选择试卷题目类型!' }]}]"
                  placeholder="试卷题目类型"
                  :allowClear="true"
                  :size="'default'"
                  :optionValue="typeDict.optionValue"
                  :url="typeDict.url"
                  :param="typeDict.param"
                  :method="typeDict.method"
                  :optionKey="typeDict.optionKey" />
      </a-form-item>
      <a-form-item label="所属试题"
                   v-show="false">
        <a-input placeholder="所属试题"
                 v-decorator="['parentId']" />
      </a-form-item>
      <a-form-item label="所属试题"
                   v-show="!isTitle">
        <a-input placeholder="所属试题"
                 v-decorator="['questionTitle']" />
      </a-form-item>
      <a-form-item label="标题/选项内容">
        <a-input v-decorator="['title',{ rules: [{ required: true, message: '请输入试卷标题/选项内容!' }]}]"
                 placeholder="该试题的标题或选项内容" />
      </a-form-item>
      <a-form-item label="正确标识项"
                   v-show="isTitle">
        <a-input v-decorator="['correctFlag']"
                 placeholder="该试题的正确标识项" />
      </a-form-item>
      <a-form-item label="分值"
                   v-show="isTitle">
        <a-input-number placeholder="试题分值"
                        v-decorator="['point']" />
      </a-form-item>

      <a-form-item label="排序号">
        <a-input-number placeholder="排序号"
                        v-decorator="['orderNo']" />
      </a-form-item>
      <a-form-item label="解析"
                   v-show="isTitle">
        <a-input type="textarea"
                 placeholder="该试题的解析，正确答案说明"
                 allow-clear
                 :maxLength="200"
                 v-decorator="['resolution']" />
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
import { questionSaveOrUpdate } from '@/api/question'
import { getExamPaperSelectList } from '@/api/exampaper'
import { Selector } from 'zenith-vue-components'

export default {
  data () {
    return {
      form: this.$form.createForm(this),
      examPaperList: [],
      question: { titleFlag: '1' },
      isTitle: true,
      typeDict: {
        mode: 'default',
        url: 'system/SysDict/queryList',
        param: { code: 'QuestionType' },
        optionValue: 'dictKey',
        optionKey: 'dictValue',
        method: 'post'
      },
    }
  },
  components: { Selector },
  created () {

  },
  mounted () {
    if (this.$route.query.parentId) {
      this.isTitle = false
      this.form.setFieldsValue({ titleFlag: '0', type: this.$route.query.type, examPaperId: this.$route.query.examPaperId, questionTitle: this.$route.query.questionTitle, parentId: this.$route.query.parentId })
    }
    console.log(this.form.getFieldValue('parentId'))
    this.getExamPaperSelectList()
  },
  methods: {
    getExamPaperSelectList () {
      getExamPaperSelectList().then(response => {
        this.examPaperList = response
      })
    },
    handleSave () {
      this.form.validateFieldsAndScroll((err, values) => {
        if (err) {
          return
        }
        questionSaveOrUpdate(values).then((response) => {
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
