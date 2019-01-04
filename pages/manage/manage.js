// pages/manage/manage.js
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
    var that=this;
    wx.request({
      url: app.globalData.baseUrl + '/inststaff/mapp_all',
      method: 'post',
      data: {
        instId: wx.getStorageSync('instId')
      },
      header: {
        'content-Type': 'application/x-www-form-urlencoded',
        'auth-token': that.data.token
      },
      success: function (res) {
        that.setData({
          coupons: res.data.data
        })
      }
    });
  },
  searchSubmitFn:function(e){
    var that=this;
    var inputVal = e.detail.value;
    wx.request({
      url: app.globalData.baseUrl + '/inststaff/mapp_all',
      method: 'post',
      data: {
        instId: wx.getStorageSync('instId'),
        realName: inputVal
      },
      header: {
        'content-Type': 'application/x-www-form-urlencoded',
        'auth-token': that.data.token
      },
      success: function (res) {
        that.setData({
          coupons: res.data.data
        })
      }
    });
  },
  clickDetails:function(e){
    var realName = e.currentTarget.dataset.realname
    var idNo = e.currentTarget.dataset.idno
    var phone = e.currentTarget.dataset.phone
    var address = e.currentTarget.dataset.address
    var instName = e.currentTarget.dataset.instname
    var serviceInstName = e.currentTarget.dataset.serviceinstname
    var id = e.currentTarget.dataset.id
    app.realName = realName
    app.id = id
    app.idNo = idNo
    app.phone = phone
    app.address = address
    app.instName = instName
    app.serviceInstName = serviceInstName
    // console.log(realName, idNo, phone, address, instName, serviceInstName)
    wx.navigateTo({
      url: '../nurse_information/nurse_information',
    })
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