let mebtnopenurl = 'http://cn.mikecrm.com/ppCxsNW'
window.shareData = {
  'imgUrl': 'https://jeromeyangtao.github.io/SkyworthClub-game/runningMan/ygdbns.jpg',
  'timeLineLink': 'https://jeromeyangtao.github.io/SkyworthClub-game/runningMan/',
  'tTitle': '火柴人跑酷',
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

document.addEventListener('WeixinJSBridgeReady', function onBridgeReady () {
  WeixinJSBridge.on('menu:share:appmessage', function (argv) {
    WeixinJSBridge.invoke('sendAppMessage', {
      'img_url': window.shareData.imgUrl,
      'link': window.shareData.timeLineLink,
      'desc': window.shareData.tContent,
      'title': window.shareData.tTitle
    }, function (res) {
      document.location.href = mebtnopenurl
    })
  })
  WeixinJSBridge.on('menu:share:timeline', function (argv) {
    WeixinJSBridge.invoke('shareTimeline', {
      'img_url': window.shareData.imgUrl,
      'img_width': '640',
      'img_height': '640',
      'link': window.shareData.timeLineLink,
      'desc': window.shareData.tContent,
      'title': window.shareData.tTitle
    }, function (res) {
      document.location.href = mebtnopenurl
    })
  })
}, false)

document.querySelector('#share').addEventListener('click', function () {
  this.style.display = 'none'
})

let jumpMusic = document.querySelector('.jumpMusic')
document.querySelector('#linkScreen').addEventListener('touchstart', function () {
  jumpMusic.play()
})

