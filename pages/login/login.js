// pages/login.js
Page({
  //这个是默认的一个学生账号
  //还有一个老师账号：11@qq.com  密码： 111111
  data: {
    name: "22222@qq.com",
    password: "111111"
  },
  //跳转到注册页面
  registerclick() {
    wx.navigateTo({
      url: '../register/register',
    })
  },
  //登录的时候传递账号和密码给服务器便可
  loginbt: function (e) {
    console.log(this.data.name+this.data.password);
    var name = this.data.name;
    var pass = this.data.password;
    wx.request({
      url: 'https://eketang.club/app/login.php?name='+this.data.name+"&pwd="+this.data.password,
      header:{
        'Content-Type':'application/json'
      },
      success:function(res){
       // console.log(this.data.name+this.data.password);
        if(res.data=="失败"){
          wx.showToast({
            title: '登录失败',
            duration: 1000,
            mask: true
          })
        }else{
          console.log(res.data);
          wx.showToast({
            title: '登录成功',
            duration:1000,
            mask:true
          })
          wx.navigateTo({
            url: '../index/index?data='+JSON.stringify(res.data)+'&name='+name+'&pass='+pass,
            success: function(res) {},
            fail: function(res) {},
            complete: function(res) {}, 
          })
        }
      }
    })
  }
  ,
  inputname: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  inputpass: function (e) {
    this.setData({
      password: e.detail.value
    })
  }
})