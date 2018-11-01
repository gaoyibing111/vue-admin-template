import request from '@/utils/request'

export function getDashBoardTotal() {
  return request({
    url: '/admin/dashboard/count',
    method: 'get'
  })
}

// export function getOnlineDeviceTotal() {
//   return request({
//     baseURL: 'http://localhost:8088',
//     url: '/admin/getOnlineDeviceTotal',
//     method: 'get'
//   })
// }

// 最近半年每月的用户注册数
export async function getDashBoardPanel(type) {
  console.log('type ----' + type)
  const lineChartData = {
    monthsData: [],
    countData: [],
    gridTitle: ''
  }
  var resp

  switch (type) {
    case 'getUserTotalByMonth':
      lineChartData.gridTitle = '近半年每月用户注册数'
      resp = await request({
        url: '/admin/getUserTotalByMonth',
        method: 'get'
      })
      break
    case 'getDeviceTotalByMonth':
      lineChartData.gridTitle = '近半年每月设备注册数' //将所有服务器设备进行合计
      resp = await request({
        url: '/admin/getDeviceTotalByMonth',
        method: 'get'
      })
      break
    case 'getFeedbackTotalByMonth':
      lineChartData.gridTitle = '近半年每月意见反馈数' //将所有服务器设备进行合计
      resp = await request({
        url: '/admin/getFeedbackTotalByMonth',
        method: 'get'
      })
      break
    case 'getFirmwareTotalByMonth':
      lineChartData.gridTitle = '近半年每月固件发布数' //将所有服务器设备进行合计
      resp = await request({
        url: '/admin/getFirmwareTotalByMonth',
        method: 'get'
      })
      break
    default:
      lineChartData.gridTitle = '近半年每月用户注册数'
      resp = await request({
        url: '/admin/getUserTotalByMonth',
        method: 'get'
      })
  }
  // console.log('await ----' + JSON.stringify(resp))
  for (var item of resp.data.bymonth) {
    lineChartData.monthsData.push(item.months)
    lineChartData.countData.push(item.count)
  }
  // console.log('await ----' + JSON.stringify(lineChartData))
  return lineChartData
}

