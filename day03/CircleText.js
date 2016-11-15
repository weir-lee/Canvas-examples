
function CircleText(option){
    this._init(option);
}

CircleText.prototype = {
    _init: function(option){
        this.innerRadius = option.innerRadius || 0; //内圆半径
        this.outerRadius = option.outerRadius || 0; //外圆半径
        this.x = option.x || 0; // 圆心点坐标
        this.y = option.y || 0;
        this.innerStyle = option.innerStyle || 'red';
        this.outerStyle = option.outerStyle || 'blue';
        this.text = option.text || 'canvas';

        //创建一个组，把内圆、圆环、文字添加到组上，当作一个整体
        this.group = new Konva.Group({
            x: this.x, //组的坐标
            y: this.y
        });

        this.innerCircle = new Konva.Circle({
            x: 0,  // 设置组的x,y后，组内元素按照组内新坐标系定位  相对组的原点的坐标
            y: 0,
            radius: this.innerRadius,
            fill: this.innerStyle,
            opacity: 0.8
        });

        this.outerRing = new Konva.Circle({
            x: 0,
            y: 0,
            innerRadius: this.innerRadius,
            outerRadius: this.outerRadius,
            fill: this.outerStyle,
            opacity: 0.5
        });

        this.text = new Konva.Text({
            x: 0 - this.innerRadius,
            y: -6,
            width: this.innerRadius * 2,
            align: 'center',
            text: this.text,
            fill: '#fff',
            fontWeight: 'bold'
        });

        this.group.add(this.innerCircle);
        this.group.add(this.outerRing);
        this.group.add(this.text);
    },

    //把组添加到其他层或组
    addToGroupOrLayer: function(arg){
        arg.add(this.group);
    }
};