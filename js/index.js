// 1.引入远程数据
// 关于城市的信息
var city;
var tianqi;
$.ajax({
	url:"https://www.toutiao.com/stream/widget/local_weather/city/",
	dataType:"jsonp",
	method:"get",
	success:function(obj){
		city=obj.data;
		console.log(city);
	}
})
// 关于天气的信息
$.ajax({
	url:"https://www.toutiao.com/stream/widget/local_weather/data/?city=太原",
	dataType:"jsonp",
	method:"get",
	success:function(obj){
		 tianqi=obj.data;
	
	}
})

// 页面加载函数
window.onload=function(){

	// 加载数据
	update();

	// 页面交互
	var pos=document.getElementsByClassName("pos")[0];
	var cityBox=document.getElementsByClassName("city")[0];
	// 点击城市出现城市详情页
	pos.onclick=function(){
	cityBox.style.display="block";
	}

	// 点击城市详情，跳转首页，出现该城市的天气情况
	var BOX=$(".city .citys .con .box");
	for(let i in BOX){
		BOX[i].onclick=function(){
			var chengshi=this.innerHTML;
			console.log(chengshi);
			AJAX(chengshi);
		}
	}

	// 搜索部分
	var searchBox=document.getElementsByClassName("searchBox")[0];
	var button=document.getElementsByClassName("button")[0];
	searchBox.onfocus=function(){
		button.innerHTML="确认";
		text=searchBox.value;
	}

		button.onclick=function(){
		var neirong=button.innerHTML;
		if(neirong=="取消"){
			var city3=document.getElementsByClassName("city")[0];
			city3.style.display="none";
		}else{
			for(var i in city){
				for(var j in city[i]){
					if(text==j){
						AJAX(text);
						return;
					}else{
						alert("没有此城市的天气情况");
						return;
					}
				}
			}
		}
	}
}


//获取点击城市的天气信息函数
function AJAX(str){
	$.ajax({
	url:`https://www.toutiao.com/stream/widget/local_weather/data/?city=${str}`,
	dataType:"jsonp",
	method:"get",
	success:function(obj){
		tianqi=obj.data;
		update();
		var city2=$(".city")[0];
		city2.style.display="none";
	}
	})
}

