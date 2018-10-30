<template>
  <div class="app-container">
    <div class="filter-container">

      <el-select v-model="listQuery.domain" placeholder="服务器"  class="filter-item" style="width: 130px">
        <el-option v-for="item in serverListTypeOptions" :key="item.name" :label="item.name" :value="item.domain"/>
      </el-select>
     
      <el-select v-model="listQuery.deviceType" placeholder="类型"  class="filter-item" style="width: 130px">
        <el-option v-for="item in waterTypeOptions" :key="item.name" :label="item.name" :value="item.value"/>
      </el-select>

      <el-input placeholder="SN" v-model="listQuery.sn" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>

      <!--  <el-select v-model="listQuery.importance" :placeholder="$t('table.importance')" clearable style="width: 90px" class="filter-item">
        <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item"/>
      </el-select>
     <el-select v-model="listQuery.type" :placeholder="$t('table.type')" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key"/>
      </el-select>
      <el-select v-model="listQuery.sort" style="width: 140px" class="filter-item" @change="handleFilter">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key"/>
      </el-select> -->
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <!-- <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">{{ $t('table.add') }}</el-button>
      <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">{{ $t('table.export') }}</el-button>
      <el-checkbox v-model="showReviewer" class="filter-item" style="margin-left:15px;" @change="tableKey=tableKey+1">{{ $t('table.reviewer') }}</el-checkbox> -->
    </div>

    <el-table
      v-loading="listLoading"
      :key="tableKey"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;">
      <el-table-column label="SN" align="center" min-width="150px">
        <template slot-scope="scope">
          <span>{{ scope.row.deviceSN }}</span>
        </template>
      </el-table-column>
      <el-table-column label="设备名" min-width="150px">
        <template slot-scope="scope">
          <span class="link-type">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="时区" min-width="150px">
        <template slot-scope="scope">
          <span class="link-type">{{ scope.row.timeZone }}</span>
        </template>
      </el-table-column>
      <el-table-column label="注册时间" min-width="150px">
        <template slot-scope="scope">
          <span class="link-type">{{ scope.row.dateAdd }}</span>
        </template>
      </el-table-column>
      <el-table-column label="紫外杀菌" max-width="50px">
        <template slot-scope="scope">
          <span class="link-type" v-if="scope.row.isUv === null">否</span>
          <span class="link-type" v-if="scope.row.isUv != null">是</span>
        </template>
      </el-table-column>
      <el-table-column label="注册服务器" width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.domain }}</span>
        </template>
      </el-table-column>
       <el-table-column label="固件版本" min-width="150px">
        <template slot-scope="scope">
          <span class="link-type" >{{ scope.row.softver }}</span>
        </template>
      </el-table-column>  
     
      
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="getDeviceInfo(scope.row)">查看详细内容</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination v-show="total>0" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" :total="total" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>

    <el-dialog title="用户设备信息" :visible.sync="dialogFormVisible">
      <!-- <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px" style=" margin-left:50px;">
          -->
        <!-- <el-form-item label="用户名">
          <span class="link-type">{{ temp.username }}</span>
        </el-form-item> -->
         <!-- <el-form-item label="设备"> -->
        <span class="link-type">用户名: {{ temp.username }}</span>
           <el-table :data="deviceItmes"
           border
           fit      
           highlight-current-row
          style="width: 100%;">
        <el-table-column label="SN" min-width="50px" align="center">
        <template slot-scope="scope">
          <span class="link-type">{{ scope.row.sn }}</span>
        </template>
        </el-table-column>

           <el-table-column label="是否在线" min-width="50px" align="center">
        <template slot-scope="scope">
            <span class="link-type" v-if="scope.row.isOnline===0">否</span>
          <span class="link-type" v-if="scope.row.isOnline===1">是</span>
        </template>
        </el-table-column>
        
        <el-table-column label="固件版本" min-width="50px" align="center">
        <template slot-scope="scope">
          <span class="link-type">{{ scope.row.softver }}</span>
        </template>
        </el-table-column>

         <el-table-column label="通信协议" min-width="50px" align="center">
        <template slot-scope="scope">
          <span class="link-type">{{ scope.row.socketType }}</span>
        </template>
        </el-table-column>
         <el-table-column label="设备昵称" min-width="50px" align="center">
        <template slot-scope="scope">
          <span class="link-type">{{ scope.row.name }}</span>
        </template>
        </el-table-column>

         <el-table-column label="加网时间" min-width="50px" align="center">
        <template slot-scope="scope">
          <span class="link-type">{{ scope.row.dateAdd }}</span>
        </template>
        </el-table-column>
           </el-table>

           
        <!-- </el-form-item> -->
        <!-- <el-form-item :label="$t('table.status')">
          <el-select v-model="temp.status" class="filter-item" placeholder="Please select">
            <el-option v-for="item in statusOptions" :key="item" :label="item" :value="item"/>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('table.importance')">
          <el-rate v-model="temp.importance" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" :max="3" style="margin-top:8px;"/>
        </el-form-item>
        <el-form-item :label="$t('table.remark')">
          <el-input :autosize="{ minRows: 2, maxRows: 4}" v-model="temp.remark" type="textarea" placeholder="Please input"/>
        </el-form-item> -->
      <!-- </el-form> -->
      <div slot="footer" class="dialog-footer">
        
        <!-- <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">{{ $t('table.confirm') }}</el-button> -->
      </div>
    </el-dialog>
