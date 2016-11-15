

function ProgressBar(option){
    this._init(option);
}


ProgressBar.prototype = {
    _init: function(option){
        this.x = option.x || 0;
        this.y = option.y || 0;
        this.width = option.width || 10;
        this.height = option.height || 10;

        this.opacity = option.opacity == 0 ? 0:(option.opacity || 1);

        this.fill = option.fill || 'red';
        this.stroke = option.stroke || 'blue';

        var innerRect = new Konva.Rect({
            x: this.x,
            y: this.y,
            width: 0,
            height: this.height,
            fill: this.fill,
            cornerRadius: 1/4 * this.height,
            id: 'innerRect'
        });
        //this.innerRect = innerRect;

        var outerRect = new Konva.Rect({
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height,
            stroke: this.stroke,
            cornerRadius: 1/4 * this.height
        });
        //this.outerRect = outerRect;

        this.group = new Konva.Group({
            x: 0,
            y: 0
        });

        this.group.add(innerRect);
        this.group.add(outerRect);
    },

    addToGroupOrLayer: function(layer){
        layer.add(this.group);
    },

    changeValue: function(val){
        if(val > 1){
            val /= 100;
        }
        var width = val * this.width;

        var innerRect = this.group.findOne('#innerRect');
        //this.innerRect = innerRect;

        innerRect.to({
            width: width,
            duration: 0.8,
            easing: Konva.Easings.EasIn
        });
    }



};