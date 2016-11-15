
function HistgramChart(option){
    this._init(option);
}

HistgramChart.prototype = {
    _init: function(option){
        this.x = option.x; //柱状图坐标系原点
        this.y = option.y;
        this.w = option.w;  //柱状图最大宽度
        this.h = option.h;  //柱状图最大高度
        this.data = option.data;

        var x0 = 0, y0 = 0, maxWidth = this.w, maxHeight = this.h;
        //创建最大的图表组
        this.group = new Konva.Group({
            x: this.x,
            y: this.y
        });
        //创建矩形组
        this.rectGroup = new Konva.Group({
            x: 0,
            y: 0
        });
        //创建文字组
        this.topTextGroup = new Konva.Group({
            x: 0,
            y: 0
        });
        //创建文字组
        this.botTextGroup = new Konva.Group({
            x: 0,
            y: 0
        });

        //绘制基线
        this.bsLine = new Konva.Line({
            points: [x0, y0, x0+maxWidth, y0],
            strokeWidth: 1,
            stroke: 'lightgreen'
        });
        this.group.add(this.bsLine);

        //绘制柱状图
        data = this.data;
        var rectWidth = maxWidth/data.length;
        var self = this;
        data.forEach(function(item, index){
            var rect = new Konva.Rect({
                x: x0 + (index + 1/4) * rectWidth, //安装组内的坐标系
                y: y0 - maxHeight * item.value,
                width: 1/2 * rectWidth,
                height: maxHeight * item.value,
                fill: item.color,
                cornerRadius: 1/12 * rectWidth,
                shadowBlur: 10,
                shadowColor: '#000',
                opacity: 0.8
            });
            self.rectGroup.add(rect);

            var topText = new Konva.Text({
                text: item.value * 100 + '%',
                fontSize: 12,
                x: x0 + index*rectWidth,
                y: y0 - maxHeight * item.value - 12,
                width: rectWidth,
                align: 'center',
                fill: item.color,
                name: 'topText'
            });
            self.topTextGroup.add(topText);

            var botText = new Konva.Text({
                text: item.name,
                fontSize: 12,
                x: x0 + (1/4 + index) *rectWidth,
                y: y0,
                fill: item.color,
                rotation: 30,
                name: 'botText'
            });
            self.botTextGroup.add(botText);
        });
        this.group.add(this.rectGroup);
        this.group.add(this.botTextGroup);
        this.group.add(this.topTextGroup);
    },

    addToGroupOrLayer: function(arg){
        arg.add(this.group);
    },

    playAnimation: function(){
        var self = this;
        this.rectGroup.getChildren().each(function (item, index) {
            item.height(0);
            item.y(0);

            item.to({
                duration: 1,
                height: self.h*data[index].value,
                y: -self.h*data[index].value
            });
        });

        this.topTextGroup.getChildren().each(function(item, index){
            item.y(-12);

            item.to({
                duration: 1,
                y: -self.h*data[index].value - 12
            });
        });
    }

}