<!-- 
    <el-dialog :visible.sync="dialogPvVisible" title="Reading statistics">
      <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="key" label="Channel"/>
        <el-table-column prop="pv" label="Pv"/>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">{{ $t('table.confirm') }}</el-button>
      </span>
    </el-dialog> -->

  </div>
</template>

<script>
import { fetchList } from '@/api/appDevice'
import waves from '@/directive/waves' // 水波纹指令
import { serverList } from '@/utils/serverlist'

const calendarTypeOptions = [
  { key: 'CN', display_name: 'China' },
  { key: 'US', display_name: 'USA' },
  { key: 'JP', display_name: 'Japan' },
  { key: 'EU', display_name: 'Eurozone' }
]

// arr to obj ,such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

const waterTypeOptions = [
  {"name":"全部","value":"3"},
  {"name":"uv","value":"1"},
  {"name":"普通","value":"0"}
]

const serverListTypeOptions = serverList;

const waterTypeKeyValue = waterTypeOptions.reduce((acc, cur) => {
  acc[cur.name] = cur.value
  return acc
}, {})

// const serverListKeyValue = serverListTypeOptions.reduce((acc, cur) => {
//   acc[cur.name] = cur.domain
//   return acc
// }, {})

export default {
  name: 'AppUserTable',
  directives: {
    waves
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type]
    }
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      deviceItmes: [],
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id',
        username: undefined,
        deviceType: "全部",
        domain: "亚太机房"
      },
      serverListTypeOptions,
      waterTypeOptions,
      importanceOptions: [1,2,3],
      calendarTypeOptions,
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        type: '',
        status: 'published'
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      downloadLoading: false,
      // pageParam: {
      //   name: 'Appuser', query:{page: 1}
      // }
    }
  },
  created() {
    this.getList()
  },
  watch: {
      // 监听路由变化，随时获取新的列表信息
      '$route': 'fetchData'
    },
  methods: {
    fetchData (){
      this.loading = true
      console.log('watch querypage =' + this.$route.query.page)
      this.listQuery.page = this.$route.query.page || 1   // 这个就是当前要请求的页数
      this.getList()
    },
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total

        // Just to simulate the time of the request
        // setTimeout(() => {
          this.listLoading = false
        // }, 1.5 * 1000)
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.$route.query.page = val
      console.log(this.$route.query.page)
      // this.pageParam.query.page=val
      // console.log('route='+this.route)
      // this.$router.replace(route)
      this.listQuery.page = val
      this.getList()
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作成功',
        type: 'success'
      })
      row.status = status
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        status: 'published',
        type: ''
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          this.temp.author = 'vue-element-admin'
          createArticle(this.temp).then(() => {
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    getDeviceInfo(row) {
      //获取设备信息 , 根据用户域名到不同的服务器获取设备列表信息
      // this.temp = Object.assign({}, row) // copy obj
      // console.log(JSON.stringify(row))
      // fetchUserDevices(row).then(response => {
      // this.deviceItmes = response.data.deviceItmes
      // })
      
      // this.dialogFormVisible = true
      
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateArticle(tempData).then(() => {
            for (const v of this.list) {
              if (v.id === this.temp.id) {
                const index = this.list.indexOf(v)
                this.list.splice(index, 1, this.temp)
                break
              }
            }
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleDelete(row) {
      this.$notify({
        title: '成功',
        message: '删除成功',
        type: 'success',
        duration: 2000
      })
      const index = this.list.indexOf(row)
      this.list.splice(index, 1)
    },
    handleFetchPv(pv) {
      fetchPv(pv).then(response => {
        this.pvData = response.data.pvData
        this.dialogPvVisible = true
      })
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
        const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
        const data = this.formatJson(filterVal, this.list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    }
  }
}
</script>
