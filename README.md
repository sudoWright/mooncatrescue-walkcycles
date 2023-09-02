# mooncatrescue-walkcycles

## Based on code originally created by Ponderware
[Ponderware MoonCatParser](https://github.com/ponderware/mooncatparser)

## Demo

Up, Down, Left, Right Arrow Keys to Walk
Space Bar to Jump
Change the MoonCat # to see a different MoonCat

[Live Demo](https://mooncats.astromass.com/)

## Import Module

[mooncatWalk.js](https://github.com/sudoWright/mooncatrescue-walkcycles/blob/main/js/mooncatWalk.js)

```javascript
import {MoonCatWalk} from './mooncatWalk.js';
```

## Usage

```javascript
let size = 1;
let tokenId = 0;

// Generate the Sprite Sheet for the specific MoonCat
let spriteSheet = MoonCatWalk.generateMoonCatSpriteSheet(tokenId, size);

// TODO updte these as the cat moves 
let frame = 0;
let direction = 0;

let x = frame * 32;
/* columns - left to right in the sprite sheet
  0 = frame 1
  ...
  7 = frame 8
*/
let y = direction * 32;
/* rows - top to bottom in the sprite sheet
  0 = right
  1 = up
  2 = down
  3 = left
  4 = idle right
  5 = idle up
  6 = idle down
  7 = idle left
*/

// Get the dom element that will show the MoonCat walking (CSS for div https://github.com/sudoWright/mooncatrescue-walkcycles/blob/main/css/walk.css#L12-L20)
let animation = document.getElementById('animation');

// Set the Sprite Sheet offset for each of the walk cycles
animation.style.backgroundPosition = `-${x}px -${y}px`;

// Set the background image to the base64 image data sprite sheet generated above
animation.style.backgroundImage = "url('"+spriteSheet+"')";
```

## Sprite Sheet for MoonCat TokenId=0

[OpenSea MoonCat 0](https://opensea.io/assets/0xc3f733ca98e0dad0386979eb96fb1722a1a05e69/0)

![0.png](/images/0.png?raw=true "0.png")

-----

## License

Copyright © 2017 ponderware ltd.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

Except with the prior written authorization from ponderware ltd., any modifications made to the Software shall not be represented, promoted, or sold as the official or canonical Software or property of MoonCatRescue or ponderware ltd., and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

Special thanks to vinny-888.github.io for providing these walk-cycles. 