// 获取数据的函数
function update(){

	// 当前城市
	var pos=document.getElementsByClassName("pos")[0];
	pos.innerHTML=tianqi.city;

	// 当前空气质量
	var quality_level=document.getElementsByTagName("h5")[0];
	quality_level.innerHTML=tianqi.weather.quality_level;

	// 当前温度
	var current_temperature=document.getElementsByClassName("title1")[0];
	current_temperature.innerHTML=tianqi.weather.current_temperature+"°";

	// 当前天气状况
	var current_condition=document.getElementsByClassName("title2")[0];
	current_condition.innerHTML=tianqi.weather.current_condition;

	// 当前风的方西
	var wind_direction=document.getElementsByClassName("wind_der")[0];
	wind_direction.innerHTML=tianqi.weather.wind_direction;

	// 当前风的等级
	var wind_level=document.getElementsByClassName("wind_level")[0];
	wind_level.innerHTML=tianqi.weather.wind_level+"级";

	// 今天的天气情况图标
	var today_icon=document.getElementsByClassName("conPic")[0];
	today_icon.style=`background-image:url("img/${tianqi.weather.dat_weather_icon_id}.png")`;	

	// 明天的天气图标
	var tomorrow_icon=document.getElementsByClassName("tomorrow_icon")[0];
	tomorrow_icon.style=`background-image:url("img/${tianqi.weather.tomorrow_weather_icon_id}.png")`;

	// 每小时的天气情况
	var hourlyArr=tianqi.weather.hourly_forecast;
	var wrap=document.getElementsByClassName("wrap")[0];
	for(let i in hourlyArr){
		// 创建box
		var box1=document.createElement("div");
		box1.className="box";
		// 创建time块
		var time=document.createElement("div");
		// 添加类名
		time.className="time";
		// 添加到父级元素身上
		box1.appendChild(time);
		// 添加内容
		time.innerHTML=hourlyArr[i].hour+":00";

		// 创建图标块
		var icon=document.createElement("div");
		icon.className="icon";
		box1.appendChild(icon);
		// 修改样式
		icon.style=`background-image:url("img/${hourlyArr[i].weather_icon_id}.png")`;

		// 创建温度块
		var timeTem=document.createElement("div");
		timeTem.className="timeTem";
		box1.appendChild(timeTem);
		timeTem.innerHTML=hourlyArr[i].temperature+"°";

		// 把每一个box块添加到wrap1上
		wrap.appendChild(box1);
	}

	// 未来15天天气情况
	var box2=document.createElement("div");
	box2.className="box";
	var wrap1=document.getElementsByClassName("wrap1")[0];
	wrap1.appendChild(box2);

    //创建day元素
	var day=document.createElement("div");
	day.className="day";
	//把time放到box1中
	box2.appendChild(day);
    
    //创建weather元素
	var weather=document.createElement("div");
	weather.className="weather";
	//把time放到box1中
	box2.appendChild(weather);

    //创建icon元素
    var icon=document.createElement("div");
	icon.className="icon";
	//把icon放到box1中
	box2.appendChild(icon);
    
    //创建high元素
	var high=document.createElement("div");
	high.className="high";
	//把time放到box1中
	box2.appendChild(high);

	//创建low元素
	var low=document.createElement("div");
	low.className="low";
	//把time放到box1中
	box2.appendChild(low);

	//创建wind元素
	var wind=document.createElement("div");
	wind.className="wind";
	//把time放到box1中
	box2.appendChild(wind);

	//创建grade元素
	var grade=document.createElement("div");
	grade.className="grade";
	//把time放到box1中
	box2.appendChild(grade);


   var dayArr=tianqi.weather.forecast_list;
   //console.log(dayArr);
   var wrap1=document.getElementsByClassName("wrap1")[0];
   //console.log(wrap1);
   for(let i in dayArr){
		//console.log(hourlyArr[i].hour);
		//创建BOX1变量名
		var box2=document.createElement("div");
		//类名box（之前写的在css中）
	    box2.className="box";
        

	    var day=document.createElement("div");
	    day.className="day";
	    //把time放到box1中
	    box2.appendChild(day);
	    day.innerHTML=dayArr[i].date;

        //创建weather
        var weather=document.createElement("div");
	    weather.className="weather";
	    //把time放到box1中
	    box2.appendChild(weather);
	    weather.innerHTML=dayArr[i].condition;


	    //创建icon元素
        var icon=document.createElement("div");
	    icon.className="icon";
	    //把icon放到box1中
	    box2.appendChild(icon);
	    icon.style=`background-image:url("img/${
	        dayArr[i].weather_icon_id}.png")`;
    
        //创建high元素
	    var high=document.createElement("div");
	    high.className="high";
	    //把time放到box1中
	    box2.appendChild(high);
	    high.innerHTML=dayArr[i].high_temperature;


	    //创建low元素
	    var low=document.createElement("div");
	    low.className="low";
	    //把time放到box1中
	    box2.appendChild(low);
	    low.innerHTML=dayArr[i].low_temperature;

	    //创建wind元素
	    var wind=document.createElement("div");
	    wind.className="wind";
	    //把time放到box1中
	    box2.appendChild(wind);
	    wind.innerHTML=dayArr[i].wind_direction;


	    //创建grade元素
	    var grade=document.createElement("div");
	    grade.className="grade";
	    //把time放到box1中
	    box2.appendChild(grade);
	    grade.innerHTML=dayArr[i].wind_level;

	    wrap1.appendChild(box2);

	}

	//关于城市的信息
	 var city1=document.getElementsByClassName("city")[0];
	 for(let i in city){
	 	var citys=document.createElement("div");
	 	citys.className="citys";

	 	var title=document.createElement("div");
	 	title.className="title";
	 	title.innerHTML=i;
	 	citys.appendChild(title);

	 	var con=document.createElement("div");
	 	con.className="con";

	 	for(let j in city[i]){
	 		var box=document.createElement("div");
	 		box.className="box";
	 		box.innerHTML=j;
	 		con.appendChild(box);
	 	}
	 	citys.appendChild(con);
	 	city1.appendChild(citys);

	 }

}