// detail.js
Page({
  data: {
    address: "",
    message: "",
    contact: "",
    type: "buy",
    textType: ""
  },
  onLoad: function (options) {
    var id = options.id;
    wx.request({
      url: 'https://nuanwan.wekeji.cn/student/index.php/trade/get_item',
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: { id: id },
      success: this.handleGetDataSucc.bind(this)
    })
  },
  handleGetDataSucc: function (res) {
    var _data = res.data.data;
    this.setData({
      address: _data.address,
      message: _data.message,
      contact: _data.contact,
      type: _data.type,
      textType: (_data.type == "buy") ? "求购" : "转让"
    })
  }

})