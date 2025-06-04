import {MoonCatWalk} from './mooncatWalk.js?v=2';

export const generator = (function () {
window.onload = function() {
    const cats = [];

    class Cat {
        constructor(tokenId, controlScheme='arrows'){
            this.tokenId = tokenId;
            this.controlScheme = controlScheme;
            this.spriteSheet = MoonCatWalk.generateMoonCatSpriteSheet(tokenId, 1);
            this.element = document.createElement('div');
            this.element.className = 'animation';
            this.element.style.backgroundImage = "url('" + this.spriteSheet + "')";
            document.getElementById('world').appendChild(this.element);

            this.walkIndex = 0;
            this.maxFrames = 8;
            this.offsetX = 100;
            this.offsetY = 100;
            this.direction = 6; // idle down
            this.jumping = false;
            this.jumpLength = 12;
            this.jumpCount = 0;
            this.jumpInc = 2;
            this.speed = 2;
            this.bounds = {xMin:-3,xMax:172,yMin:85,yMax:118};
        }

        step(){
            const x = this.walkIndex * 32;
            const y = this.direction * 32;
            if(this.direction === 0){
                this.offsetX += this.speed;
            } else if(this.direction === 1){
                this.offsetY -= this.speed;
            } else if(this.direction === 2){
                this.offsetY += this.speed;
            } else if(this.direction === 3){
                this.offsetX -= this.speed;
            }
            if(this.offsetX < this.bounds.xMin){
                this.offsetX = this.bounds.xMin;
            } else if(this.offsetX > this.bounds.xMax){
                this.offsetX = this.bounds.xMax;
            } else if(this.offsetY < this.bounds.yMin){
                this.offsetY = this.bounds.yMin;
            } else if(this.offsetY > this.bounds.yMax){
                this.offsetY = this.bounds.yMax;
            }
            if(this.jumping){
                if(this.jumpCount > this.jumpLength){
                    this.jumpInc = -2;
                }
                this.jumpCount += this.jumpInc;
                if(this.jumpCount === 0){
                    this.jumping = false;
                    this.jumpInc = 2;
                }
            }
            this.element.style.backgroundPosition = `-${x}px -${y}px`;
            this.element.style.left = this.offsetX + 'px';
            this.element.style.top = (this.offsetY - this.jumpCount) + 'px';
            this.walkIndex++;
            if(this.walkIndex >= this.maxFrames){
                this.walkIndex = 0;
            }
        }

        handleKeyDown(key){
            if(this.controlScheme === 'arrows'){
                if(key === 39){ this.direction = 0; }
                else if(key === 38){ this.direction = 1; }
                else if(key === 40){ this.direction = 2; }
                else if(key === 37){ this.direction = 3; }
                else if(key === 32){ this.jumping = true; }
            } else if(this.controlScheme === 'wasd'){
                if(key === 68){ this.direction = 0; }
                else if(key === 87){ this.direction = 1; }
                else if(key === 83){ this.direction = 2; }
                else if(key === 65){ this.direction = 3; }
                else if(key === 70){ this.jumping = true; }
            } else {
                if([37,38,39,40].includes(key)){
                    this.direction = Math.floor(Math.random()*4);
                }
                if(key === 32){ this.jumping = true; }
            }
        }

        handleKeyUp(key){
            if(this.controlScheme === 'arrows'){
                if(key === 39){ this.direction = 4; }
                else if(key === 38){ this.direction = 5; }
                else if(key === 40){ this.direction = 6; }
                else if(key === 37){ this.direction = 7; }
            } else if(this.controlScheme === 'wasd'){
                const map = {68:4,87:5,83:6,65:7};
                if(map[key] !== undefined){ this.direction = map[key]; }
            } else {
                if([37,38,39,40].includes(key)){
                    this.direction = 4 + Math.floor(Math.random()*4);
                }
            }
        }

        remove(){
            this.element.remove();
        }
    }

    function addCat(tokenId){
        const scheme = cats.length === 0 ? 'arrows' :
                       cats.length === 1 ? 'wasd' : 'random';
        const cat = new Cat(tokenId, scheme);
        cats.push(cat);
        const li = document.createElement('li');
        li.textContent = `#${tokenId} `;
        const btn = document.createElement('button');
        btn.textContent = 'Remove';
        btn.onclick = () => {
            removeCat(cat, li);
        };
        li.appendChild(btn);
        document.getElementById('catList').appendChild(li);
        document.getElementById('sprite_sheet').src = cat.spriteSheet;
    }

    function removeCat(cat, li){
        const idx = cats.indexOf(cat);
        if(idx > -1) cats.splice(idx,1);
        cat.remove();
        if(li) li.remove();
    }

    window.updateSpriteSheet = function(){
        const tokenId = document.getElementById('newMooncatID').value;
        if(tokenId === '') return;
        addCat(parseInt(tokenId,10));
    };

    function animate(){
        setInterval(() => {
            cats.forEach(cat => cat.step());
        },100);
    }

    document.addEventListener('keydown', (e) => {
        cats.forEach(cat => cat.handleKeyDown(e.which));
    });

    document.addEventListener('keyup', (e) => {
        cats.forEach(cat => cat.handleKeyUp(e.which));
    });

    animate();
}
})();
