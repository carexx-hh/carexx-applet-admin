// pages/mine/mine.js
const app = getApp()
const util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    show:false,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    that.setData({
      userInfo:wx.getStorageSync('userInfo'),
      token: wx.getStorageSync('token'),
      userId: wx.getStorageSync('userId'),
      instId: wx.getStorageSync('instId')
     })
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
      url: app.globalData.baseUrl + '/acluser/get_userId/' + that.data.userId,
      method: 'get',
      header: {
        'content-Type': 'application/x-www-form-urlencoded',
        'auth-token': that.data.token
      },
      success: function (res) {
        console.log(res)
        that.setData({
          coupons: res.data.data
        })
      }
    });
    wx.request({
      url: app.globalData.baseUrl + '/inststaff/all_by_certification_status/' + that.data.instId + '/' + '1',
      method: 'get',
      header: {
        'content-Type': 'application/x-www-form-urlencoded',
        'auth-token': that.data.token
      },
      success: function (res) {
        console.log(res)
        if (res.data.data.length > 0) {
          that.setData({
            show: true,
            message_nurse: res.data.data.length
          })
        }
      }
    });
  },
  click_details:function(){
     var that=this;
     wx.navigateTo({
       url: '../personal_information/personal_information',
     })
  },
  click_nurse:function(){
    var that = this;
    wx.navigateTo({
      url: '../nurse_certification/nurse_certification',
    })  
  },
  click_message:function(){
    wx.navigateTo({
      url: '../messages/messages',
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