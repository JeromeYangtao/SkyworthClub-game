var width = window.innerWidth;			 //屏幕宽
var height = window.innerHeight;		 //屏幕高
var $bridge = $("#bridge");	 			 //桥
var bridge_height=0;     				 //桥的高度
var speed = 5;                          //桥升高速度
var mouseDown;							 //鼠标按下
var k=0,x=0;
var bridgeExist = false;                 //判断桥是否存在指标
var road = 3;							 //桥上路面的宽度
var dt=0;								 //圣诞老人运动时的角度
var isCartoon=false;					 //判断是否处于动画状态的指标
var score = 0;							 //分数

// 样式调整,自适应
$("body,.main").css({
	width:width,
	height:height,
})
$(".main ul").css({
	// width:width*10,
	height:height,
})
$(".main ul li").css({
	width:width/2,
	height:height-100,
})
$("img").click(function(){
	return false;
})

// 按住鼠标桥变长
var beLonger = true;	//判断桥是不是正在变长
function bridgeLonger(){
	if (mouseDown && !bridgeExist) {
		if (bridge_height>height-100) {
			beLonger = false;
		}
		if (bridge_height < 1) {
			beLonger = true;
		}
    	if (beLonger) {
			$('#bridge').css({height:'+=' + speed});
	    	bridge_height = $bridge.height();
    	}
    	if (!beLonger) {
			$('#bridge').css({height:'-=' + speed});
	    	bridge_height = $bridge.height();
    	}
		$("#h").text("桥的长度:" + Math.round(bridge_height) + "米");
	}
}

// 更改分数
function scoreChange(){
	$("#score").text(score);
}

// 放下桥
function renderBridge(){
	if (!mouseDown && !$(".bg").is(":animated")) {		
		// 竖直的桥部分恢复和建筑相同高度
		$("#bridge").css({height: 0});
		// 桥不存在时创建桥
		if (!bridgeExist) {
			clearInterval(draw);
			// 创建放下的桥
			$("#renderBridge").css({
				height:bridge_height,
				left: $bridge.offset().left,
				bottom:-bridge_height/2 +100,
			});
			// 算出放下桥的长度
			$("#renderBridge").width(bridge_height);	
			// 桥存在
			bridgeExist = true;
		}
		judge();
	}
}

// 放下桥后判断
function judge(){
	if(!mouseDown){
		var n = k+1;
		var str = '.b' + n;
		if ($("#renderBridge").width() + road*2 + $("#renderBridge").offset().left > $(str).offset().left + 10
		&& $("#renderBridge").width() + road*2 +$("#renderBridge").offset().left< $(str).offset().left + $(str).width() - 20) {
			score += 1;
			// 圣诞老人沿着桥运动
			SantaMove = setInterval('move()',10);
		}else{
			$("#gameover").show();
			$("#score").hide();
			$("#gameover .box .score").text(score);
			$("#h").hide();
			$("#restar").show();
			clearBind();
			$("#share").show();
			changeTitle("我在圣诞老人接班人游戏中闯过了" + score + "关"); 
		}
	}	
}

// 圣诞老人沿着桥运动
function move(){
    var r = bridge_height/2;
    var Px = Santa_left + (1 - Math.cos(dt) )*r;
    var Py = Math.sin(dt)*r;
    $('#Santa').css({left:Px,bottom:Py-10});
    if (dt < Math.PI) {
    	dt += 0.01;
    }
    if (dt > Math.PI) {	
		$('#Santa').css({
			bottom:-10,
		})
		$("#renderBridge").css({
			width:0,
			height:0
		});
		bridgeExist = false;
		changeFrame();
	}
}

// 画面切换
function changeFrame(){
	clearInterval(SantaMove);
	if(score == 7){
		setTimeout(success,100);
		$("#share").show();
		clearBind();
		document.removeEventListener('touchend', touchEndFunc, false);
		changeTitle("我在圣诞老人接班人游戏中闯过了" + score + "关");
		return false;
	}
	
	if(!$(".bg").is(":animated") && !bridgeExist){
		$(".bg").animate({
			left:'-=' + width/2
		},1000,function(){
			isCartoon = false;
		})
		$("#h").text("桥的长度:" + 0 + "米");
	}	
}

