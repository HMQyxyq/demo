const app = getApp()

Page({
  data: {
    item:0,
    tab:0,

    playlist:[{
      id:1,
      title:"LOSER",
      singer:'米津玄師',
      src:'http://music.163.com/song/media/outer/url?id=512359195.mp3',
      coverImgUrl:'../images/1.jpg'
    },{
      id:2,
      title:"打上花火",
      singer:'米津玄師',
      src:'http://music.163.com/song/media/outer/url?id=496869422.mp3',
      coverImgUrl:'../images/2.jpg'
    },
    {
      id:3,
      title:"KICK BACK",
      singer:'米津玄師',
      src:'http://music.163.com/song/media/outer/url?id=1986803568.mp3',
      coverImgUrl:'../images/3.jpg'
    },
    {
      id:4,
      title:"灰色と青",
      singer:'米津玄師',
      src:'http://music.163.com/song/media/outer/url?id=512376195.mp3',
      coverImgUrl:'../images/4.jpg'
    },
    {
      id:5,
      title:"春雷",
      singer:'米津玄師',
      src:'http://music.163.com/song/media/outer/url?id=512359198.mp3',
      coverImgUrl:'../images/5.jpg'
    },
    {
      id:6,
      title:"Flamingo",
      singer:'米津玄師',
      src:'http://music.163.com/song/media/outer/url?id=1318880077.mp3',
      coverImgUrl:'../images/6.jpg'
    },
    {
      id:7,
      title:"M八七",
      singer:'米津玄師',
      src:'http://music.163.com/song/media/outer/url?id=1942372651.mp3',
      coverImgUrl:'../images/7.jpg'
    },
    {
      id:8,
      title:"ピースサイン",
      singer:'米津玄師',
      src:'http://music.163.com/song/media/outer/url?id=485355004.mp3',
      coverImgUrl:'../images/8.jpg'
    }
  ],
    state:'paused',
    playIndex:0,
    play:{
      currentTime:'00:00',
      duration:'00:00',
      percent:0,
      title:'',
      singer:'',
      coverImgUrl:'',
    },

  },
  sliderChange:function(e){
    var second=e.detail.value*this.audioCtx.duration/100
    this.audioCtx.seek(second)
  },
  play:function(){
    this.audioCtx.play()
    this.setData({state:'running'})
  },
  pause:function(){
    this.audioCtx.pause()
    this.setData({state:'paused'})
  },

  audioCtx:null,
  change:function(e){
    this.setMusic(e.currentTarget.dataset.index)
    this.play()
  },


  onReady:function(index){
    this.audioCtx=wx.createInnerAudioContext()
    var that=this
    this.audioCtx.onError(function(){
      console.log('播放失败：'+that.audioCtx.src)
    })
    this.audioCtx.onEnded(function(){
      that.next()
    })
    this.audioCtx.onPlay(function(){})
    this.audioCtx.onTimeUpdate(function(){
      that.setData({
        'play.duration':formatTime(that.audioCtx.duration),
        'play.currentTime':formatTime(that.audioCtx.currentTime),
        'play.percent':that.audioCtx.currentTime/that.audioCtx.duration*100
      })
    })
    this.setMusic(0)
    function formatTime(time){
      var minute=Math.floor(time/60)%60;
      var second=Math.floor(time)%60;
      return (minute<10?'0'+minute:minute)+':'+(second<10?'0'+second:second)
    }
  },

  setMusic:function(index){
    var music=this.data.playlist[index]
    this.audioCtx.src=music.src
    this.setData({
      playIndex:index,
      'play.title':music.title,
      'play.singer':music.singer,
      'play.coverImgUrl':music.coverImgUrl,
      'play.currentTime':'00:00',
      'play.duration':'00:00',
      'play.percent':0
    })
  },

  next:function(){
    this.audioCtx.stop()
    var index=this.data.playIndex>=this.data.playlist.length-1?0:this.data.playIndex+1
    this.setMusic(index)
    if(this.data.state==='running'){
      this.play()
    }
  },

  changeItem:function(e){
    this.setData({
      item:e.target.dataset.item
    })
  },

  changePage:function(e){
    this.setData({
      item:e.target.dataset.page
    })
  },

  changeTab:function(e){
    this.setData({
      tab:e.detail.current
    })
  },

  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
