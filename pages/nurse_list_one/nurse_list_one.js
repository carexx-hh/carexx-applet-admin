var app=getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      token: wx.getStorageSync('token')
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    var orderNo = app.orderNo;
    that.setData({
      orderNo: orderNo
    })
    wx.request({
      url: app.globalData.baseUrl + '/inststaff/staff_schedule',
      method: 'post',
      data:{
        orderNo: that.data.orderNo
      },
      header: {
        'content-Type': 'application/x-www-form-urlencoded',
        'auth-token': that.data.token
      },
      success: function (res) {
        console.log(res)
        that.setData({
          project: res.data.data
        })
      }
    });
  },
  clickDetails:function(e){
    var realName = e.currentTarget.dataset.realname
    var id = e.currentTarget.dataset.id
    app.realName = realName
    app.id = id
    wx.navigateBack({
      delta: 1
    })
  },
  searchSubmitFn: function (e) {
    var that = this;
    var inputVal = e.detail.value;
    wx.request({
      url: app.globalData.baseUrl + '/inststaff/staff_schedule',
      method: 'post',
      data: {
        orderNo: that.data.orderNo,
        staffName: inputVal
      },
      header: {
        'content-Type': 'application/x-www-form-urlencoded',
        'auth-token': that.data.token
      },
      success: function (res) {
        console.log(res)
        that.setData({
          project: res.data.data
        })
      }
    });
  },  
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})