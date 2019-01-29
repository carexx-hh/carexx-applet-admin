var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sex:'',
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
    var id = app.id;
    that.setData({
      id: id,
    }, function () {
      wx.request({
        url: app.globalData.baseUrl + '/inststaff/get_id/' + that.data.id,
        method: 'get',
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
    })
  },
  formSubmit: function (e) {
    var that = this;  
    var realName = e.detail.value.input_name;
    var phone = e.detail.value.input_phone;
    var idNo = e.detail.value.input_idNo;
    var address = e.detail.value.input_address;
    var instName = e.detail.value.input_instName;
    var serviceInstName = e.detail.value.input_serviceInstName;
    var sex = e.detail.value.input_sex;
    if (realName==''){
      that.setData({
        realName: that.data.coupons.realName
      })
    } else if (realName !== ''){
      that.setData({
        realName: e.detail.value.input_name
      })
    };
    // 
    if (address == '') {
      that.setData({
        address: that.data.coupons.address
      })
    } else if (address !== '') {
      that.setData({
        address: e.detail.value.input_address
      })
    };
    // 
    if (instName == '') {
      that.setData({
        instName: that.data.coupons.instName
      })
    } else if (realName !== '') {
      that.setData({
        instName: e.detail.value.input_instName
      })
    };
    // 
    if (serviceInstName == '') {
      that.setData({
        serviceInstName: that.data.coupons.serviceInstName
      })
    } else if (realName !== '') {
      that.setData({
        serviceInstName: e.detail.value.input_serviceInstName
      })
    };
    // 
    if (phone == '') {
      that.setData({
        phone: that.data.coupons.phone
      })
    } else if (phone !== '') {
      that.setData({
        phone: e.detail.value.input_phone
      })
    };
    // 
    if (idNo == '') {
      that.setData({
        idNo: that.data.coupons.idNo	
      })
    } else if (idNo !== ''){
      that.setData({
        idNo: e.detail.value.input_idNo	
      })
    };
    // 
    if (that.data.coupons.entryDate == '' || that.data.coupons.entryDate == null) {
      that.setData({
        entryDate:''
      })
    } else {
      that.setData({
        entryDate: that.data.coupons.entryDate
      })
    };
    if (that.data.coupons.leaveDate == '' || that.data.coupons.leaveDate == null) {
      that.setData({
        leaveDate:''
      })
    } else {
      that.setData({
        leaveDate: that.data.coupons.leaveDate
      })
    };
    // 
    if(sex==''){
      that.setData({
        sex: that.data.coupons.sex	
      })
    }else if(sex=='男'){
      that.setData({
        sex:1
      })
    }else if(sex=='女'){
      that.setData({
        sex: 2
      })
    }
    wx.request({
        url: app.globalData.baseUrl + '/inststaff/modify',
        method: 'POST',
        header: {
          'content-Type': 'application/x-www-form-urlencoded',
          'auth-token': that.data.token
        },
        data: {
          id:that.data.id,
          realName:that.data.realName,
          idNo: that.data.idNo,
          address: that.data.address,
          phone: that.data.phone,
          instName: that.data.instName,
          serviceInstId: that.data.coupons.serviceInstId,
          sex:that.data.sex,
          photo:'',
          personType: that.data.coupons.personType,
          jobStatus: that.data.coupons.jobStatus,
          entryDate: that.data.entryDate,
          leaveDate: that.data.leaveDate,
        },
        success: function (res) {
          console.log(res)
          if(res.data.code==200){
            that.onShow();
            wx.showToast({
              title: '已保存',
              icon:'success',
              duration:300,
              success(res){
                setTimeout(function () {
                  wx.navigateTo({
                    url: '../nurse_information/nurse_information',
                  })
                },500);
              }
            })
          }else{
            wx.showToast({
              title: '修改失败',
              icon: 'success',
              duration: 1500,
            })
          }
        }
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