// pages/joinclass/joinclass.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:"",
    pass:"",
    text:"",
    classdata:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var getname = options.name;
    var getpass = options.pass;
    this.setData({
      'name':getname,
      'pass':getpass
    });
  },


  //选择课堂的时候，只要将相应的课堂名字和课堂代码和课堂老师传递过去就可以
  selectclass:function(e){
    var ketang_name=e.currentTarget.dataset.name;
    var ketang_daima=e.currentTarget.dataset.daima;
    var name = this.data.name;
    var teacher = e.currentTarget.dataset.teacher;
    console.log(ketang_name+ketang_daima+name+teacher);
    wx.request({
      url: 'https://eketang.club/app/xuanzheketang.php?name='+name+"&ketang_name="+ketang_name+'&ketang_daima='+ketang_daima+'&teacher='+teacher,
      success:function(res){
      wx.showModal({
        title: '提示',
        content: res.data,
      })
      }
    })
  }
  ,
  //服务器会根据text输入的内容来查询含有该内容的课堂，并传递给小程序
  findclass:function(e){
    var name = this.data.name;
    var pass = this.data.pass;
    var text = this.data.text;
    var that = this;
    wx.request({
      url: 'https://eketang.club/app/jinruketang.php?name='+name+'&pwd='+pass+'&text='+text,
      success:function(res){
        console.log(res);
        that.setData({
          classdata:res.data
        });
      }
    })
  },
  inputtext:function(e){
    this.setData({
      text:e.detail.value
    });
  }
})