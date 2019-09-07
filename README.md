# Code_fragments
# 零碎的代码片段。
## 1、天气信息的获取
**先检查是否由其他页面已传入或已授权地理位置信息（经纬度），调用wx.getSetting({})**
```js
  // 判断是否已授权或已传有地理位置信息
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
```
**对于没有授权和没有地理位置信息的用户，提示请求授权，点击跳转到小程序权限设置页面：调用wx.openSetting({})**
```js
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
```
**授权成功后，调用wx.location({})，可以获取当前用户位置信息（经纬度）**
```js
wx.getLocation({
      success: function (res) {
        that.getWeatherInfo(res.latitude, res.longitude);
      },
    })
```
**天气API：[和风天气](https://dev.heweather.com/docs/api/weather)**
```js
//获取天气
getWeatherInfo: function (latitude, longitude) {
    var _this = this;
    var key = 'xxxxxxxxxxxxxxxxxxxxxx';//你自己的key
    var url = 'https://free-api.heweather.com/s6/weather/?key=' + key + '&location=' + longitude + ',' + latitude;
    wx.request({
      url: url,
      data: {},
      method: 'GET',
      success: function (res) {
        console.log(res)
      }
    })
  },
```
**和风官网给出的返回示例：[返回的天气数据](https://dev.heweather.com/docs/api/weather#%E6%95%B0%E6%8D%AE%E8%BF%94%E5%9B%9E%E7%A4%BA%E4%BE%8B)**

**部分样式：[ColorUI](https://github.com/weilanwl/ColorUI)**
