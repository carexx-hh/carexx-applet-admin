var app=getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    show_o:false,
    show_t: true,
    show_th: false,
    show_f:true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      token: wx.getStorageSync('token'),
      userId: wx.getStorageSync('userId')
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
  onShow: function (e) {
    var that=this;
    wx.request({
      url: app.globalData.baseUrl + '/msg/all/' + that.data.userId,
      method: 'get',
      header: {
        'content-Type': 'application/x-www-form-urlencoded',
        'auth-token': that.data.token
      },
      success: function (res) {
        console.log(res)
        if(res.data.data.length==0){
          that.setData({
            border_bottom:'none'
          })
        }else{
          that.setData({
            border_bottom:'70rpx solid #FFFFFF'
          })
        }
        that.setData({
          coupons:res.data.data
        })
      }
  })
  },
  click_bj:function(){
      var that=this;
      that.setData({
        show_t:false,
        show_o:true,
        show_s: true,
        border_top_t:'none'
      })
  },
  click_qx:function(){
    var that = this;
    that.setData({
      show_th: true,
      show_s: false,
      show_f:false,
    })
  },
  click_qx_t:function(){
    var that = this;
    that.setData({
      show_th: false,
      show_s: true,
      show_f: true,
    })
  },
  click_cancel:function(){
    var that = this;
    that.setData({
      show_o: false,
      show_t: true,
      show_th: false,
      show_s: false,

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