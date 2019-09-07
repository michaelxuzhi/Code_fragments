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

## 2、视频页面的构建
**直接在页面准备时调用wx.createVideoContext({"whateverName"})**
```js
this.videoContext = wx.createVideoContext('myVideo')
``` 
**这里的myVideo是video组件的id，常用的属性如下：(最重要的当然是video的src了)**
```html
<video id="myVideo" src="{{videos_id}}" binderror="videoErrorCallback" danmu-list="{{danmuList}}" enable-danmu danmu-btn controls></video>
```
**弹幕是个列表，包含内容，字体颜色和出现时间（秒）:**
```js
danmuList:
      [{
        text: '弹幕1',
        color: '#ff0000',
        time: 1
      },
      {
        text: '看到彩蛋了吗?',
        color: '#ff00ff',
        time: 5
      },
      {
        text: '测试：这是第400秒！',
        color: '#ff00ff',
        time: 400
      }]
```
**示例中给了一个随机获取颜色的方法：**
```js
//弹幕随机获取颜色
function getRandomColor() {
  const rgb = []
  for (let i = 0; i < 3; ++i) {
    let color = Math.floor(Math.random() * 256).toString(16)
    color = color.length == 1 ? '0' + color : color
    rgb.push(color)
  }
  return '#' + rgb.join('')
};
```
**播放、暂停等动作的方法官方已经给出了示例。没什么好说的。**
