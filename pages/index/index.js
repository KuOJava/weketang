// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data:[],
    name:"",
    pass:"",
    classdata:[],
    isteacher:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var json = JSON.parse(options.data);
    this.setData({
      'data':json,
      'name':options.name,
      'pass':options.pass
    });
    var name = this.data.name;
    var pass = this.data.pass;
    var that = this;
    //向服务器请求账号的身份
    wx.request({
      url: 'https://eketang.club/app/isteacher.php?name=' + name + '&pwd=' + pass,
      success: function (res) {
        console.log(res);
        //是老师的身份则设置老师身份为真
        if (res.data == "您是老师") {
          that.setData({
           'isteacher':true
         })
         //否则设置为假
        } else if (res.data == "你是学生") {
          that.setData({
           'isteacher':false
         });
        } else {

        }
      },
      header: {
        'Content-Type': 'applicaton/json'
      },
    })
    
  },
  //进入加入课堂页面的代码
  joinclass:function(e){
    var name = this.data.name;
    var pass = this.data.pass;
    wx.navigateTo({
      url: '../joinclass/joinclass?name=' + name + '&pass=' + pass
    })
  },
  //在onShow里面访问服务器并更新'classdata'中的数据，方便在从创建课堂页面完成添加课堂之后，
  //返回本页面可以再次请求一次服务器中的数据并更新被添加后的内容。
  onShow: function () {
    var name = this.data.name;
    var pass = this.data.pass;
    var that = this;
    wx.request({
      url: 'https://eketang.club/app/xianshiketang.php?name=' + name + '&pwd=' + pass,
      success: function (res) {
        console.log(res);
        if (res.data == "你没有加入任何课堂") {

        } else {
          that.setData({
            'classdata': res.data
          });
        }
      }
    })
  },

  //创建课堂之前，先验证账号的身份，如果是老师就跳转到相应的页面，如果是学生就提示不能创建
  createclass:function(){
    var name = this.data.name;
    var pass = this.data.pass;
    wx.request({
      url: 'https://eketang.club/app/isteacher.php?name='+name+'&pwd='+pass,
      success:function(res){
        console.log(res);
        if(res.data=="您是老师"){
          wx.navigateTo({
            url: '../createclass/createclass?name='+name+'&pass='+pass,
          })
        }else if(res.data=="你是学生"){
          wx.showModal({
            title: '提示',
            content: '你是学生，不能创建课堂',
            showCancel: true,
            cancelText: '取消',
            cancelColor: '#000000',
            confirmText: '确定',
            confirmColor: '#000000',
            success: function (res) { },
            fail: function (res) { },
            complete: function (res) { },
          })
        }else{

        }
      },
      header:{
        'Content-Type':'applicaton/json'
      },
    })
  },
  //选择课堂时跳转到选择课堂的页面的，这里也顺便将页面所需要的数据传递给该页面了。
  selectclass: function (e) {
    var ketang_name = e.currentTarget.dataset.name;
    var ketang_daima = e.currentTarget.dataset.daima;
    var name = this.data.name;
    var pass = this.data.pass;
    var teacher = e.currentTarget.dataset.teacher;
    var isteacher = this.data.isteacher;
    if(isteacher){
      wx.navigateTo({
        url: '../xuanzehuopingjia/xuanzehuopingjia?ketang_name='+ketang_name+'&ketang_daima='+ketang_daima+'&name='+name+'&teacher='+teacher+'&pass='+pass,
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    }else{
        wx.navigateTo({
          url: '../xueshengpingjia/xueshengpingjia?ketang_name=' + ketang_name + '&ketang_daima=' + ketang_daima + '&name=' + name + '&teacher=' + teacher + '&pass=' + pass,
          success: function (res) { },
          fail: function (res) { },
          complete: function (res) { },
        })
    }

  },
  //下拉刷新课堂数组。
onPullDownRefresh: function(){
  var name = this.data.name;
  var pass = this.data.pass;
  var that = this;
  wx.request({
    url: 'https://eketang.club/app/xianshiketang.php?name=' + name + '&pwd=' + pass,
    success: function (res) {
      console.log(res);
      that.setData({
        classdata: res.data
      });
    }
  })
}
})