'use strict';

$(document).ready(function(){

var player = JSON.parse(sessionStorage.getItem('player'));//取出总玩家人数数组
var playerstates = [];//var一个变量来装玩家的初始状态
var bekiller = [];//var一个变量来装被杀的角色
var bevoteer = [];//var一个变量来装被投的角色
var days = 1;//初始化天数为1

sessionStorage.setItem('bekiller', JSON.stringify(bekiller));
sessionStorage.setItem('bevoteer', JSON.stringify(bevoteer));
sessionStorage.setItem('days', JSON.stringify(days));

/////////////////////////////////////////////////////////////////////////////////////////////

for (var i=0; i<player.length; i++){//遍历数组，为了输出符合数组长度的盒子
    var num = i + 1;//每个角色对应的号码
    var inBox = '<div class=\"content-box\">\n'+//var个变量存储写进文档的标签代码，记住要转义字符
                    '<div class=\"content-top\">\n'+
                        '<div class=\"career\">\n'+ player[i] +
                        '</div>\n'+
                        '<div class=\"number\">\n'+ num +
                        '</div>\n'+
                    '</div>\n'+
                    '<div class=\"content-bottom\">\n'+
                    '</div>\n'+
                '</div>'    
    $('.main-box').append(inBox);//通过append将盒子一个一个的往文档里面装

    playerstates[i] = {//为每个玩家角色添加初始状态，都是live
        role: player[i],//通过下标代表每个角色的身份
        status: 'live',
        num: num
    }
};
console.log(playerstates);
sessionStorage.setItem('playerstates', JSON.stringify(playerstates));//将玩家状态保存
////////////////////////////////////////////////////////////////////////////////////////////


$('.back-arrow').click(function(){
    var i = confirm('确定要返回角色页面吗？');
    if (i == true){
        location.href = 'JSDemo2-3.html';
    }
});
$('.close').click(function(){
    var i = confirm('确定要返回首页吗？');
    if (i == true){
        sessionStorage.clear();
        location.href = 'JSDemo2-1.html';
    }
});
$('.main-bottom').click(function(){
    location.href = 'JSDemo2-5.html';
});

});