// 重新开始
$("#restar").click(function(){
	int();
})
// 初始化
function int(){
	beLonger = true;
	k=0;
	x=0;
	$(".bg").css({left:0});
	$("#restar").hide();
	$("#renderBridge").css({
		width:0,
		height:0
	});
	$("#share").hide();
	$("#bridge").css({
		height: 0,
	}).show();
	$("#gameover").hide();
	$("#Santa").css({left:30});
	$("#h").show();
	isCartoon = false;
	mouseDown = false;
	bridgeExist = false;
	score = 0;
	bridge_height = 0;

	width = window.innerWidth;			 //屏幕宽
	height = window.innerHeight;		 //屏幕高
	$bridge = $("#bridge");	 			 //桥
	bridge_height=0;     				 //桥的高度
	if(speed > 1){
		speed -= 0.8;  
	}else{
		speed = 1;
	}                                    //桥升高速度
	mouseDown;
	k=0,x=0;
	bridgeExist = false;                 //判断桥是否存在指标
	road = 3;							 //桥上路面的宽度
	dt=0;								 //圣诞老人运动时的角度
	isCartoon=false;					 //判断是否处于动画状态的指标
	score = 0;	
	$("#score").text(score);
	$("body,.main").css({
		width:width,
		height:height,
	})
	$(".main ul").css({
		// width:width*10,
		height:height,
	})
	$(".main ul li").css({
		width:width/2,
		height:height-100,
	})
	$("img").click(function(){
		return false;
	})
	beLonger = true;
	$("#title").show();
	$("#score").show();
	$("#rule").show();
	changeTitle("圣诞老人接班人");
	// $("title").text("圣诞老人接班人");
	// location.reload();
	// window.location.href="index.html";
	// window.history.back();
	// $("body").bind("touchstart", touchstart);
	addBind();

}


// 设置鼠标按下,松开,触摸,松开,pc端
document.addEventListener('mousedown', function(){
	mouseDown = true;
})
document.addEventListener('mouseup', function(){
	mouseDown = false;
})

addBind();
function addBind() {
   		document.addEventListener('touchstart', touchStartFunc, true);  
}
function touchStartFunc(e){
	$("#rule").hide();
	$("#title").hide();
	if (!isCartoon) {
		x = parseInt($("#Santa").offset().left) + parseInt($("#Santa").css("width"));
		$("#bridge").css({
			left:x,
		});
		mouseDown = true;
		var longer = setInterval(function() {
			bridgeLonger();
		},70);
	}
	e.preventDefault();
}
function clearBind() {
	document.removeEventListener('touchstart', touchStartFunc, true);
	// document.removeEventListener('touchend', touchEndFunc, false);
}

document.addEventListener('touchend', touchEndFunc)

function touchEndFunc(){
	if (!isCartoon) {
		mouseDown = false;

		Santa_left = $("#Santa").position().left + $("#Santa").width()/2;
		k++;
		dt=0;
		draw = setInterval(function(){
			renderBridge();
			scoreChange();
			isCartoon = true;
		},60);
	}	
}
function success(){
	$("#success").show();
	$("#h").hide();	
	$("#Santa").hide();
	return false;
}


function changeTitle(string){
    var u = navigator.userAgent;
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    document.title = string;
    if (isiOS) {
        var body = document.getElementsByTagName('body')[0];
        
        var iframe = document.createElement("iframe");
        iframe.setAttribute("src", "loading.png");
        iframe.addEventListener('load', function() {
        setTimeout(function() {
          iframe.removeEventListener('load', function(){});
            document.body.removeChild(iframe);
          }, 0);
        });
        document.body.appendChild(iframe);
    }
}