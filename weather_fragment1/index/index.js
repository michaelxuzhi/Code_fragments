const app = getApp()

Page({
  data: {
    update: '',
    basic: {},
    today: {},
    tomorrow: {},
    afterTomor: {},
    todyIcon: '../images/weather/999.png',
    tomorrowIcon: '../images/weather/999.png',
    afterTomorIcon: '../images/weather/999.png',
    h_latitude: "",
    h_longitude: "",

    sunRise_time: "",
    sunSet_time: "",
    comf: "",
    flu: "",
    drsg: "",
    air: "",
    sport: ""
  },
  onLoad: function (e) {
    // this.getLocation();
    // this.setData({
    //   h_latitude :e.latitude,
    //   h_longitude :e.longitude
    // })
    this.getWeatherInfo(e.latitude, e.longitude);
  },

  // getLocation() {
  //   var that = this;
  //   wx.getLocation({
  //     type: 'wsg84',
  //     success: function (res) {
  //       const latitude = res.latitude
  //       const longitude = res.longitude
  //       that.getWeatherInfo(latitude, longitude);
  //       console.log(latitude, longitude);
  //     }
  //   })
  // },

  //事件处理函数
  // bindViewTap: function () {
  //   wx.navigateTo({
  //     url: '../logs/logs'
  //   })
  // },
  getWeatherInfo: function (latitude, longitude) {
    var _this = this;
    var key = 'xxxxxx';//你自己的key
    //需要在微信公众号的设置-开发设置中配置服务器域名
    var url = 'https://free-api.heweather.com/s6/weather/?key=' + key + '&location=' + longitude + ',' + latitude;
    wx.request({
      url: url,
      data: {},
      method: 'GET',
      success: function (res) {
        var daily_forecast_today = res.data.HeWeather6[0].daily_forecast[0];//今天预报
        var daily_forecast_tomorrow = res.data.HeWeather6[0].daily_forecast[1];//明天天预报
        var daily_forecast_afterTomor = res.data.HeWeather6[0].daily_forecast[2];//后天预报
        var basic = res.data.HeWeather6[0].basic;
        var update = res.data.HeWeather6[0].update.loc;//更新时间

        _this.setData({
          update: update,
          basic: basic,
          today: daily_forecast_today,
          tomorrow: daily_forecast_tomorrow,
          afterTomor: daily_forecast_afterTomor,
          todyIcon: '../images/weather/' + daily_forecast_today.cond_code_d + '.png', //在和风天气中下载天气的icon图标，根据cond_code_d显示相应的图标
          tomorrowIcon: '../images/weather/' + daily_forecast_tomorrow.cond_code_d + '.png',
          afterTomorIcon: '../images/weather/' + daily_forecast_afterTomor.cond_code_d + '.png',

          sunRise_time: res.data.HeWeather6[0].daily_forecast[0].sr,
          sunSet_time: res.data.HeWeather6[0].daily_forecast[0].ss,
          comf: res.data.HeWeather6[0].lifestyle[0].brf + "," + res.data.HeWeather6[0].lifestyle[0].txt,
          flu: res.data.HeWeather6[0].lifestyle[2].brf + "," + res.data.HeWeather6[0].lifestyle[2].txt,
          drsg: res.data.HeWeather6[0].lifestyle[1].brf + "," + res.data.HeWeather6[0].lifestyle[1].txt,
          air: res.data.HeWeather6[0].lifestyle[7].brf + "," + res.data.HeWeather6[0].lifestyle[7].txt,
          sport: res.data.HeWeather6[0].lifestyle[3].brf + "," + res.data.HeWeather6[0].lifestyle[3].txt


        });
        console.log(res)
      }
    })
  },



  //获取地理位置
  location: function (e) {
    var that = this;
    console.log(e.currentTarget.id);
    console.log(e);


    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userLocation']) {
          wx.authorize({
            scope: 'scope.userLocation',
            success() {
              wx.showToast({ //这里提示失败原因
                title: '授权成功！',
                duration: 1500
              })
            },
            fail() {
              that.showSettingToast('需要授权位置信息');
            }
          })
        }
      }
    })

    wx.getLocation({
      success: function (res) {
        that.getWeatherInfo(res.latitude, res.longitude);
      },
    })
  },

  // 打开权限设置页提示框
  showSettingToast: function (e) {
    wx.showModal({
      title: '提示！',
      confirmText: '去设置',
      showCancel: false,
      content: e,
      success: function (res) {
        if (res.confirm) {
          wx.openSetting({
            success(res) {
              console.setData(res.authSetting)
            }
          })
        }
      }
    })
  },


  //这是底部popup
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },

  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  true: function () {
    this.setData({
      modalName: null
    })
  },

})