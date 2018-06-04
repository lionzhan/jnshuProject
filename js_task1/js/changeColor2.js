var App = function () {
    this.change = true; //判断程序是否继续变色；
    this.queue = false; //判断程序是否在变色；
    this.gridCache = []; //存储格子的下标
    this.colorCache = []; //存储不同的颜色
};

App.prototype = {
    setDefaultColor: function () {

        var self=this;
        //把gridCache里面对应的格子变回默认颜色
        this.gridCache.forEach(function (item) {
            self.grids[item].style.backgroundColor = self.defaultColor;
        });
        //清空缓存
        this.gridCache = [];
        this.colorCache = [];
    },
    /**
     * startChange:开始变颜色
     */
    startChange: function () {
        var self = this;
        //1.判断程序是否已经在变色了
        if (this.queue) { //已经在变色
            return false;
        }


        //开始变色
        this.queue = true; //设置程序已经在变色
        (function changeColor() {

            //把gridCache里面对应的格子变回默认颜色,清空两个缓存
            self.setDefaultColor.call(self);

            //随机获取三个不同的格子, 存储到 self.gridCache
            pushCache(self.gridCache, self.count, function () {
                return randomNum(self.grids.length - 1);
            });

            //随机获取三个不同的颜色, 存储到 self.colorCache
            pushCache(self.colorCache, self.count, function () {
                return randomHexColor();
            });



            //变换三个格子的颜色
            for (let i = 0; i < self.count; i++) {
                self.grids[self.gridCache[i]].style.backgroundColor = self.colorCache[i];
            }
            //判断程序是否继续变色
            if (self.change) {
                setTimeout(changeColor, 1000);
            }else{
                self.setDefaultColor.call(self);
                self.change=true;
                self.queue=false;
            }
        })();


        //添加缓存
        function pushCache(cache, length, itemFunc) {
            while (cache.length < length) {
                let item = itemFunc();
                if (cache.indexOf(item) >= 0) {
                    continue;
                }
                cache.push(item);
            }
        }
        //随机生成一个[0,num]的随机整数
        function randomNum(num) {
            return Math.floor(Math.random() * (num + 1));
        }

        //随机生成十六进制颜色
        function randomHexColor() {
            var hex = randomNum(16777215).toString(16); //生成ffffff以内16进制数
            while (hex.length < 6) { //while循环判断hex位数，少于6位前面加0凑够6位
                hex = '0' + hex;
            }
            return '#' + hex; //返回‘#'开头16进制颜色
        }
    }
};




/**
 * 创建程序
 */
var app = new App();
app.grids = document.getElementsByClassName("box");
app.defaultColor = "orange";//设置默认格子颜色
app.count = 3; //设置变化的格子数量

/**
 * init:程序初始化
 * 1.绑定两个按钮点击事件
 */
app.init = function () {
    var startBtn = document.getElementById('startBtn'),
        stopBtn = document.getElementById('stopBtn'),
        self = this;

    //绑定两个按钮点击事件
    startBtn.onclick = self.startChange.bind(self);

    stopBtn.onclick = function () {
        self.change = false;
    };


};

app.init(); //程序初始化,运行