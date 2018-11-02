<template>
  <el-row :gutter="40" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('getUserTotalByMonth')">
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon icon-class="peoples" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">用户量总数</div>
          <count-to :start-val="startUserTotal" :end-val="endUserTotal" :duration="2600" class="card-panel-num"/>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('getFeedbackTotalByMonth')">
        <div class="card-panel-icon-wrapper icon-message">
          <svg-icon icon-class="message" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">意见反馈数</div>
          <count-to :start-val="startFeedbackTotal" :end-val="endFeedbackTotal" :duration="3000" class="card-panel-num"/>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('getDeviceTotalByMonth')">
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon icon-class="device" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">在线设备数</div>
          <count-to :start-val="startDeviceTotal" :end-val="endDeviceTotal" :duration="3200" class="card-panel-num"/>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('getFirmwareTotalByMonth')">
        <div class="card-panel-icon-wrapper icon-message">
          <svg-icon icon-class="locale" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">固件版本数</div>
          <count-to :start-val="startFirmwareTotal" :end-val="endFirmwareTotal" :duration="3600" class="card-panel-num"/>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'
import { getDashBoardTotal } from '@/api/dashboard'

export default {
  components: {
    CountTo
  },
  data() {
    return {
      interval: {},
      startUserTotal: 0,
      endUserTotal: 0,
      startDeviceTotal: 0,
      endDeviceTotal: 0,
      startFeedbackTotal: 0,
      endFeedbackTotal: 0,
      startFirmwareTotal: 0,
      endFirmwareTotal: 0,
    }
  },
  computed: {
    fetchData: function() {
      getDashBoardTotal().then(response => {
        this.endUserTotal = response.data.userTotal
      })
    }
  },
  created: function() {
    getDashBoardTotal().then(response => {
      this.endUserTotal = response.data.userTotal
      this.endDeviceTotal = response.data.deviceTotal
      this.endFeedbackTotal = response.data.feedbackTotal
      this.endFirmwareTotal = response.data.firmwareTotal
    })
  },
  mounted() {
    this.interval = setInterval(() => {
      getDashBoardTotal().then(response => {
        this.startUserTotal = this.endUserTotal
        this.endUserTotal = response.data.userTotal

        this.startDeviceTotal = this.endDeviceTotal
        this.endDeviceTotal = response.data.deviceTotal

        this.startFeedbackTotal = this.endFeedbackTotal
        this.endFeedbackTotal = response.data.feedbackTotal

        this.startFirmwareTotal = this.endFirmwareTotal
        this.endFirmwareTotal = response.data.firmwareTotal
      })
    }, 5000)
  },
  beforeDestroy() {
    clearInterval(this.interval)
  },
  methods: {
    handleSetLineChartData(type) {
      this.$emit('handleSetLineChartData', type)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.panel-group {
  margin-top: 18px;
  .card-panel-col{
    margin-bottom: 32px;
  }
  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);
    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }
      .icon-people {
         background: #40c9c6;
      }
      .icon-message {
        background: #36a3f7;
      }
      .icon-money {
        background: #f4516c;
      }
      .icon-shopping {
        background: #34bfa3
      }
    }
    .icon-people {
      color: #40c9c6;
    }
    .icon-message {
      color: #36a3f7;
    }
    .icon-money {
      color: #f4516c;
    }
    .icon-shopping {
      color: #34bfa3
    }
    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }
    .card-panel-icon {
      float: left;
      font-size: 48px;
    }
    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;
      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }
      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}
</style>
