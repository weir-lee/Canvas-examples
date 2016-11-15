

function Sprite(option){
    this._init(option);
}

Sprite.prototype = {
    // 初始化
    _init: function(option){
        this.src = option.src;
        this.frameIndex = option.frameIndex;
        this._dirIndex = 0;
        this.fps = option.fps;
        this.sImgW = option.sImgW || 40;
        this.sImgH = option.sImgH || 65;
        this.x = option.x===0 ? 0:(option.x||10);
        this.y = option.y===0 ? 0:(option.y||10);
        this.drawW = option.drawW || 40;
        this.drawH = option.drawH || 65;
    },
    render: function(ctx){
        var img = new Image();
        img.src = this.src;
        //console.log(this); // this===Sprite
        var self = this;
        img.onload = function(){
            //console.log(this); //this===img
            setInterval(function(){
                //console.log(this); //this===window
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img
                    , self.frameIndex * self.sImgW, self._dirIndex * self.sImgH
                    , self.sImgW, self.sImgH
                    , self.x, self.y
                    , self.drawW, self.drawH
                );
                //console.log(self.x);
                self.frameIndex++;
                self.frameIndex %= 4;
            }, 1000/self.fps);
        };
    },
    changeDirect: function(direction){
        if(direction == 'left'){
            this._dirIndex = 1;
        }
        if(direction == 'right'){
            this._dirIndex = 2;
        }
        if(direction == 'back'){
            this._dirIndex = 3;
        }
        if(direction == 'front'){
            this._dirIndex = 0;
        }
    }
};
