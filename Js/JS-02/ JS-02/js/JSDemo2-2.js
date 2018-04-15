'use strict';

var numberInput = document.getElementById('numberInput');
var numberRange = document.getElementById('numberRange');
var killer;
var people;

function getNumber(){//取值范围
    if (numberInput.value <=18 && numberInput.value >=4){
        numberRange.value = numberInput.value;
    } else {
        alert('请输入正确的玩家数量');
    }
}
function changeNumber(){//轮组数字与输入数值的同步
    numberInput.value = numberRange.value;
}
function btnSub(){//减号按钮
    numberInput.value--;
    if(numberRange.value == 4){
        alert('再少就不能浪拉');
        numberInput.value = 4;
    } else {
        numberRange.value = numberInput.value;
    }
}
function btnAdd(){//加号按钮
    numberInput.value++;
    if(numberRange.value == 18){
        alert('再多就浪不了了');
        numberInput.value = 18;
    } else {
        numberRange.value = numberInput.value;
    }
}

$('.right-bottom').click(function(){//点击按钮，分布身份
    var x, y, z;
    x = numberInput.value;
    if (x <= 5){
        y = 1;
        z = x - y;
    }else if (x <= 8){
        y = 2;
        z = x - y;
    }else if (x <= 11){
        y = 3;
        z = x - y;
    }else if (x <= 14){
        y = 4;
        z = x - y;
    }else if (x <= 18){
        y = 5;
        z = x - y;
    }
    killer = y;
    people = z;
    $('#killer').text(killer);
    $('#people').text(people);

    sessionStorage.setItem('killer', JSON.stringify(killer));
    sessionStorage.setItem('people', JSON.stringify(people));

})



$('.bottom').click(function(){
    var c;//num是为了防止滑块数量与点击设置的数量不符而设置的
    var a = JSON.parse(sessionStorage.getItem('killer'));
    var b = JSON.parse(sessionStorage.getItem('people'));
    c = a + b;
    //console.log(a);
    //console.log(b);
    //console.log(c);
    if (c == numberInput.value){
        location.href = 'JSDemo2-3.html';
    } else {
        alert('人数不符阿亲，请重新设置玩家人数');
    }
})

