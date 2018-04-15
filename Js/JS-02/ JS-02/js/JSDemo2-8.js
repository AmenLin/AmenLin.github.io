'use strict';


var bekiller = JSON.parse(sessionStorage.getItem('bekiller'));//取出被杀数组
var bevoteer = JSON.parse(sessionStorage.getItem('bevoteer'));//取出被投数组
var people = sessionStorage.getItem('people');//取出剩余平民数量
var killer = sessionStorage.getItem('killer');//取出剩余杀手数量
var days = JSON.parse(sessionStorage.getItem('days'));//取出游戏执行的总天数
console.log(days);
var day = days - 1;

var step = JSON.parse(sessionStorage.getItem('sixstep'));//看是从杀人页胜利过来的还是投票页胜利过来的

var Thekillnum;//表示上一轮被杀死的角色号码
var Thekillrole;//表示上一轮被杀死的角色身份
var Thevotenum;//表示上一轮被投死的角色号码
var Thevoterole;//表示上一轮被投死的角色身份
///////////////////////////////////////////////


if (days > 1){ 
    if (step == 'fromvote'){//从投票赢过来的
        for (var i=1; i<days; i++){    
            Thekillnum = (bekiller[i-1]).num;
            Thekillrole = (bekiller[i-1]).role;
            Thevotenum = (bevoteer[i-1]).num;
            Thevoterole = (bevoteer[i-1]).role;
            var contentbox = '<div class="content-box">\n' +
                                    '第' + i + '天<br>\n' +
                                    '黑夜:&nbsp;' + Thekillnum + '号被杀死，真实身份是' + Thekillrole + '<br>\n' +
                                    '白天:&nbsp;' + Thevotenum + '号被投死，真实身份是' + Thevoterole + '\n' +
                                    '</div>\n' 
            $('.content').append(contentbox);
            $('.content-last').hide();
        }
    }else if (step == 'fromkill'){//从杀人赢过来的
        for (var i=1; i<days-1; i++){    
            Thekillnum = (bekiller[i-1]).num;
            Thekillrole = (bekiller[i-1]).role;
            Thevotenum = (bevoteer[i-1]).num;
            Thevoterole = (bevoteer[i-1]).role;
            var contentbox = '<div class="content-box">\n' +
                                    '第' + i + '天<br>\n' +
                                    '黑夜:&nbsp;' + Thekillnum + '号被杀死，真实身份是' + Thekillrole + '<br>\n' +
                                    '白天:&nbsp;' + Thevotenum + '号被投死，真实身份是' + Thevoterole + '\n' +
                                    '</div>\n' 
            $('.content-last').before(contentbox);
            $('#Realday').text(day);
            $('#Realnum').text((bekiller[i].num));
            $('#Realrole').text((bekiller[i].role));
        }
    }
}

///////////////////////////////////////////////


if (killer == '0'){
    $('.main-icon-text').text('平民胜利');
}else if (killer == people){
    $('.main-icon-text').text('杀手胜利');
}
$('#endofkiller').text(killer);
$('#endofpeople').text(people);
///////////////////////////////////////////////


$('.home').click(function(){
    var a = confirm('是否返回首页');
    if (a == true){
        sessionStorage.clear();
        location.href = 'JSDemo2-1.html';
    }
})
$('.bottom-left').click(function(){
    var a = confirm('是否开始新游戏');
    if (a == true){
        sessionStorage.clear();
        location.href = 'JSDemo2-2.html';
    }
})