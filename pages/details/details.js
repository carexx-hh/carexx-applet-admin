// pages/Order details/Order details.js
var app =getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow:'',
    timeindex: 0,
    timearray: [],
    start_name:'请选择',
    nurse_name:'请选择'
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
  bindTimeChange: function (e) {
    var that=this;
    var nurseid = that.data.nurse_id[e.detail.value]
    console.log(e.detail.value, nurseid)
    this.setData({
      timeindex: e.detail.value,
      start_name: this.data.nurse_bl[e.detail.value],
      nurseid: nurseid
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
  onShow: function (){
    var that = this;
    var orderNo = app.orderNo;
    var orderStatus = app.orderStatus;
    that.setData({
      orderNo: orderNo,
      orderStatus: orderStatus,
    })
    wx.request({
      url: app.globalData.baseUrl + '/customerorder/detail/' + that.data.orderNo,
      method: 'get',
      header: {
        'content-Type': 'application/x-www-form-urlencoded',
        'auth-token': that.data.token
      },
      success: function (res) {
        console.log(res)
        if (res.data.data[0].staffName == null && !wx.getStorageSync('nurse_name') && !wx.getStorageSync('serviceStaffId')){
          that.setData({
            nurse_name:that.data.nurse_name,
          })
        } else if (res.data.data[0].staffName !== null && !wx.getStorageSync('nurse_name') && !wx.getStorageSync('serviceStaffId')){
          that.setData({
            nurse_name: res.data.data[0].staffName,
            serviceStaffId: res.data.data[0].serviceStaffId,
          })
        } else if (wx.getStorageSync('nurse_name') && wx.getStorageSync('serviceStaffId')){
        that.setData({
          nurse_name: wx.getStorageSync('nurse_name'),
          serviceStaffId: wx.getStorageSync('serviceStaffId'),
        })
        }
        timestamp1 = new Date(res.data.data[0].serviceStartTime);
          y = timestamp1.getFullYear(),
          m = timestamp1.getMonth() + 1,
          d = timestamp1.getDate();
        var starttime = y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d) + " " + timestamp1.toTimeString().substr(0, 8);
        that.setData({
          project: res.data.data[0],
          starttime:starttime,
          serviceStatus: res.data.data[0].serviceStatus,
          workTypeId: res.data.data[0].workTypeId
        },function(){
          wx.request({
            url: app.globalData.baseUrl + '/instworktypesettle/list_all/' + that.data.workTypeId + '/'+wx.getStorageSync('instId'),
            method: 'get',
            header: {
              'content-Type': 'application/x-www-form-urlencoded',
              'auth-token': that.data.token
            },
            success: function (res){
              console.log(res)
              var nurse_bl=[];
              var nurse_id=[];
              for (var i = 0; i <res.data.data.length;i++){
                nurse_bl.push(res.data.data[i].settleRatio)
              };
              for (var j = 0; j < res.data.data.length; j++) {
                nurse_id.push(res.data.data[j].id)
              };
              console.log(nurse_bl)
              that.setData({
                timearray: res.data.data,
                nurse_bl: nurse_bl,
                nurse_id: nurse_id,
              })
            }
          });
        })
      }
    });
  },
  choose_nurse:function(e){
    var that=this;
    var orderNo = that.data.orderNo
    app.orderNo = orderNo;
    var serviceStaffId = that.data.serviceStaffId
    app.serviceStaffId = serviceStaffId;
    if (that.data.serviceStatus==null){
      wx.navigateTo({
        url: '../nurse_list_one/nurse_list_one',
      })
    } else if (that.data.serviceStatus == 1){
      wx.navigateTo({
        url: '../nurse_list_two/nurse_list_two',
      })
    }
  },
  regist:function(){
    var that=this;
    wx.request({
      url: app.globalData.baseUrl + '/customerorderschedule/mapp_add',
      method: 'post',
      data: {
        orderNo: that.data.orderNo,
        serviceStaffId: that.data.serviceStaffId,
        workTypeSettleId: that.data.nurseid
      },
      header: {
        'content-Type': 'application/x-www-form-urlencoded',
        'auth-token': that.data.token
      },
      success: function (res) {
        console.log(res)
        if(res.data.code==200){
          wx.showToast({
            title: '派单成功',
            icon: 'success',
            duration: 2500,
            mask:true
          })
        }else{
          wx.showToast({
            title: res.data.errorMsg,
            icon: 'none',
            duration: 2500
          })
        }
      }
    });
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('index---------onHide()')
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    wx.removeStorage({
      key:'serviceStaffId'
    })
    wx.removeStorage({
      key: 'nurse_name',
    })
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