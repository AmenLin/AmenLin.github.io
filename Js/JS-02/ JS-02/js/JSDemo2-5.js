'use strict';

var bekiller = JSON.parse(sessionStorage.getItem('bekiller'));
console.log(bekiller);
var bevoteer = JSON.parse(sessionStorage.getItem('bevoteer'));
var Thekillnum;//表示上一轮被杀死的角色号码
var Thekillrole;//表示上一轮被杀死的角色身份
var Thevotenum;//表示上一轮被投死的角色号码
var Thevoterole;//表示上一轮被投死的角色身份
var Nowkillnum;//表示这一轮被杀死的角色号码
var Nowkillrole;//表示这一轮被杀死的角色身份
var playerstates = JSON.parse(sessionStorage.getItem('playerstates'));
sessionStorage.setItem('playerstates', JSON.stringify(playerstates));
/////////////////////////////////////////////


var days = JSON.parse(sessionStorage.getItem('days'));
$('#days').text('第' + days + '天');
if (days > 1){ 
for (var i=1; i<days; i++){    
    Thekillnum = (bekiller[i-1]).num;
    Thekillrole = (bekiller[i-1]).role;
    Thevotenum = (bevoteer[i-1]).num;
    Thevoterole = (bevoteer[i-1]).role;
    var mainbox1 = '<div class=\"main-box1\">\n' +
                        '<div class=\"main-top1\">第' + i + '天</div>\n' +
                        '<div class=\"main-bottom1\">\n' +
                            '<div class=\"main-left1\"></div>\n' +
                            '<div class=\"theMoom1\"></div>\n' +
                            '<div class=\"theSun1\"></div>\n' +
                            '<div class=\"main-right1\">\n' +
                                '<div class=\"right-box1\">\n' +
                                    '<div class=\"right-arrow1\" id=\"Onearrow1\"></div>\n' +
                                    '<div class=\"One1 right-text1\">杀手杀人</div>\n' +
                                '</div>\n' +
                                '<div class=\"right-box1\">\n' +
                                    '<div class=\"One1 right-text12\">昨晚' + Thekillnum + '号被杀，真实身份是' + Thekillrole + '</div>\n' +
                                '</div>\n' +
                                '<div class=\"right-box1\">\n' +
                                    '<div class=\"right-arrow1\" id=\"Twoarrow1\"></div>\n' +
                                    '<div class=\"Two1 right-text1\">亡灵发表遗言</div>\n' +
                                '</div>\n' +
                                '<div class=\"right-box1\">\n' +
                                    '<div class=\"right-arrow1\" id=\"Threearrow1\"></div>\n' +
                                    '<div class=\"Three1 right-text1\">玩家依次发言</div>\n' +
                                '</div>\n' +
                                '<div class=\"right-box1\">\n' +
                                    '<div class=\"right-arrow1\" id=\"Fourarrow1\"></div>\n' +
                                    '<div class=\"Four1 right-text1\">全民投票</div>\n' +
                                '</div>\n' +
                                '<div class=\"right-box1\">\n' +
                                    '<div class=\"right-text11\" >昨晚' + Thevotenum +  '号被杀，真实身份是' + Thevoterole +  '</div>\n' +
                                '</div>\n' +
                            '</div>\n' +    
                        '</div>\n' +
                        '</div>'

    $('.main-box').before(mainbox1);
    $('.main-bottom1').hide();
}
}
$('.main-box1').click(function(){
    var thedays = $(this).index();//var一个变量来存储当前点击项的下标
    var thebottom = $('.main-bottom1');
    $(thebottom[thedays]).slideToggle();
})
/////////////////////////////////////////////


var thestates;//var一个变量来存储当前状态
var aaa = sessionStorage.getItem('step');//var一个变量来存储storage的值
if (aaa == null){//假如storage里面是空，就让aaa等于kill
    thestates = 'kill';
}else{//假如storage里面已经有了值，那么就让aaa等于这个值
    thestates = aaa;
}

