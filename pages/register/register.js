// pages/register/register.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    email: "",
    pass: "",
    confirm: "",
    sex: '男',
    shenfen: '学生'
  },

  inputemail: function (e) {
    this.setData({
      'email': e.detail.value
    });
  },
  inputpass: function (e) {
    this.setData({
      'pass': e.detail.value
    });
  },
  inputconfirm: function (e) {
    this.setData({
      'confirm': e.detail.value
    });
  },
  changesex: function (e) {
    this.setData({
      'sex': e.detail.value
    })
  },
  changeshenfen: function (e) {
    this.setData({
      'shenfen': e.detail.value
    })
  }
  ,
  tijiao: function (e) {
    var name = this.data.email;
    var pwd = this.data.pass;
    var confirm = this.data.confirm;
    var sex = this.data.sex;
    var shenfen = this.data.shenfen;
    if (name == null || name == "" || pwd == null || pwd == "" || confirm == null || confirm == "") {
      wx.showModal({
        title: '错误',
        content: '输入的内容不能为空',
        showCancel: true,
        cancelText: '取消',
        cancelColor: '#000000',
        confirmText: '确认',
        confirmColor: '#000000',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    } else {
      if (pwd == confirm) {
        wx.request({
          url: 'http://123.207.252.223/app/register.php?name=' + name + '&pwd=' + pwd + '&sex=' + sex + '&shenfen='+shenfen,
          success: function (res) {
          wx.showModal({
            title: '提示',
            content: res.data,
            showCancel: true,
            cancelText: '取消',
            cancelColor: '#000000',
            confirmText: '确认',
            confirmColor: '#000000',
            success: function(res) {},
            fail: function(res) {},
            complete: function(res) {},
          })
          }
        })
      } else {
        wx.showModal({
          title: '错误',
          content: '两次输入的密码不一致',
          showCancel: true,
          cancelText: '取消',
          cancelColor: '#000000',
          confirmText: '确认',
          confirmColor: '#000000',
          success: function (res) { },
          fail: function (res) { },
          complete: function (res) { },
        })
      }
    }

  }
})