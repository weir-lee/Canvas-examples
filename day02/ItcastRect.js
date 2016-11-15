
function ItcastRect(option){
    this._init(option);
}

ItcastRect.prototype= {
    _init: function(option){
        this.x = option.x || 0;
        this.y = option.y || 0;
        this.w = option.w || 0;
        this.h = option.h || 0;
        this.rotation = option.rotation || 0;
        this.opacity = option.opacity===0 ? 0 : (option.opacity || 1);
        this.scaleX = option.scaleX || 1;
        this.scaleY = option.scaleY || 1;
        this.strokeStyle = option.strokeStyle || 'red';
        this.fillStyle = option.fillStyle || 'blue';
    },
    render: function(ctx){
        ctx.save();
        ctx.beginPath();

        ctx.translate(this.x, this.y); //画布整体位移
        ctx.rotate(this.rotation * Math.PI / 180);
        ctx.scale(this.scaleX, this.scaleY);
        ctx.globalAlpha = this.opacity;

        ctx.rect(this.x, this.y, this.w, this.h);

        ctx.strokeStyle = this.strokeStyle;
        ctx.stroke();

        ctx.fillStyle = this.fillStyle;
        ctx.fill();

        ctx.restore();
    }
};
