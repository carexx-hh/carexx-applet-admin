var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    
  },

  formSubmit:function(e){
    var that=this;
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
    wx.getUserInfo({
      lang: "zh_CN",
      success: res => {
        var region = res.userInfo.province + '/' + res.userInfo.city
        that.setData({
          userInfo:res.userInfo
        })
        wx.setStorageSync('userInfo', that.data.userInfo)
        //  登录
        wx.login({
          success: res => {
            // 发送 res.code 到后台换取 openId, sessionKey, unionId
            if (res.code) {
              wx.request({
                url: app.globalData.baseUrl + '/auth/nursing_supervisor_login',
                method: 'POST',
                data: {
                  code: res.code,
                  nickname: that.data.userInfo.nickName,
                  avatar: that.data.userInfo.avatarUrl,
                  sex: that.data.userInfo.gender,
                  region: region,
                  acctNo: e.detail.value.input_name,
                  loginPass: e.detail.value.input_password,
                }, 
                header: {
                  'content-type': 'application/x-www-form-urlencoded',
                },
                success: function (res){
                  console.log(res)
                  console.log('token=' + res.data.data.token)
                  console.log('openId=' + res.data.data.openId)
                  wx.setStorageSync('token', res.data.data.token)
                  wx.setStorageSync('openId', res.data.data.openId)
                  wx.setStorageSync('instId', res.data.data.instId)
                  wx.setStorageSync('userId', res.data.data.userId)
                  wx.switchTab({
                    url: '../index/index',
                  })
                },
              })
            } else {
              console.log('获取用户登录态失败！' + res.errMsg)
            }
          }
        })
        if (that.userInfoReadyCallback){
          that.userInfoReadyCallback(res)
        }
      }
    })
  },
  onLoad: function (options) {
    
  },

  
  onReady: function () {
    
  },

  
  onShow: function () {
    
  },

  
  onHide: function () {
    
  },

  
  onUnload: function () {
    
  },

  
  onPullDownRefresh: function () {
    
  },

  onReachBottom: function () {
    
  },

 
  onShareAppMessage: function () {
    
  }
})