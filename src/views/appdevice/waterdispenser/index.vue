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
      <el-table-column label="设备名" min-width="80px">
        <template slot-scope="scope">
          <span class="link-type">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
          <el-table-column label="是否在线" min-width="60px" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.isOnline | statusFilter">
            <span class="link-type" v-if="scope.row.isOnline===0">否</span> 
            <span class="link-type" v-if="scope.row.isOnline===1">是</span>
            </el-tag>
        </template>
        </el-table-column>
         <el-table-column label="通信协议" min-width="80px" align="center">
        <template slot-scope="scope">
          <span class="link-type">{{ scope.row.socketType }}</span>
        </template>
        </el-table-column>
      <el-table-column label="时区" min-width="110px">
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
      <el-table-column label="紫外工作时间区间" max-width="50px">
        <template slot-scope="scope">
          <span class="link-type" v-if="scope.row.uvStartAndEnd === null">0,1439</span>
          <span class="link-type" v-if="scope.row.uvStartAndEnd != null">{{ scope.row.uvStartAndEnd }}</span>
        </template>
      </el-table-column>
      <el-table-column label="注册服务器" width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.domain }}</span>
        </template>
      </el-table-column>
       <el-table-column label="固件版本" min-width="50px">
        <template slot-scope="scope">
          <span class="link-type" >{{ scope.row.softver }}</span>
        </template>
      </el-table-column>  
     
        <el-table-column label="是否启用定时工作" min-width="50px">
        <template slot-scope="scope">
            <el-tag :type="scope.row.isEnabledTiming | statusFilter">
            <span class="link-type" v-if="scope.row.isEnabledTiming===0">否</span>
            <span class="link-type" v-if="scope.row.isEnabledTiming===null">否</span> 
            <span class="link-type" v-if="scope.row.isEnabledTiming===1">是</span>
            </el-tag>
        </template>
      </el-table-column>  

     <el-table-column label="定时工作区间" min-width="70px">
        <template slot-scope="scope">
          <span class="link-type" v-if="scope.row.timingStartAndEnd===null">0,1439</span> 
          <span class="link-type" >{{ scope.row.timingStartAndEnd }}</span>
        </template>
      </el-table-column>   

      <el-table-column label="操作"  align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button content="Top center"  type="primary" size="mini" v-if="scope.row.isOnline===0" disabled @click="getDeviceInfo(scope.row)">查看详细内容</el-button>
          <el-button type="primary" size="mini" v-if="scope.row.isOnline===1" @click="getDeviceInfo(scope.row)">查看详细内容</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination v-show="total>0" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" :total="total" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>

    <el-dialog title="饮水机详细信息" :visible.sync="dialogFormVisible" >

        <el-form ref="dataForm"  :rules="rules" :model="temp" label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
         
          <el-form-item label="SN">
          <span class="link-type">{{ temp.deviceSN }}</span>
          </el-form-item>
          <el-form-item label="设备所处时区">
          <span class="link-type">{{ temp.timeZone }}</span>
          </el-form-item>
           <el-form-item label="是否开启">
              <span class="link-type"  v-if="deviceItmes.switch===0">否</span>
          <span class="link-type" v-if="deviceItmes.switch===1">是</span>
          </el-form-item>
           <el-form-item label="换水时间">
          <span class="link-type">{{ deviceItmes.watertime  | moment('timezone', temp.timeZone, 'LLLL') }}</span>
          </el-form-item>
           <el-form-item label="指示灯开关">
           <span class="link-type" v-if="deviceItmes.led===0">关</span>
          <span class="link-type" v-if="deviceItmes.led!=0">开</span>
          </el-form-item>
           <el-form-item label="马达清洗时间">
          <span class="link-type">{{ deviceItmes.motortime  | moment('timezone', temp.timeZone, 'LLLL') }}</span>
          </el-form-item>
           <el-form-item label="滤芯清洗时间">
          <span class="link-type">{{ deviceItmes.filtertime  | moment('timezone', temp.timeZone, 'LLLL') }}</span>
          </el-form-item>
           <el-form-item label="TDS">
          <span class="link-type">{{ deviceItmes.tds }}</span>
          </el-form-item>
          <el-form-item label="水量">
          <span class="link-type">{{ deviceItmes.level }}</span>
          </el-form-item>
 
        </el-form>


        

           
        
      <div slot="footer" class="dialog-footer">
       
      </div>
    </el-dialog>


  </div>
</template>

<script>
import { fetchList , fetchPwwDetail } from '@/api/appDevice'
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

 

export default {
  name: 'AppUserTable',
  directives: {
    waves
  },
  filters: {
    statusFilter(status) {

      const statusMap = {
        1: 'success',
        draft: 'info',
        0: 'danger',
        null: 'danger'
      }
      return statusMap[status]
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type]
    },
    timeFilter(){

    }
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      deviceItmes: {},
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
        switch: null,
        watertime: null,
        led: null,
        motortime: null,
        filtertime: null,
        tds: null,
        level: null
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
      this.temp = Object.assign({}, row) // copy obj
      console.log(JSON.stringify(row))
      fetchPwwDetail(row).then(response => {
      this.deviceItmes = response.data
      })
      
      this.dialogFormVisible = true
      
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
