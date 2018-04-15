'use strict';

var player = JSON.parse(sessionStorage.getItem('player'));
var people = sessionStorage.getItem('people');
var killer = sessionStorage.getItem('killer');
var playerstates = JSON.parse(sessionStorage.getItem('playerstates'));
var bekiller = JSON.parse(sessionStorage.getItem('bekiller'));
var bevoteer = JSON.parse(sessionStorage.getItem('bevoteer'));
var days = JSON.parse(sessionStorage.getItem('days'));
var theindex;//用来存储获取到的格子下标
var thestatus;//用来单独存储玩家的状态
var thenewstatus;//用来给确定按钮做判断条件的变量
var theroles;//用来存储玩家身份
var thepick = '0';//用来表示是否有选人，若有选人则改为1
var day;
var sixstep;//用来区分是以杀人页面胜利跳去结果页投票页面胜利跳去结果页
////////////////////////////////////////////////


var step;//变量，用来储存更改传过来的值的状态
var getstep;//变量，用来储存传过来的状态
getstep = sessionStorage.getItem('step');
if (getstep == 'dead'){//表示从杀人按钮来的，在杀人按钮哪里已经将状态变更为dead，这里只表示从杀人按钮而来
    $('#topic').text('杀手杀人');
    getstep = 'dead';//将状态变更成发表遗言
    sessionStorage.setItem('step', getstep);//然后存入storage返回去
    $('.killslogan').show();
    $('.kill-arrow').show();
    $('.voteslogan').hide();
    $('.vote-arrow').hide();
}else if (getstep == 'kill'){//表示从投票按钮来的，在投票按钮已经将状态变更为kill，这里只表示从投票状态而来
    $('#topic').text('全民投票');
    getstep = 'kill';//将状态变更为杀人
    sessionStorage.setItem('step', getstep);//然后存入storage返回去
    $('.killslogan').hide();
    $('.kill-arrow').hide();
    $('.voteslogan').show();
    $('.vote-arrow').show();
}
///////////////////////////////////////////////////


for (var i=0; i<player.length; i++){//通过遍历往html添加格子
    var content =  
"       <div class=\"content-box\">\n" +
"            <div class=\"content-top\">\n" +
"                <div class=\"career\">" + player[i] + "</div>\n" +
"                <div class=\"number\">" + (i+1) + "号</div>\n" +
"            </div>\n" +
"            <div class=\"content-bottom\">\n" + 
"            </div>\n" + 
"        </div>";
    $('.main-box').append(content);

    thestatus = (playerstates[i].status);//根据上面的遍历，遍历出每一个角色的状态，用thestatus来储存，假如遍历到的这个角色状态是死，则这个角色的颜色改变
        if (thestatus == 'die'){
            $($('.career')[i]).css('backgroundColor', '#999');
        }else if (thestatus == 'live'){
            $($('.career')[i]).css('backgroundColor', '#F5C97B');
        }
}
///////////////////////////////////////////////////


$('.content-box').click(function(){//通过index可以取得当前点击项的下标
    theindex = $(this).index();//var一个变量来存储当前点击项的下标
    console.log(theindex);
    theroles = (playerstates[theindex].role);//用来表示被选择的角色身份
    console.log(theroles);
    thenewstatus = (playerstates[theindex].status);
    console.log(thenewstatus);
    var thechoose = $('.content-bottom');
    $('.content-bottom').css('visibility', 'hidden');//每次点击先让刀隐藏
    $(thechoose[theindex]).css('visibility', 'visible');
    thepick = '1';
})
////////////////////////////////////////////////////


$('.main-bottom').click(function(){
    if (thepick == '1'){
        if (thenewstatus == 'live'){
            if (getstep == 'dead'){//代表现在是杀手页面
                if (theroles == '杀手'){
                    alert('不要自相残杀阿');
                }else if (theroles == '平民'){
                    var a = confirm('确定杀死他吗');
                    if (a == true){
                        people--;
                        sessionStorage.setItem('people', people);
                        playerstates[theindex].status = 'die';
                        sessionStorage.setItem('playerstates', JSON.stringify(playerstates));
                        bekiller.push((playerstates[theindex]));
                        sessionStorage.setItem('bekiller', JSON.stringify(bekiller));
                        if (killer == people){
                            alert('杀手胜利');
                            days++;
                            sessionStorage.setItem('days', JSON.stringify(days));
                            sixstep = 'fromkill';
                            sessionStorage.setItem('sixstep', JSON.stringify(sixstep));
                            location.href = 'JSDemo2-8.html';
                        }else {
                            location.href = 'JSDemo2-5.html';
                        }
                    }
                }
            }else if (getstep == 'kill'){//代表是投票页面
                var b = confirm('确定投死他吗');
                if (b == true){
                    playerstates[theindex].status = 'die';//将当前格子的状态更改为die
                    sessionStorage.setItem('playerstates', JSON.stringify(playerstates));//将更改后的状态数组存入storage
                    bevoteer.push((playerstates[theindex]));
                    sessionStorage.setItem('bevoteer', JSON.stringify(bevoteer));
                    if (theroles == '杀手'){
                        killer--;
                        sessionStorage.setItem('killer', killer);
                        if (killer == '0'){
                            alert ('平民胜利');
                            days++;
                            sessionStorage.setItem('days', JSON.stringify(days));
                            sixstep = 'fromvote';
                            sessionStorage.setItem('sixstep', JSON.stringify(sixstep));
                            location.href = 'JSDemo2-8.html';
                        }else {
                            day = days + 1;
                            sessionStorage.setItem('days', JSON.stringify(day));
                            location.href = 'JSDemo2-5.html';
                        }
                    }else if (theroles == '平民'){
                        people--;   
                        sessionStorage.setItem('people', people);
                        if (killer == people){
                            alert('杀手胜利');
                            days++;
                            sessionStorage.setItem('days', JSON.stringify(days));
                            sixstep = 'fromvote';
                            sessionStorage.setItem('sixstep', JSON.stringify(sixstep));
                            location.href = 'JSDemo2-8.html';
                        }else {
                            day = days + 1;
                            sessionStorage.setItem('days', JSON.stringify(day));
                            location.href = 'JSDemo2-5.html';
                        }
                    }else {
                        day = days + 1;
                        sessionStorage.setItem('days', JSON.stringify(day));
                        location.href = 'JSDemo2-5.html';
                    }
                }
            }
        }else if (thenewstatus == 'die'){
            alert('这个人已经凉了');
        } 
    }else if (thepick == '0'){
        alert('英雄请杀个人再走');
    }
})
//////////////////////////////////////////////


$('.back-arrow').click(function(){
    var a = confirm('是否返回角色页面');
    if (a == true){
        location.href = 'JSDemo2-2.html';
    }
})
$('.close').click(function(){
    var a = confirm('是否返回首页');
    if (a == true){
        sessionStorage.clear();
        location.href = 'JSDemo2-1.html';
    }
})
////////////////////////////////////////////////
