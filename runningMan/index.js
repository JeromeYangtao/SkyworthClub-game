let mebtnopenurl = 'http://cn.mikecrm.com/ppCxsNW'
window.shareData = {
  'imgUrl': 'https://jeromeyangtao.github.io/SkyworthClub-game/runningMan/ygdbns.jpg',
  'timeLineLink': 'https://jeromeyangtao.github.io/SkyworthClub-game/runningMan/',
  'tTitle': '奔跑吧doge',
  'tContent': '玩起来怎么都停不下来的啊！'
}

function dp_share (t) {
  document.title = t / 1000 + '秒！快扶我起来，我还能继续玩！'
  document.querySelector('#share').style.display = ''
  window.shareData.tTitle = document.title
  console.log('返回')
}

function dp_share2 (t) {
  document.title = t / 1000 + '秒！快扶我起来，我还能继续玩！'
  document.querySelector('#share').style.display = ''
  document.querySelector('.shareImg').style.display = 'block'
  window.shareData.tTitle = document.title
  console.log('炫耀')
}

// 加入我们
function dp_Ranking () {
  window.location = mebtnopenurl
}

function showAd () {
  console.log('4')
}

// 开始游戏
let backgroundMusic = document.querySelector('.backgroundMusic')

function hideAd () {
  console.log('开始游戏')
  backgroundMusic.play()
}

// 游戏结束
function dp_submitScore (m, t) {
  console.log('游戏结束')
  backgroundMusic.pause()
  // return false
}


wx.onMenuShareTimeline({
  title: window.shareData.tTitle, // 分享标题
  link: window.shareData.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
  imgUrl: window.shareData.imgurl, // 分享图标
  success: function () {
    // 用户确认分享后执行的回调函数
  },
  cancel: function () {
    // 用户取消分享后执行的回调函数
  }
})
wx.onMenuShareAppMessage({
  title: window.shareData.tTitle, // 分享标题
  desc: window.shareData.tContent, // 分享描述
  link: window.shareData.timeLineLink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
  imgUrl: window.shareData.imgurl, // 分享图标
  type: 'link', // 分享类型,music、video或link，不填默认为link
  dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
  success: function () {
    // 用户确认分享后执行的回调函数
  },
  cancel: function () {
    // 用户取消分享后执行的回调函数
  }
})

document.querySelector('#share').addEventListener('click', function () {
  this.style.display = 'none'
})

let jumpMusic = document.querySelector('.jumpMusic')
document.querySelector('#linkScreen').addEventListener('touchstart', function () {
  jumpMusic.play()
})

