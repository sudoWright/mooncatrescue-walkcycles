import {MoonCatWalk} from './mooncatWalk.js?v=2';

export const generator = (function () {
window.onload = function() {
    let spriteSheet = null;
    let offsetX = 100;
    let offsetY = 100;
    let direction = 6;
    let jumping = false;
    let jumpLength = 12;
    let jumpCount = 0;
    let jumpInc = 2;
    let speed = 2;
    let bounds = {
        xMin: -3,
        xMax: 172,
        yMin: 85,
        yMax: 118
    }
    animate();

    window.updateSpriteSheet = function(){
        let tokenId = document.getElementById('mooncatID').value;

        // Generate a MoonCat Walkcycle Sprite Sheet using the MoonCat TokenID (0-25439 - No need to use the MoonCat Hex ID format)
        spriteSheet = MoonCatWalk.generateMoonCatSpriteSheet(tokenId, 1);
        
        document.getElementById('sprite_sheet').src = spriteSheet;
    }


    window.updateSpriteSheet();

    function animate(){
        let animation = document.getElementById('animation');
        let walkIndex = 0;
        let maxFrames = 8;
        setInterval(()=>{
            let x = walkIndex * 32;
            let y = direction * 32;
            if(direction == 0){
                offsetX += speed;
            } else if(direction == 1){
                offsetY -= speed;
            } else if(direction == 2){
                offsetY += speed;
            } else if(direction == 3){
                offsetX -= speed;
            }
            if(offsetX < bounds.xMin){
                offsetX = bounds.xMin;
            } else if(offsetX > bounds.xMax){
                offsetX = bounds.xMax;
            } else if(offsetY < bounds.yMin){
                offsetY = bounds.yMin;
            } else if(offsetY > bounds.yMax){
                offsetY = bounds.yMax;
            }
            if(jumping){
                if(jumpCount > jumpLength){
                    jumpInc = -2;
                }
                jumpCount += jumpInc;
                if(jumpCount == 0){
                    jumping = false;
                    jumpInc = 2;
                }
            }
            animation.style.backgroundPosition = `-${x}px -${y}px`;
            animation.style.backgroundImage = "url('"+spriteSheet+"')";
            animation.style.left = (offsetX) + 'px';
            animation.style.top = (offsetY-jumpCount) + 'px';
            
            walkIndex++;
            if(walkIndex >= maxFrames){
                walkIndex = 0;
            }
        },100);
    }

    document.addEventListener("keydown", function(e) {
        var key = e.which;
        switch (key) {
            case 39: // Right
                direction = 0;
                break;

            case 38: // Up
                direction = 1;
                break;

            case 40: // Down
                direction = 2;
                break;

            case 37: //Left
                direction = 3;
                break;

            case 32: //Jump / Space
                jumping = true;
                break;
        }
    })

    document.addEventListener("keyup", function(e) {
        var key = e.which;
        switch (key) {
            case 39: // Idle Right
                direction = 4;
                break;

            case 38: // Idle Up
                direction = 5;
                break;

            case 40: // Idle Down
                direction = 6;
                break;

            case 37: // Idle Left
                direction = 7;
                break;
        }
    })
}
})();