// pages/xuanzehuopingjia/xuanzehuopingjia.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: "",
    pass: "",
    ketang_name: ""
    ,
    ketang_daima: "",
    teacher: ""
    ,
    zhishidian: "",
    zhangjie: "",
    pingjiaxianshi: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      'name': options.name,
      'pass': options.pass,
      'ketang_name': options.ketang_name,
      'ketang_daima': options.ketang_daima,
      'teacher': options.teacher
    });
  },
  inputzhangjie: function (e) {
    this.setData({
      zhangjie: e.detail.value
    })
  },
  inputzhishidian: function (e) {
    this.setData({
      zhishidian: e.detail.value
    })
  },
  //添加知识点页面
  //根据输入的章节和知识点，给课堂添加相应的知识点
  addzhishidian: function (e) {
    var name = this.data.name;
    var pwd = this.data.pass;
    var ketangname = this.data.ketang_name;
    var jsondata = "[" + "{" + "\"zj\":\"" + this.data.zhangjie + "\"" + "," + "\"zs\":\"" + this.data.zhishidian + "\"" + "}" + "]";
    console.log(jsondata);
    if (this.data.zhangjie == "" || this.data.zhishidian == "") {
      wx.showModal({
        title: '错误操作',
        content: '章节或知识点不能为空',
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
      wx.showModal({
        title: '操作提醒',
        content: '你确认添加该知识点吗？',
        showCancel: true,
        cancelText: '取消',
        cancelColor: '#000000',
        confirmText: '确认',
        confirmColor: '#000000',
        success: function (res) {
          if (res.confirm) {
            wx.request({
              //确认提交之后，将添加的知识点制成相应格式的json数据传递给服务器，然后服务器对其进行处理。
              url: 'http://123.207.252.223/app/addzhishidian.php?name=' + name + '&pwd=' + pwd + '&ketangname=' + ketangname + '&jsondata=' + jsondata,
              success: function (res) {
                wx.showToast({
                  title: res.data,
                  icon: '',
                  image: '',
                  duration: 2000,
                  mask: true,
                  success: function (res) { },
                  fail: function (res) { },
                  complete: function (res) { },
                })
              }
            })
          }
        },
        fail: function (res) { },
        complete: function (res) { },
      })

    }

  },
  //查看课堂评价,将会获取服务器中的所有数据，并将获得的数据计算得到平均值显示在页面上。
  chakanpingjia: function (e) {
    var ketangname = this.data.ketang_name;
    var that = this;
    wx.request({
      url: 'http://123.207.252.223/app/chakanpingjia.php?ketangname=' + ketangname,
      success: function (res) {
        // that.setData({
        //   'pingjiaxianshi':res.data
        // })
        console.log(res.data);
        if (res.data.length==0) {
            wx.showModal({
              title: '提示',
              content: '还没有人对该课程进行评价哦',
              showCancel: true,
              cancelText: '取消',
              cancelColor: '#000000',
              confirmText: '确定',
              confirmColor: '#000000',
              success: function(res) {},
              fail: function(res) {},
              complete: function(res) {},
            })
        } else {
          for (var i = 0; i < res.data.length; i++) {
            console.log(res.data[i])
            var num = 0.0;
            for (var j = 0; j < res.data[i].data.length; j++) {
              num += parseFloat(res.data[i].data[j]);
            }
            console.log(num);
            var len = res.data[i].data.length;
            var baifenbi = (num / len).toFixed(2);
            var item = 'pingjiaxianshi[' + i + ']';
            that.setData({
              [item]: {
                zhangjie: res.data[i].zhangjie,
                'baifenbi': baifenbi
              }
            });
          }
        }
      }
    })
  }
})