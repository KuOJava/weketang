// pages/xueshengpingjia/xueshengpingjia.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    zhangjie:"",
    ketang_name:"",
    ketang_daima:"",
    teacher:"",
    name:"",
    pass:"",
    zhishidian:[],
    havezhishidian:false,
    tijaopingjia:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      'ketang_name':options.ketang_name,
      'ketang_daima':options.ketang_daima,
      'teacher':options.teacher,
      'name':options.name,
      'pass':options.pass
    });
  },
  inputzhangjie:function(e){
    this.setData({
      zhangjie:e.detail.value
    });
  },
  //学生选择相应的章节进行查询，服务器返回该课程的选定的章节的所有知识点。
  //如果返回的数据为空的数组，那么就认为没有数据返回，那么就会提示用户。
  queding:function(e){
    var name = this.data.name;
    var pwd = this.data.pass;
    var ketangname = this.data.ketang_name;
    var zj = this.data.zhangjie;
    var that = this;
    wx.request({
      url: 'https://eketang.club/app/getzhishidian.php?name='+name+'&pwd='+pwd+'&ketangname='+ketangname+'&zj='+zj,
      success:function(res){
       // console.log(res.data);
        if(res.data.length==0){
          wx.showModal({
            title: '提示',
            content: '该章节没有添加知识点',
            showCancel: true,
            cancelText: '取消',
            cancelColor: '#000000',
            confirmText: '确定',
            confirmColor: '#000000',
            success: function(res) {},
            fail: function(res) {},
            complete: function(res) {},
          })
        }else{
          that.setData({
            'zhishidian': res.data,
            'havezhishidian': true
          });
        }
      }
    })
  },
  //客户每点击一个单选框，都会给要传递给服务器的数组添加一条数据。
  radioChange:function(e){
    var zsName = e.currentTarget.dataset.zsName;
    var xuanze = e.detail.value;
    var index = e.currentTarget.dataset.zsIndex;
    var item = 'tijiaopingjia['+index+']';
    this.setData({
      [item]:{
        'zhishidian':zsName,
        'xuanze':xuanze
      }
    });
  },
  //点击评价按钮就会将上面评价得到的数据传递给服务器。
  pingjiaclick:function(e){
    var name = this.data.name;
    var pwd = this.data.pass;
    var ketangname = this.data.ketang_name;
    var zj = this.data.zhangjie;
    var jsondata= this.data.tijiaopingjia;
    wx.request({
      url: 'https://eketang.club/app/pingjia.php?name='+name+'&pwd='+pwd+'&ketangname='+ketangname+'&zj='+zj+'&jsondata='+JSON.stringify(jsondata),
      success:function(res){
          wx.showModal({
            title: '提示',
            content: res.data,
            showCancel: true,
            cancelText: '取消',
            cancelColor: '#000000',
            confirmText: '确定',
            confirmColor: '#000000',
            success: function(res) {},
            fail: function(res) {},
            complete: function(res) {},
          })
      }
    })
  }
})