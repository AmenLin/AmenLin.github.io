'use strict';

var player = JSON.parse(sessionStorage.getItem('player'));
var playerstates = JSON.parse(sessionStorage.getItem('playerstates'));
var thestatus;
//////////////////////////////////////////////


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


$('.main-bottom').click(function(){
    location.href = 'JSDemo2-5.html';
})