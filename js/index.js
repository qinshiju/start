var data=[
	{
		soung:"你就是我想要的丫头",
		singer:"赵照",
		id:"id",
		about:[
			{
			share:"分享",
			delete:"删除"
			}
		]
	},
	{
		soung:"盛夏的果实",
		singer:"莫文蔚",
		id:"id",
		about:[
			{
			share:"分享",
			delete:"删除"
			}
		]
	},
	{
		soung:"成都",
		singer:"赵雷",
		id:"id",
		about:[
			{
			share:"分享",
			delete:"删除"
			}
		]
	}
]
document.addEventListener('DOMContentLoaded',function(){
	function createLi(arr){
		var oUl=document.querySelector('.sound');
		// console.log(arr.length)
		for (var i=0; i<arr.length; i++){
			var aLi=document.createElement('li');
				aLi.innerHTML='<a href="music.html" title="" class="song-singer">'+
				'<span class="song">'+arr[i].soung+'</span>'+
				'<span  class="singer">'+arr[i].singer+'</span>'+
			'</a>'+
			'<div class="shar-del">'+
				'<span class="delete">'+arr[i].about[0].delete+'</span>'+
			'</div>'+
			'<div class="my-look">'+
				'<input type="button" name="" value="自己可见">'+
			'</div>'
			oUl.appendChild(aLi)
			
		}
		var aShare=document.querySelectorAll('.share');
		var aDelete=document.querySelectorAll('.delete');
		var aLi=document.querySelectorAll('li');
		var aMyLook=document.querySelectorAll('.my-look');
		console.log(aMyLook.length)
		var x=0;
		for (var i=0; i<aDelete.length; i++){
			aDelete[i].index=i;
			aDelete[i].addEventListener('click',function(){
				oUl.removeChild(aLi[this.index])
			},false)
		}
		for (var i=0; i<aLi.length; i++){
			aLi[i].indexT=i;
			aLi[i].addEventListener('touchstart',function(e){
				var startX=e.targetTouches[0].pageX-x;
				function touchMove(e){
					console.log(e)
					x=e.targetTouches[0].pageX-startX;
					console.log('左'+x+'右'+x)
					console.log(aMyLook[this.indexT])
					// console.log(aLi[this.index].index)
					// aLi[this.index].style.width=x+'rem'
					if (x<0) {
						aLi[this.indexT].style.width=20.225+'rem';
						aLi[this.indexT].style.left=-3+'rem';
						x=0
					}else{
						aLi[this.indexT].style.width=17.225+'rem';
						aLi[this.indexT].style.left=0+'rem';
						x=0;
					}
					console.log('现在的值'+x)
				};
				function touchEnd(){
					aLi[this.indexT].removeEventListener('touchmove',touchMove,false)
					aLi[this.indexT].removeEventListener('touchend',touchEnd,false)
				};
				aLi[this.indexT].addEventListener('touchmove',touchMove,false);
				aLi[this.indexT].addEventListener('touchend',touchEnd,false);
				//e.preventDefault();
			},false)
		}
	}
	createLi(data)	
},false)












