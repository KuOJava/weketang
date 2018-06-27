// pages/createclass/createclass.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classname:"",
    classnum:"",
    name:"",
    pass:""
  },
  inputclassname:function(e){
    this.setData({
      classname:e.detail.value
    });
  }
  ,
  inputclassnum:function(e){
    this.setData({
      classnum:e.detail.value
    });
  },
  //创建课堂，传递课堂名称和代码给服务器
  querentijiao:function(e){
    var classname=this.data.classname;
    var classnum=this.data.classnum;
    var  name = this.data.name;
    var pass = this.data.pass;
    wx.request({
      url: 'http://123.207.252.223/app/chuangjianketang.php?ketang_name='+classname+'&ketang_daima='+classnum+'&yonghu_name='+name+'&yonghu_password='+pass,
      success:function(res){
        console.log(res);
        wx.showToast({
          title: res.data,
          icon: '',
          image: '',
          duration: 2000,
          mask: true,
          success: function(res) {},
          fail: function(res) {},
          complete: function(res) {},
        });
      }
    })
    wx.request({
      url: 'http://123.207.252.223/app/xuanzheketang.php?ketang_name=' + classname + '&ketang_daima=' + classnum + '&teacher=' + name + '&name=' + name,
      success:function(res){
        console.log(res.data);
      }
    })
  }
  ,
  onLoad: function (options) {
    this.setData({
      'name' : options.name,
      'pass' : options.pass
    })
  }
})