window.onload = function() {
    mv.app.textChange();
    mv.app.slideShow();
    mv.app.select();
    mv.app.gallery();
}

// ======================== 命名空间 ========================
let mv = {};

// ======================== 底层 =========================

mv.tools = {};

mv.tools.getByClass = function(oParent,childClassName) {
    var aEles = oParent.getElementsByTagName('*');
    var classes = [];

    for(var i=0; i<aEles.length; i++) {
        if(aEles[i].className === childClassName) {
            classes.push(aEles[i]);
        }
    }

    return classes;
}

mv.tools.getStyle = function(obj,attr) {
    if(obj.currentStyle){
        return obj.currentStyle[attr];
    } else {
        return getComputedStyle(obj,false)[attr];
    }
}




// ======================== 组件 ========================

mv.ui = {};

mv.ui.textChange = function(obj,str) {
    obj.onfocus = function() {
        if(obj.value === str) {
            obj.value = '';
        }
    }

    obj.onblur = function() {
        if(obj.value === '') {
            obj.value = str;
        }
    }
}

mv.ui.fadeIn = function(obj) {
    let imgStyle = mv.tools.getStyle(obj,'opacity');
    if(imgStyle === 1) {
        return;
    }

    let value = 0;
    let iSpeed = 5;
    // 注意：这里你需要使用 obj.timer 首先你要提前清除 timer 所以不可以使用 let
    // 如果你使用 var 的话，timer 就成为了一个全局变量，造成了混乱
    clearInterval(obj.timer);
    obj.timer = setInterval(function(){

        value += iSpeed;
        obj.style.opacity = value/100;
        obj.style.filter = 'alpha(opacity='+value+')';

        if(obj.style.opacity === 1) {
            clearInterval(obj.tiemr);
        }
    },30)
}

mv.ui.fadeOut = function(obj) {
    let imgStyle = mv.tools.getStyle(obj,'opacity');
    if(imgStyle === 0) {
        return;
    }

    let value = 100;
    let iSpeed = -5;
    clearInterval(obj.timer);
    obj.timer = setInterval(function(){

        value += iSpeed;
        obj.style.opacity = value/100;
        obj.style.filter = 'alpha(opacity='+value+')';

        if(obj.style.opacity === 0) {
            clearInterval(obj.timer);
        }
    },30)
}

mv.ui.prev = function(obj,distance) {

}

mv.ui.next = function(obj,distance) {

}

// ======================== 应用 ========================

mv.app = {};

mv.app.textChange = function() {

    let searchText = document.getElementsByClassName('searchText');

    for(let i=0; i<searchText.length; i++) {
        mv.ui.textChange(searchText[i],'Search website');
    }
}

mv.app.slideShow = function() {
    let oSlide = document.getElementById('slideShow');
    let aLis = oSlide.getElementsByTagName('li');

    var timer = setInterval(auto,3000);
    let iNow = 0;
    let len = aLis.length;

    function auto() {
        if (iNow === len-1) {
			iNow = 0;
		} else {
			iNow++;
		}

		for(var i=0; i<len; i++) {
			mv.ui.fadeOut(aLis[i]);
		}

		mv.ui.fadeIn(aLis[iNow]);
    }
}

mv.app.select = function() {
    let oSelect = document.getElementById('select');
    let aDd = oSelect.getElementsByTagName('dd');
    let aH2 = oSelect.getElementsByTagName('h2');
    let aA = oSelect.getElementsByTagName('a');
    let aUl = oSelect.getElementsByTagName('ul');
    let len = aH2.length;

    for(let i=0; i<len; i++) {
        aH2[i].index = i;
        aA[i].index = i;

        function clickFunc(obj) {
            obj.onclick= function(ev) {
                var ev = ev || window.event;
                if(aUl[this.index].style.display == 'block') {
                   aUl[this.index].style = 'none';
               } else {
                   for(let i=0; i<len; i++) {
                       aUl[i].style.display = 'none';
                   }
                   aUl[this.index].style.display = 'block';

                   document.onclick = function() {
                       for(let i=0; i<len; i++) {
                           aUl[i].style.display = 'none';
                       }
                   }

                    ev.cancelBubble = true;
               }
               }

        }

        clickFunc(aH2[i]);
        clickFunc(aA[i]);

    }
}

mv.app.gallery = function() {
    let oGallery = document. getElementById('scroll_list');

}

















































// space
