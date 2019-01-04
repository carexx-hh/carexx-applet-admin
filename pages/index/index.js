// pages/order/order.js
const util = require('../../utils/util.js')
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    switchtab: [
    {
    name: '未派单',
    },
    {
    name: '已派单',
    }
    ],
    current:0,
    coupons:[],
    windowHeight:'',
    height:'',


  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if (wx.getStorageSync('token')!=''){
      that.setData({
        token: wx.getStorageSync('token'),
        instId: wx.getStorageSync('instId'),
        userId: wx.getStorageSync('userId')
      });
    }else{
      wx.redirectTo({
        url: '../login/login',
      })
    }
    
  },
  switchNav: function (e){
    var that = this;
    var index = e.target.dataset.index;
    that.setData({
        current: index
    },function(){
      if(that.data.current==0){
        wx.request({
          url: app.globalData.baseUrl + '/customerorder/by_order_status/1/' + that.data.instId,
          method: 'get',
          header: {
            'content-Type': 'application/x-www-form-urlencoded',
            'auth-token': that.data.token
          },
          success: function (res) {
            that.setData({
              coupons: res.data.data,
            })
          }
        });
      } else if (that.data.current == 1){
        wx.request({
          url: app.globalData.baseUrl + '/customerorder/by_order_status/3/' + that.data.instId,
          method: 'get',
          header: {
            'content-Type': 'application/x-www-form-urlencoded',
            'auth-token': that.data.token
          },
          success: function (res) {
            that.setData({
              coupons: res.data.data,
            })
          }
        });
      }
    });
  },
  btntap:function(){
    wx.switchTab({
      url: '../index/index',
    })
  },
  operationClick:function(event){
    var that = this;
   
     
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
    that.setData({
      current:0
    })
      wx.request({
        url: app.globalData.baseUrl + '/customerorder/by_order_status/1/' + that.data.instId,
        method: 'get',
        header: {
          'content-Type': 'application/x-www-form-urlencoded',
          'auth-token': that.data.token
        },
        success: function (res){
          that.setData({
            coupons: res.data.data,
          })
        }
      });
  },
  clickDetails: function(e){
    var orderNo = e.currentTarget.dataset.orderno
    app.orderNo = orderNo; 
    var orderStatus = e.currentTarget.dataset.orderstatus
    app.orderStatus = orderStatus;
    wx.navigateTo({
      url: '../details/details',
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