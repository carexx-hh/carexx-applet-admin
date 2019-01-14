// pages/Order details/Order details.js
var app =getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    project:'',
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
    var orderStatus = app.orderStatus;
    that.setData({
      orderNo: orderNo,
      orderStatus: orderStatus
    },function(){
      wx.request({
        url: app.globalData.baseUrl + '/customerorder/detail/' + that.data.orderNo,
        method: 'get',
        header: {
          'content-Type': 'application/x-www-form-urlencoded',
          'auth-token': that.data.token
        },
        success: function (res) {
          console.log(res)
          var newdata = new Date();
          var newdddatas = ((newdata - res.data.data[0].serviceStartTime) / 86400000).toFixed(1);
          var serviceDays = ((res.data.data[0].orderServiceEndTime - res.data.data[0].serviceStartTime) / 86400000).toFixed(1);
          timestamp1=new Date(res.data.data[0].serviceStartTime);
            y = timestamp1.getFullYear(),
            m = timestamp1.getMonth() + 1,
            d = timestamp1.getDate();
          var starttime = y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d) + " " + timestamp1.toTimeString().substr(0, 8);
          timestamp2 = new Date(res.data.data[0].orderServiceEndTime);
            k = timestamp2.getFullYear(),
            f = timestamp2.getMonth() + 1,
            w = timestamp2.getDate();
          var endtime = k + "-" + (f < 10 ? "0" + f : f) + "-" + (w < 10 ? "0" + w : w) + " " + timestamp2.toTimeString().substr(0, 8);
          that.setData({
            project:res.data.data[0],
            starttime: starttime,
            endtime: endtime,
            serviceDays: serviceDays,
            newdddatas: newdddatas
          })
        }
      });
      wx.request({
        url: app.globalData.baseUrl + '/customerorderschedule/all_schedule/' + that.data.orderNo,
        method: 'get',
        header: {
          'content-Type': 'application/x-www-form-urlencoded',
          'auth-token': that.data.token
        },
        success: function (res) {
          console.log(res)
          var timestamp3 = [];
          for (var i = 0; i < res.data.data.length; i++) {
            timestamp3.push(new Date(res.data.data[i].serviceStartTime));
            var arr1 = [];
            for (var j = 0; j < timestamp3.length; j++) {
                y = timestamp3[j].getFullYear(),
                m = timestamp3[j].getMonth() + 1,
                d = timestamp3[j].getDate();
                arr1.push(y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d) + " " + timestamp3[j].toTimeString().substr(0, 8));
            }
          }
          var timestamp4 = [];
          for (var i = 0; i < res.data.data.length; i++) {
            timestamp4.push(new Date(res.data.data[i].serviceEndTime));
            var arr2 = [];
            for (var j = 0; j < timestamp4.length; j++) {
              y = timestamp4[j].getFullYear(),
                m = timestamp4[j].getMonth() + 1,
                d = timestamp4[j].getDate();
              arr2.push(y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d) + " " + timestamp4[j].toTimeString().substr(0, 8));
            }
          }
          that.setData({
            serviceinfo:res.data.data,
            arr1:arr1,
            arr2:arr2
          })
        }
      });
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