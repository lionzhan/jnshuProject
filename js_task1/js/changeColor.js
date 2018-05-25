//获取随机整数[s,e];比如[0,8]
function ranNumber(s, e) {
    e += 1;
    var num = Math.floor(Math.random() * (e - s) + s);
    return num;
}

//获取十六位进制随机颜色
function ranColor() {
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += ranNumber(0, 15).toString(16);
    }
    return color;
}


var App = function () {
    this.continueChange = true; //判断是否继续变色
    this.queue = false; //判断当前程序是否在变色
    this.color_cache = [];
    this.num_cache = [];
    this.grids=document.getElementsByClassName("box");
};

App.prototype = {
    resetColor: function () {
        var self = this;
        //根据 num_cache 恢复对应格子的默认颜色
        this.num_cache.forEach(function (item) {
            self.grids[item].style.backgroundColor = "orange";
        });
        //重置两个 cache 
        this.color_cache = [];
        this.num_cache = [];
    },
    changeColor: function () {
        var self = this;
        var item;

        //恢复默认颜色
        this.resetColor();

        //随机获取三个不同的颜色存入 this.color_cache
        while (this.color_cache.length < 3) {
            item = ranColor();
            if (this.color_cache.indexOf(item) >= 0) {
                continue;
            }
            this.color_cache.push(item);
        }
        //随机获取三个不同的数字存入 this.num_cache
        while (this.num_cache.length < 3) {
            item = ranNumber(0, 8);
            if (this.num_cache.indexOf(item) >= 0) {
                continue;
            }
            this.num_cache.push(item);
        }
        //根据颜色和数字给对应的DOM变色
        for(var i=0;i<3;i++){
            this.grids[this.num_cache[i]].style.backgroundColor=this.color_cache[i];
        }

        /**
         * 1.判断是否继续变色
         * 2.继续变色：设置一秒后变色
         * 3.退出变色：恢复默认颜色；设置当前程序没有在变色
         */
        if (this.continueChange) {
            

            //设置一秒后变色
            setTimeout(function () {
                self.changeColor();
            }, 1000);
        } else {
            //恢复默认颜色
            this.resetColor();

            //设置当前程序没有在变色
            this.queue = false;
        }


    },
    startChange: function () {
        console.log(this);
        /**
         * 1.判断是否已经在变色了。
         * 2.如果已经在变色，不改变现在的状态,跳出函数
         * 3.如果没有在变色，就开始变色
         */
        if (this.queue) {
            return false;
        }

        //变色
        this.queue = true;
        this.continueChange=true;
        // console.log(this);
        this.changeColor();



    },
    stopChange: function () {
        //停止变色
        this.continueChange = false;
    },
    start: function () {
        var startBtn = document.getElementById("startBtn");
        var stoptBtn = document.getElementById("stopBtn");
        var self=this;
        //绑定两个按钮的click事件
        startBtn.onclick = function(){
            self.startChange();  //开始变色
        }; 
        stopBtn.onclick = function(){
            self.stopChange(); //停止变色
        }; 
    }
}

var app = new App();
app.start(); //程序运行