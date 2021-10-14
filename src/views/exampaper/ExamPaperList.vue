<template>
  <page-card title="试卷列表">
    <div class="table-page-search-wrapper">
      <a-row type="flex"
             style="margin-bottom:20px"
             justify="end">
        <a-col v-if="hasPermission('add')"
               flex="1">
          <a-button type="primary"
                    icon="plus"
                    @click="handleSave()">
            新增
          </a-button>
        </a-col>

        <template>
          <a-col>
            <a-input-search v-model="queryParam.name"
                            placeholder="试卷名称"
                            allow-clear
                            @search="search" />
          </a-col>
        </template>
      </a-row>
    </div>
    <a-table :columns="columns"
             :rowKey="(record, index) => index"
             :data-source="data"
             @change="handleTableChange"
             :pagination="pagination">
      <span slot="operation"
            slot-scope="text, record">

        <Zoptionitem :optiondata="optiondata"
                     :record="record">
        </Zoptionitem>
      </span>
      <!-- <span slot="action"
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
      </span> -->
    </a-table>
  </page-card>
</template>
<script>
import { examPaperList, examPaperDel } from '@/api/exampaper'
import { PAGINATION, TABLE_STATUS_CELL } from '@zt/zongheng-pro/framework/constants'
import Zoptionitem from '@zt/zongheng-pro/framework/components/z-column/Zoptionitem'

export default {
  components: { Zoptionitem },
  data () {
    return {
      data: [],
      pagination: PAGINATION,
      statusCell: TABLE_STATUS_CELL,
      queryParam: {},
      optiondata: [
        // 常规写法
        {
          type: 'text',// 按钮类型，点击后无弹框或confirm提示
          fn: this.handleEdit,// 按钮方法
          title: '修改',// 按钮名称
        },
      ],
      columns: [
        {
          title: '试卷名称',
          dataIndex: 'name'
        }
        // ,
        // {
        //   title: '类型',
        //   dataIndex: 'type'
        // }
        // ,
        // {
        //   title: '学科',
        //   dataIndex: 'subject'
        // }
        // ,
        // {
        //   title: '年级',
        //   dataIndex: 'grade'
        // }
        ,
        {
          title: '考试时长(分)',
          dataIndex: 'duration'
        }
        ,
        {
          title: '备注',
          dataIndex: 'remark'
        },
        {
          title: '操作',
          scopedSlots: { customRender: 'operation' }
        }
      ]
    }
  },
  created () {
    // if (this.hasPermissions('edit', 'delete')) {
    //   this.columns.push({
    //     title: '操作',
    //     width: 130,
    //     align: 'center',
    //     scopedSlots: { customRender: 'action' }
    //   })
    // }
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
      examPaperList({ ...this.queryParam }).then((response) => {
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
    handleEdit (record) {
      this.$router.push({
        path: 'edit',
        query: {
          id: record.id
        }
      })
    },
    handleDelete (id) {
      const data = []
      data.push(id)
      examPaperDel(data).then(() => {
        this.message.success('删除成功')
        this.load()
      })
    }
  }
}
</script>