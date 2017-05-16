document.addEventListener('DOMContentLoaded',function(){
	var oPlay=document.querySelector('.play');
	var oAudio=document.querySelector('audio');
	var oStart=document.querySelector('.start');
	var oStartImg=document.querySelector('.start-img');
	var play=true;
	var controler=null;
	var controlerBar=null;
	var oToTal=document.querySelector('.total')
	var oBar=document.querySelector('.bar');
	var oHadPlay=document.querySelector('.had-play');
	var hadTimer=document.querySelector('#had-timer');
	var allTimer=document.querySelector('#all-timer');
	var oMusic=document.querySelector('.music');
	var oLove=document.querySelector('.love');
	var oCountMusic=document.querySelector('.count-music');
	var oCountLove=document.querySelector('.count-love');
	var x=0;
	var n=1;
	var aboveX=0;
	var numDragpaddingLeft=0;
	var num=1;
	var y=1;
	oMusic.src='images/rmusic.png'
	oCountMusic.innerHTML=n++;
	var oNav=document.querySelector('.nav');
	oNav.addEventListener('click',function(){
		oNav.style.display='none';
	},false)
	oLove.addEventListener('click',function(arr){
		if(num){
			oCountLove.innerHTML=y;
			oLove.src='images/rLove.png';
			num=0;
			console.log(y)
		}else{
			if (num==0) {
				y=0;
				oCountLove.innerHTML=y;
				oLove.src='images/love.png';
				num=1;
				y=1;
			}
		}
	},false)
	oStart.addEventListener('click',function(){
		if (play) {
			oAudio.play()
			oStartImg.src='images/play.png';
			play=false;
			// clearInterval(controler);
			// clearInterval(controlerBar)
			controler=setInterval(time,1000);
			controlerBar=setInterval(progress,1000);
		}else{
			oAudio.pause();
			clearInterval(controler);
			clearInterval(controlerBar);
			oStartImg.src='images/stop.png';
			play=true;	
		}
	},false)
	function cutTime(time){
	    var value = (time > 10 ? time + '' : '0' + time).substring(0, 2);
	    return isNaN(value) ? '00' : value;
    };

	function time(){
		var allTime = oAudio.duration,
			hadTime = oAudio.currentTime;
		hadTimer.innerHTML=''+cutTime(hadTime / 60)+':'+ cutTime(hadTime % 60)+'';
		allTimer.innerHTML=''+cutTime(allTime / 60)+':'+cutTime(allTime % 60)+'';
		return hadTimer.innerHTML,allTimer.innerHTML
	}
	function progress(){
		var cuT = oAudio.currentTime,
			toT = oAudio.duration;
		var oToTalWidth=oToTal.offsetWidth/20;
		progress = (cuT/toT)*oToTalWidth;
		
		oHadPlay.style.width=progress+'rem';
		oBar.style.left=progress+'rem';
		return oHadPlay.style.width,oBar.style.left

	};
        oBar.addEventListener("touchstart", function(e){
        	var touchMoveTime=oAudio.currentTime;
        	var touch = e.targetTouches[0];
	        startX = touch.pageX;
	    	function touchMove(e) { //滑动
		        var toT = oAudio.duration;
		        var touch = e.targetTouches[0];
		        var oToTalWidth=oToTal.offsetWidth/20; //总距离
		        x = (touch.pageX - startX)/20; //滑动的距离
		        var widthBar =aboveX+ x;
		        
		        if(widthBar>16.25){
		            widthBar=16.25;
		    	}else{
		    		if (widthBar<0) {
		    			widthBar=0
		    		}
		    	}			    		

	    		oBar.style.left = widthBar+ "rem";
	           	oHadPlay.style.width=widthBar+'rem';
		    	//不让进度条超出页面		    	
		    	// time()
		    	return oBar.style.left
		    }
		    function touchEnd(e) { //手指离开屏幕
		        aboveX = parseInt(oBar.style.left);
		        var touch = e.targetTouches[0];
		        var dragPaddingLeft = oBar.style.left;
		        var changeLeft = dragPaddingLeft.replace("rem", "");
		        numDragpaddingLeft = changeLeft;
		        var currentTime = (numDragpaddingLeft / (oToTal.offsetWidth/20)) * oAudio.duration;//0.75是拖动圆圈的长度，减掉是为了让歌曲结束的时候不会跑到window以外
		        // console.log(currentTime)
		        oAudio.currentTime = currentTime;
		        time();
		        oBar.removeEventListener('touchmove',touchMove,false)
		        oBar.removeEventListener('touchend',touchEnd,false)
		    };
		    oBar.addEventListener("touchmove", touchMove, false);
    		oBar.addEventListener("touchend", touchEnd, false);
    		e.preventDefault();
    		
   		}, false);
        oAudio.addEventListener('ended',function(){
        	oStartImg.src='images/stop.png';
        	play=true;
        },false)
        oAudio.addEventListener('loadedmetadata',function(){
		alert('执行了')
		time()
	},false)
},false)