var fsm = {
    state: thestates,
    tokill: function(){
        switch(thestates){
            case'kill':
            console.log(2);
                alert('杀手开始杀人');
                thestates = 'dead';
                sessionStorage.setItem('step', 'dead');
                $('#Onearrow').css('border-color', 'transparent #82af9a transparent transparent');
                $('.One').css('backgroundColor', '#82af9a');
                location.href = 'JSDemo2-6.html';
                break;
            case'dead':
            case'speak':
            case'vote':
                alert('请按照游戏步骤进行');
                break;
        }
    },
    todead: function(){
        switch(thestates){
            case'dead':
            console.log(3);
                alert('发表遗言');
                thestates = 'speak';
                sessionStorage.setItem('step', 'speak');
                $('#Twoarrow').css('border-color', 'transparent #82af9a transparent transparent');
                $('.Two').css('backgroundColor', '#82af9a');

                break;
            case'dead':
            case'kill':
            case'vote':
                alert('请按照游戏步骤进行');
                break;
        }
    },
    tospeak: function(){
        switch(thestates){
            case'speak':
                alert('开始讨论');
                thestates = 'vote';
                sessionStorage.setItem('step', 'vote');
                $('#Threearrow').css('border-color', 'transparent #82af9a transparent transparent');
                $('.Three').css('backgroundColor', '#82af9a');
                break;
            case'dead':
            case'kill':
            case'vote':
                alert('请按照游戏步骤进行');
                break;
        }
    },
    tovote: function(){
        switch(thestates){
            case'vote':
                alert('全民投票');
                thestates = 'kill';
                sessionStorage.setItem('step', 'kill');
                location.href = 'JSDemo2-6.html';
                break;
            case'dead':
            case'speak':
            case'kill':
                alert('请按照游戏步骤进行');
                break;
        }
    }
}
$('.One').click(function(){
    fsm.tokill();
})
$('.Two').click(function(){
    fsm.todead();
})
$('.Three').click(function(){
    fsm.tospeak();
})
$('.Four').click(function(){
    fsm.tovote();
})


if (thestates == 'dead'){//刷新之后根据当前保持的状态来让按钮变灰色
    Nowkillnum = (bekiller[days-1]).num;
    Nowkillrole = (bekiller[days-1]).role;
    $('.right-box111').show();
    $('#realnum').text(Nowkillnum);
    $('#realid').text(Nowkillrole);
    $('.theSun').css('top', '2.64rem');
    $('#Onearrow').css('border-color', 'transparent #82af9a transparent transparent');
    $('.One').css('backgroundColor', '#82af9a');
    thestates = 'dead';
}else if (thestates == 'speak'){//刷新之后根据当前保持的状态来让按钮变灰色
    Nowkillnum = (bekiller[days-1]).num;
    Nowkillrole = (bekiller[days-1]).role;
    $('.right-box111').show();
    $('#realnum').text(Nowkillnum);
    $('#realid').text(Nowkillrole);
    $('.theSun').css('top', '2.64rem');
    $('#Onearrow').css('border-color', 'transparent #82af9a transparent transparent');
    $('.One').css('backgroundColor', '#82af9a');
    $('#Twoarrow').css('border-color', 'transparent #82af9a transparent transparent');
    $('.Two').css('backgroundColor', '#82af9a');
    thestates = 'speak';
}else if (thestates == 'vote'){//刷新之后根据当前保持的状态来让按钮变灰色
    Nowkillnum = (bekiller[days-1]).num;
    Nowkillrole = (bekiller[days-1]).role;
    $('.right-box111').show();
    $('#realnum').text(Nowkillnum);
    $('#realid').text(Nowkillrole);
    $('.theSun').css('top', '2.64rem');
    $('#Onearrow').css('border-color', 'transparent #82af9a transparent transparent');
    $('.One').css('backgroundColor', '#82af9a');
    $('#Twoarrow').css('border-color', 'transparent #82af9a transparent transparent');
    $('.Two').css('backgroundColor', '#82af9a');
    $('#Threearrow').css('border-color', 'transparent #82af9a transparent transparent');
    $('.Three'  ).css('backgroundColor', '#82af9a');
    thestates = 'vote';
}
////////////////////////////////////////////////


$(document).ready(function(){
    $('.back-arrow').click(function(){
        var a = confirm('是否返回法官查看页');
        if (a == true){
            location.href = 'JSDemo2-4.html';
        }
    })
    $('.close').click(function(){
        var a = confirm('是否返回首页');
        if (a == true){
            sessionStorage.clear();
            location.href = 'JSDemo2-1.html';
        }
    })
    $('.bottom-left').click(function(){
        var a = confirm('是否结束游戏');
        if (a == true){
            location.href = 'JSDemo2-8.html';
        }
    })
    $('.bottom-right').click(function(){
        location.href = 'JSDemo2-7.html';
    })
})