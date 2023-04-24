export let addCustomControls = (fabric, canvas) => {
  var rotateIcon =
    "data:image/svg+xml,%3Csvg height='32px' width='32px' fill='%23000000' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' x='0px' y='0px' viewBox='0 0 33.317 28' enable-background='new 0 0 33.317 28' xml:space='preserve'%3E%3Cpath d='M16.659,24c-5.078,0-9.213-3.987-9.475-9h2.975l-4.5-5l-4.5,5h3.025c0.264,6.671,5.74,12,12.475,12c3.197,0,6.104-1.21,8.315-3.185l-2.122-2.122C21.188,23.127,19.027,24,16.659,24z'%3E%3C/path%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M29.133,14c-0.265-6.669-5.74-12-12.475-12c-3.197,0-6.104,1.21-8.315,3.185l2.122,2.122C12.129,5.873,14.29,5,16.659,5c5.077,0,9.213,3.987,9.475,9h-2.975l4.5,5l4.5-5H29.133z'%3E%3C/path%3E%3C/svg%3E";

  var rotateImg = new Image();
  rotateImg.onload = function () {
    console.log('rotateImg loaded successfully');
  };
  rotateImg.src = rotateIcon;

  var deleteIcon =
    "data:image/svg+xml,%3Csvg height='32px' width='32px' fill='%23000000' xmlns='http://www.w3.org/2000/svg' data-name='Layer 1' viewBox='0 0 100 100' x='0px' y='0px'%3E%3Ctitle%3E06%3C/title%3E%3Cg data-name='Group'%3E%3Cpath data-name='Compound Path' d='M81.5,24.6H62.7V20.8a7,7,0,0,0-7-7H44.3a7,7,0,0,0-7,7v3.8H18.5a3,3,0,0,0,0,6h6.1V75.2a11,11,0,0,0,11,11H64.4a11,11,0,0,0,11-11V30.6h6.1a3,3,0,0,0,0-6ZM43.3,20.8a1,1,0,0,1,1-1H55.7a1,1,0,0,1,1,1v3.8H43.3Zm26,54.5a5,5,0,0,1-5,5H35.6a5,5,0,0,1-5-5V30.6H69.4Z'%3E%3C/path%3E%3Cpath data-name='Path' d='M57.5,73a3,3,0,0,0,3-3V40.1a3,3,0,1,0-6,0V70A3,3,0,0,0,57.5,73Z'%3E%3C/path%3E%3Cpath data-name='Path' d='M42.5,73a3,3,0,0,0,3-3V40.1a3,3,0,1,0-6,0V70A3,3,0,0,0,42.5,73Z'%3E%3C/path%3E%3C/g%3E%3C/svg%3E";

  var deleteImg = document.createElement('img');
  deleteImg.src = deleteIcon;

  fabric.Object.prototype.transparentCorners = false;
  fabric.Object.prototype.cornerStyle = 'circle';

  const originalControl = fabric.Object.prototype.controls.mtr;
  fabric.Object.prototype.controls.mtr.render = function (
    ctx,
    left,
    top,
    styleOverride,
    fabricObject
  ) {
    ctx.save();
    ctx.translate(left, top);
    ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
    ctx.beginPath();
    ctx.arc(0, 0, 18, 0, 2 * Math.PI, false); //radius
    ctx.closePath();
    ctx.fillStyle = '#c50808';
    ctx.strokeStyle = '#3d85c6';
    ctx.lineWidth = 3;
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  };

  //fabric.Object.prototype.controls.mtr.x = 0.5;
  //fabric.Object.prototype.controls.mtr.y = 0.5;
};
