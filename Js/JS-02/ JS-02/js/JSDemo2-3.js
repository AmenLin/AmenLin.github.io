'use strict';

$(document).ready(function(){

var state = 1;//用来分辨当前是皇上页面还是身份页面
var player = [];//造一个player来装一个空数组
var killer = sessionStorage.getItem('killer');//取出传过来的杀手的数量
var people = sessionStorage.getItem('people');//取出传过来的平民的数量
var cycle = 1;//最上面的圆圈数字


for (var i=0; i<killer; i++){//将杀手push进数组
    player.push('杀手');
}
for (var i=0; i<people; i++){//将平民push进数组
    player.push('平民');
}
//console.log(player);


function shuffle(array){//洗牌算法的函数，里面不涉及任何参数
    var x, y, z;
    x = array.length;
    while (x){
        y = Math.floor(Math.random()*x--);
        z = array[x];
        array[x] = array[y];
        array[y] = z;
    }
    return array;
}
console.log(shuffle(player));//调用洗牌算法来打乱player数组
//console.log(player);
sessionStorage.setItem('player', JSON.stringify(player));//将打乱后的数组存进json



$('.main-bottom').click(function(){
    if (cycle < player.length+1){//将圆圈数字与传递过来的数组长度设置为判断条件
        if (state == 1){//调用开始设置的状态，用来改变皇上与女孩图像
            $('.main-top-icon-1').hide();
            $('.box').show();
            $('#topText').text(player[cycle-1]);
            cycle++;//圆圈数字加1，若不设置，圆圈永远是1且无限循环，因为1永远小于数组长度是为true
            if (cycle < player.length+1){//
                $('.main-bottom').text('隐藏并传递给' + cycle + '号');
            }else if (cycle == player.length+1){
                $('.main-bottom').text('法官查看');
            }
            state = 0;
        } else if (state == 0) {
            $('.box').hide();
            $('.main-top-icon-1').show();
            $('#topNumber').text(cycle);
            $('.main-bottom').text('查看' + cycle + '号身份');
            state = 1;
        }
    }else {
        var a = confirm('请将手机传递给法官');
        if (a == true){
            location.href = 'JSDemo2-4.html';
        }
    }
})


$('.back-arrow').click(function(){
    var i = confirm('确定返回玩家人数页吗？');
    if (i == true){
        location.href = 'JSDemo2-2.html';
    }
})
$('.close').click(function(){
    var i = confirm('确定返回首页吗？');
    if (i == true){
        sessionStorage.clear();
        location.href = 'JSDemo2-1.html';
    }
})
})