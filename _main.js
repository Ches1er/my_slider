"use strict";

let events = function () {

    let $picks=$("img");
    let $mainPick=$(".main_pic");
    let $lines=$(".lines");
    let xD="";
    let yD="";
    let def_pic = 0;

    $picks.on("click",(e)=>{
        $mainPick.css("backgroundImage","url("+e.currentTarget.src+")");
        changeLines(e.currentTarget.dataset.count);
    });

    $mainPick.on("mousedown",(e)=>{
        xD = e.clientX;

    })
    $mainPick.on("mouseup",(e)=>{
        yD = e.clientX;
        changeBySwype();
    })
    
    let changeLines = function (count) {
        console.log(count);
        for (let i=0;i<$picks.length;i++){
            if (i===count && $lines.attr("class")==="line")
                $lines[i].className="underline";
            else $lines[i].className="line";
        }
    }

    let changeBySwype = function(){
        if (xD<yD){
            def_pic++;
            $mainPick.css("backgroundImage","url("+$picks[def_pic].src+")");
            if (def_pic===2)def_pic=-1;
        }
        else {
            def_pic--;
            if (xD>yD) $mainPick.css("backgroundImage","url("+$picks[def_pic+3].src+")");
            if (def_pic===-3)def_pic=0;
        }
    }


}


jQuery(document).ready(function () {
    events();
})