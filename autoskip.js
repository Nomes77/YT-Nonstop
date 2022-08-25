function injectScript(t,e){
	var o=document.getElementsByTagName(e)[0];
	var n=document.createElement("script");
	var u=document.createElement("script");
	n.setAttribute("type","text/javascript");
	u.setAttribute("type","text/javascript");
	n.append(`YTNonstop = ${t}()`);
	o.appendChild(n);
	u.append("autotube = YTNonstop = new YTNonstop();");
	o.appendChild(u);
	n.remove()
}
let YTNonstop=function t(e){
	const o=window.MutationObserver||window.WebKitMutationObserver;
	const n={
		_autoSkip:null,
		getIsAutoSkip:function(){
			return n._autoSkip
		},
		setAutoSkip:function(t){
			return n._autoSkip=t
		}
	};
	const u={
		player:()=>document.getElementById("movie_player"),
	};
	const l=()=>{
		if(n.getIsAutoSkip()==true&&u.player().getPlayerState()===0){
			u.player().setAutonav(true);
			const t=u.player().getPlaylistIndex();
			const e=u.player().getPlaylist();
			if(e===null||e===undefined){
				return u.player().nextVideo()
			}
			else{
				e.length-1==t?u.player().nextVideo():u.player().playVideoAt(t+1)
			}
		}
		else{
			u.player().setAutonav(false)
		}
	};
	const c=t=>{
		if(u.player().getPlayerState()===2){
			t.click();
			u.player().playVideo();
			document.getElementsByTagName("ytd-popup-container")[0]&&document.getElementsByTagName("ytd-popup-container")[0].remove();
			document.getElementsByTagName("ytmusic-popup-container")[0]&&document.getElementsByTagName("ytmusic-popup-container")[0].remove()
		}
	};
	function d(){
		const t={
			getButton:window.document.getElementsByClassName("ytp-play-button ytp-button")[0]||window.document.getElementById("play-pause-button"),
			config:{
				attributes:true,
				childList:true,
				subtree:true
			},
			callback:(t,e)=>{
				if(t.some(t=>t.type==="attributes")){
					const t=window.document.getElementById("confirm-button")||undefined;
					if(t){
						c(t)
					}
					else{
						l()
					}
				}
			}
		};
		const e={
			setInterval:setInterval(()=>{
				if(window.location.href.indexOf("/watch")==-1)return;
				try{
					const n=new o(t.callback);
					n.observe(t.getButton,t.config);
					clearInterval(e.setInterval)
				}
				catch(t){
					window.location.reload()
				}
			},1e3),
		};
		setInterval(()=>{
			yt.util&&yt.util.activity&&yt.util.activity.setTimestamp();
		},5e3);
		return n
	}
	function p(){
		return n.getIsAutoSkip()
	}
	function S(){
		return u
	}
	function t(){
		this.isAutoSkip=p;
		this.get_yt=S;
		d()
	}
	const A=(t,e)=>{
		switch(t){
			case"autoSkip":n.setAutoSkip(e);
			break
		}
	};
	addEventListener("message",(function(t){
		for(key in t.data){
			A(key,t.data[key])
		}
	}));
	return t
};
injectScript(YTNonstop,"html");
