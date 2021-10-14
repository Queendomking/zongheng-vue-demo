<template>
  <page-card title="试题">
    <div class="table-page-search-wrapper">
      <a-row type="flex"
             style="margin-bottom:20px"
             justify="end">
        <a-col v-if="hasPermission('add')"
               flex="1">
          <a-button type="primary"
                    icon="plus"
                    @click="handleSave()">
            新增试题
          </a-button>
        </a-col>

        <template>
          <a-col>
            <a-input-search v-model="queryParam.title"
                            placeholder="试题标题"
                            allow-clear
                            @search="search" />
          </a-col>
        </template>
      </a-row>
    </div>
    <a-table :columns="columns"
             :rowKey="(record, index) => index"
             :data-source="data"
             :pagination="pagination">
      <span slot="action"
            slot-scope="text, record">
        <template v-if="hasPermission('edit')">
          <a @click="handleEdit(record.id)">编辑</a>
        </template>
        <template v-if="hasPermission('delete')">
          <a-divider type="vertical" />
          <a-popconfirm title="确定要删除吗？"
                        ok-text="是"
                        cancel-text="否"
                        @confirm="handleDelete(record.id)">
            <a href="javascript:;">删除</a>
          </a-popconfirm>
        </template>
        <template v-if="record.titleFlag=='1'">
          <a-divider type="vertical" />
          <a @click="addQuestionOption(record)">新增选项</a>
        </template>
      </span>
    </a-table>
  </page-card>
</template>
<script>
import { questionList, questionDel } from '@/api/question'
import { PAGINATION, TABLE_STATUS_CELL } from '@zt/zongheng-pro/framework/constants'

export default {
  data () {
    return {
      data: [],
      pagination: PAGINATION,
      statusCell: TABLE_STATUS_CELL,
      queryParam: {},
      columns: [
        {
          title: '标题/选项内容',
          dataIndex: 'title'
        }
        ,
        {
          title: '所属试卷',
          dataIndex: 'examPaperName'
        }
        ,
        {
          title: '题目类型',
          dataIndex: 'typeName'
        }
        // ,
        // {
        //   title: '试题标识',
        //   dataIndex: 'titleFlagDel'
        // }
        ,
        {
          title: '分值',
          dataIndex: 'point'
        }
        ,
        {
          title: '排序号',
          dataIndex: 'orderNo'
        }
      ]
    }
  },
  created () {
    if (this.hasPermissions('edit', 'delete')) {
      this.columns.push({
        title: '操作',
        width: 230,
        align: 'center',
        scopedSlots: { customRender: 'action' }
      })
    }
  },
  activated () {
    this.load()
  },
  methods: {
    search () {
      this.pagination.current = 1
      this.load()
    },
    load () {
      this.queryParam.currPage = this.pagination.current
      this.queryParam.pageSize = this.pagination.pageSize
      questionList({ ...this.queryParam }).then((response) => {
        this.data = response.list
        this.pagination.current = response.currPage
        this.pagination.total = response.totalCount
        this.pagination.pageSize = response.pageSize
      })
    },
    handleTableChange (pagination, filters, sorter) {
      this.pagination = pagination
      this.load()
    },
    handleSave () {
      this.$router.push({
        path: 'add'
      })
    },
    addQuestionOption (record) {
      this.$router.push({
        path: 'add', query: { parentId: record.id, type: record.type, examPaperId: record.examPaperId, questionTitle: record.title }
      })
    },
    handleEdit (id) {
      this.$router.push({
        path: 'edit',
        query: {
          id: id
        }
      })
    },
    handleDelete (id) {
      const data = []
      data.push(id)
      questionDel(data).then(() => {
        this.message.success('删除成功')
        this.load()
      })
    }
  }
}
</script>