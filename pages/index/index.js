//index.js
//获取应用实例
var app = getApp(),
  deviceInfo = app.globalData.deviceInfo;
Page({
  data: {
    longitude: "",
    latitude: "",
    controls: [{
      id: 1,
      iconPath: '/resources/pin.png',
      position: {
        left: deviceInfo.windowWidth / 2 - 13,
        top: (deviceInfo.windowHeight - 42) / 2 - 30,
        width: 26,
        height: 30
      }
    }, {
      id: 2,
      iconPath: '/resources/center.png',
      position: {
        left: 20,
        top: deviceInfo.windowHeight - 90,
        width: 30,
        height: 30
      },
      clickable: true
    }],
    markers: [],

  },
  staticData: {
    markersInfo: []
  },
  onReady: function () {
    this.mapCtx = wx.createMapContext('map')
  },
  onShow: function () {
    wx.getLocation({
      type: 'gcj02',
      success: this.getLocationSucc.bind(this)
    });
    wx.request({
      url: 'https://nuanwan.wekeji.cn/student/index.php/trade/get_list',
      header: { 'content-type': 'application/json' },
      data: {},
      method: "GET",
      success: this.handleGetDataSucc.bind(this)
    })
  },
  handleGetDataSucc: function (res) {
    //console.log(res)
    this.staticData.markersInfo = res.data.data;
    var markers = res.data.data,
      results = [];
    for (var i = 0; i < markers.length; i++) {
      var item = markers[i];
      results.push({
        iconPath: "/resources/" + item.type + ".png",
        id: i,
        latitude: item.latitude,
        longitude: item.longitude,
        width: 30,
        height: 30
      })
    };
    this.setData({
      markers: results
    })
  },
  getLocationSucc: function (res) {
    this.setData({
      latitude: res.latitude,
      longitude: res.longitude
    })
  },
  onShareAppMessage: function () {
    return {
      title: "诚信交易",
      path: "pages/index/index"
    }
  },
  controltap: function (e) {
    var id = e.controlId;
    if (id = 2) {
      this.mapCtx.moveToLocation();
    }
  },
  markertap: function (e) {
    var id = e.markerId,
      infoId = this.staticData.markersInfo[id].id;
    wx.navigateTo({
      url: '../../pages/detail/detail?id=' + infoId
    });

  }
})