import request from '@/utils/request'

export function getUserTotal() {
  return request({
    url: '/admin/userTotal',
    method: 'get'
  })
}

export function getOnlineDeviceTotal() {
  return request({
    url: '/admin/getOnlineDeviceTotal',
    method: 'get'
  })
}
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
      lineChartData.gridTitle = '近半年每月设备注册数'
      resp = await request({
        url: '/admin/getDeviceTotalByMonth',
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
  console.log('await ----' + JSON.stringify(resp))
  for (var item of resp.data.bymonth) {
    lineChartData.monthsData.push(item.months)
    lineChartData.countData.push(item.count)
  }
  console.log('await ----' + JSON.stringify(lineChartData))
  return lineChartData
}

