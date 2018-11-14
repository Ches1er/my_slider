"use strict";

class gallery {

    static getElemsByClass(elem) {
        return document.querySelectorAll(elem);
    }

    getStart() {
        //
        this.picPathArr = ["pic/background.jpg", "pic/background1.jpg", "pic/background2.png"];
        this.littlePics = gallery.getElemsByClass(".littleImg");
        for (let i = 0; i < this.picPathArr.length; i++) {
            this.littlePics[i].src = this.picPathArr[i];
        }

        this.mainDiv = gallery.getElemsByClass(".main_pic");
        this.defaultPic = {value: 0, paused: false};
        this.xD = 0;
        this.xU = 0;
        this.picEvents();
        this.intervalChange(this.mainDiv[0], this.picPathArr);
    }

    picEvents() {
        document.addEventListener("click", (e) => {
            if (e.target.matches(".littleImg")) {
                this.changeByClick(Number(e.target.dataset.count));
            }
        });

        this.mainDiv[0].addEventListener("mousedown", (e) => {
            this.xD = (e.clientX);
        });

        this.mainDiv[0].addEventListener("mouseup", (e) => {
            this.xU = (e.clientX);
            this.changeBySwype();
        });

        this.mainDiv[0].addEventListener("mouseenter", () => {
            this.defaultPic.paused = true;
        });

        this.mainDiv[0].addEventListener("mouseleave", () => {
            this.defaultPic.paused = false;
        })
    }

    intervalChange(div, pics) {
        let dP = this.defaultPic;
        setInterval(function () {
            if (dP.paused) return;
            else {
                dP.value++;
                if (dP.value < 0 || dP.value > 2) dP.value = 0;
                div.style.backgroundImage = "url(" + pics[dP.value] + ")";
                gallery.changeLinesOperation(dP.value);
            }
        }, 5000);
    }

    changeByClick(i) {
        this.mainDiv[0].style.backgroundImage = "url(" + this.littlePics[i].src + ")";
        this.defaultPic.value = i;
        gallery.changeLinesOperation(i);
    }

    changeBySwype() {
        if (this.xD < this.xU) {
            this.defaultPic.value++;
            if (this.defaultPic.value >= 3) this.defaultPic.value = 0;
            this.mainDiv[0].style.backgroundImage = "url(" + this.littlePics[this.defaultPic.value].src + ")";
            gallery.changeLinesOperation(this.defaultPic.value);

        }
        else {
            this.defaultPic.value--;
            if (this.defaultPic.value === -1) this.defaultPic.value = 2;
            this.mainDiv[0].style.backgroundImage = "url(" + this.littlePics[this.defaultPic.value].src + ")";
            gallery.changeLinesOperation(this.defaultPic.value);
        }
    }

    static changeLinesOperation(pickedIndex) {
        let lines = gallery.getElemsByClass(".lines>div");
        for (let i = 0; i < lines.length; i++) {
            if (i === pickedIndex && lines[i].className === "line") {
                lines[i].className = "underline";
            }
            else lines[i].className = "line";
        }
    }
}

let pic = new gallery();
window.addEventListener("load", function () {
    pic.getStart();
})