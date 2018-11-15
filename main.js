"use strict";

class gallery {

    getStart() {

                // Iniate properties and start methods

            //Load pictures to the lill pic array and html

        this.picPathArr = ["pic/background.jpg", "pic/background1.jpg", "pic/background2.png"];
        this.littlePics = gallery.getElemsByClass(".littleImg");
        for (let i = 0; i < this.picPathArr.length; i++) {
            this.littlePics[i].src = this.picPathArr[i];
        }

            //Main properties

        this.mainDiv = gallery.getElemsByClass(".main_pic");

        /*Hide lill pic block if necessary
        gallery.getElemsByClass(".lill_pic")[0].style.display = "none";*/

        this.defaultPic = {value: 0, paused: false};
        this.xD = 0;
        this.xU = 0;

            //Start execution

        this.picEvents();
        this.intervalChange(this.mainDiv[0], this.picPathArr);
    }

            //Event list

        //Lill pic click

    picEvents() {
        document.addEventListener("click", (e) => {
            if (e.target.matches(".littleImg")) {
                this.changeByClick(Number(e.target.dataset.count));
            }
        });

        //Button(left-right) click

        document.addEventListener("click",(e)=>{
            if (e.target.matches(".button")) {
                this.changeByButton(e.target);
            }
        });

        //Swype

        document.addEventListener("mousedown", (e) => {
            if (e.target.matches(".main_pic"))this.xD = (e.clientX);
        });

        document.addEventListener("mouseup", (e) => {
            if (e.target.matches(".main_pic")){
                this.xU = (e.clientX);
                this.changeBySwype();
            }
        });

        //Pause (mouse over the main pic) initiation

        this.mainDiv[0].addEventListener("mouseenter", () => {
            this.defaultPic.paused = true;
        });

        this.mainDiv[0].addEventListener("mouseleave", () => {
            this.defaultPic.paused = false;
        })
    }

            //Main changes methods

        //Permanent change by time-interval

    intervalChange(div, pics) {
        let dP = this.defaultPic;
        let picArrForOpacity = this.littlePics;
        this.littlePics[dP.value].style.opacity=1;
        setInterval(function () {
            if (dP.paused) return;
            else {
                dP.value++;
                if (dP.value < 0 || dP.value > 2) dP.value = 0;
                div.style.backgroundImage = "url(" + pics[dP.value] + ")";
                gallery.changeLinesOperation(picArrForOpacity,dP.value);
            }
        }, 5000);
    }

        //Change by lill pic click

    changeByClick(i) {
        this.mainDiv[0].style.backgroundImage = "url(" + this.littlePics[i].src + ")";
        this.defaultPic.value = i;
        gallery.changeLinesOperation(this.littlePics,i);
    }

        //Change by button click

    changeByButton(button){
        button.className==="button right"?this.picMoveToTheRight():this.picMoveToTheLeft();
    }

        //Methods wich change picture from left to right and back

    picMoveToTheRight(){
        this.defaultPic.value++;
        if (this.defaultPic.value >= 3) this.defaultPic.value = 0;
        this.mainDiv[0].style.backgroundImage = "url(" + this.littlePics[this.defaultPic.value].src + ")";
        gallery.changeLinesOperation(this.littlePics,this.defaultPic.value);
    }

    picMoveToTheLeft(){
        this.defaultPic.value--;
        if (this.defaultPic.value === -1) this.defaultPic.value = 2;
        this.mainDiv[0].style.backgroundImage = "url(" + this.littlePics[this.defaultPic.value].src + ")";
        gallery.changeLinesOperation(this.littlePics,this.defaultPic.value);
    }

        //Change by swype

    changeBySwype() {
        this.xD < this.xU?this.picMoveToTheRight():this.picMoveToTheLeft();
    }

            //Static methods

    static getElemsByClass(elem) {
        return document.querySelectorAll(elem);
    }

        //Lill pics opacity changes

    static opacityChange(picArr,i){
        for (let j=0;j<picArr.length;j++){
            j===i?picArr[j].style.opacity=1:picArr[j].style.opacity=0.8;
        }
    }

        //Lines changes

    static changeLinesOperation(picArr,pickedIndex) {
        gallery.opacityChange(picArr,pickedIndex);
        let lines = gallery.getElemsByClass(".lines>div");
        for (let i = 0; i < lines.length; i++) {
            if (i === pickedIndex && lines[i].className === "line")lines[i].className = "underline";
            else lines[i].className = "line";
        }
    }
}

let pic = new gallery();
window.addEventListener("load", function () {
    pic.getStart();
})