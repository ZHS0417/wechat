// publish.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    success: false,
    address: "请选择你的当前位置"
  },
  staticData: {
    latitude: "",
    longitude: "",
    type: "",
    message: "",
    contact: ""
  },
  handleAddressTap: function () {
    wx.chooseLocation({
      success: this.handleAddressSuccess.bind(this)
    })
  },
  handleAddressSuccess: function (res) {
    this.setData({
      address: res.address
    });
    Object.assign(this.staticData, {
      latitude: res.latitude,
      longitude: res.longitude
    })
  },
  radioChange: function (e) {
    this.staticData.type = e.detail.value;
  },
  handleMessageChange: function (e) {
    this.staticData.message = e.detail.value;
  },
  handleContactChange: function (e) {
    this.staticData.contact = e.detail.value;
  },
  handlePostTap: function () {
    var errMsg = "";
    if (this.data.address == "" || this.data.address == "请选择你的当前位置") {
      errMsg = "请选择你的当前位置"
    } else if (!this.staticData.type) {
      errMsg = "请选择你的交易类型"
    } else if (!this.staticData.message) {
      errMsg = "请选择你的交易说明"
    } else if (!this.staticData.contact) {
      errMsg = "请选择你的联系方式"
    };
    if (errMsg) {
      wx.showToast({
        title: errMsg,
        icon: 'loading',
        duration: 1000
      })
    } else {
      wx.request({
        url: 'https://nuanwan.wekeji.cn/student/index.php/trade/add_item',
        method: 'POST',
        data: {
          address: this.data.address,
          latitude: this.staticData.latitude,
          longitude: this.staticData.longitude,
          message: this.staticData.message,
          contact: this.staticData.contact,
          type: this.staticData.type
        },
        
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        success: this.publishSuccess.bind(this)
      })
    }
  },

  publishSuccess: function () {
    this.setData({
      success: true
    })
  },

})