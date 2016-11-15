
/* 饼状图 */
function Pie(option){
    this._init(option);
}

Pie.prototype = {
    _init: function(option){
        this.x = option.x;
        this.y = option.y;
        this.radius = option.radius;
        this.data = option.data;
        this.group = new Konva.Group({
            x: this.x,
            y: this.y
        });

        var x0 = 0, y0 = 0, data = this.data;
        var tempAngle = -90;
        var self = this;
        data.forEach(function(item,index){
            var angle = 360*item.value;
            var wedge = new Konva.Wedge({
                x: x0,
                y: y0,
                radius: self.radius,
                fill: item.color,
                angle: angle,
                rotation: tempAngle
            });
            self.group.add(wedge);

            var textAngle = tempAngle+angle/2;
            var text = new Konva.Text({
                x: x0 + 120 * Math.cos(Math.PI*textAngle/180),
                y: y0 + 120 * Math.sin(Math.PI*textAngle/180),
                text: item.name,
                fill: item.color
            });
            if(textAngle > 90 && textAngle < 270){
                text.x(text.x()-text.getWidth());
            }
            tempAngle += angle;
            self.group.add(text);
        });
    },

    addToGroupOrLayer : function(arg){
        arg.add(this.group);
    },

    play: function(){
        var wedges = this.group.find('Wedge');
        wedges.each(function(item, index){
            item.angle(0);
        });
        var index = 0;
        var self = this;
        wedges[index].to({
            duration: self.data[index].value * 2,
            angle: 360 * self.data[index].value,
            onFinish: function(){
                index++;
                if(index >= self.data.length){
                    return;
                }
                self.play();
            }
        });
    }
};