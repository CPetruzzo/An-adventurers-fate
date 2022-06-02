import { Rectangle } from "pixi.js";

export interface IHitBox {
    getHitBox():Rectangle;
}

export function checkCollision(objA:IHitBox, objB:IHitBox):Rectangle | null 
{
    const rA = objA.getHitBox();
    const rB = objB.getHitBox();

    const rightmostLeft = rA.left < rB.left ? rB.left : rA.left;
    const leftmostRight = rA.right > rB.right ? rB.right : rA.right;
    const bottommostTop = rA.top < rB.top ? rB.top : rA.top;
    const topmostBottom = rA.bottom > rB.bottom ? rB.bottom : rA.bottom;

    // "make sense" means that left is left and right is right.
    const makesSenseHorizontal = rightmostLeft < leftmostRight;
    const makesSenseVertical = bottommostTop < topmostBottom;
    if (makesSenseHorizontal && makesSenseVertical)
    {
        const retval = new Rectangle();
        retval.x = rightmostLeft;
        retval.y = bottommostTop;
        retval.width = leftmostRight - rightmostLeft;
        retval.height = topmostBottom - bottommostTop;
        return retval;
    }
    else
    {
        return null;
    }
}
