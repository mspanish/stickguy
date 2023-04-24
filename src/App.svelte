<script>
  import { onMount } from "svelte";
  //import  { gsap }  from "gsap";
  import { parse } from './parse_svg.js';
 //import stickguy from './assets/stickguy.svg';
  import { fabric } from 'fabric';
 
 
 console.clear();
  
  let canvas;
  let canvasWidth = 945;
  let canvasHeight = 1167;
  let stickguy_groups = ['body', 'upper_left_arm', 'lower_left_arm', 'upper_right_arm', 'lower_right_arm', "left_leg", "right_leg", 'head', 'mouth', 'eyes']
  let path_groups = {
   "body":[
      "body_1",
      "body_2"
   ],
   "upper_left_arm":[
      "upper_arm_left_1",
      "upper_arm_left_2",
      "upper_arm_left_3"
   ],
   "lower_left_arm":[
      "lower_arm_left_1",
      "lower_arm_left_2_pinky",
      "left_3rd_shadow_left",
      "left_3rd_left",
      "left_2nd_shadow_left",
      "left_2nd_left",
      "left_pointer_shadow_left",
      "left_pointer_left",
      "left_thumb_shadow_left",
      "left_thumb_left"
   ],
   "upper_right_arm":[
      "upper_arm_right_1",
      "upper_arm_right_2",
      "upper_arm_right_3"
   ],
   "lower_right_arm":[
      "lower_arm_right_1",
      "lower_arm_right_2_pinky",
      "right_3rd_shadow_right",
      "right_3rd_right",
      "right_2nd_shadow_right",
      "right_2nd_right",
      "right_pointer_shadow_right",
      "right_pointer_right",
      "right_thumb_shadow_right",
      "right_thumb_right"
   ],
   "left_leg":[
      "leg_left_1",
      "leg_left_2",
      "leg_left_3"
   ],
   "right_leg":[
      "leg_right_1",
      "leg_right_2",
      "leg_right_3"
   ],
   "eyes": [
      "eye_left",
      "eye_right",
   ],
   "mouth": [
      "mouth_smaller_2",
      "mouth_smaller_3",
      "mouth_teeth_smaller_1",
      "mouth_teeth_smaller_2",
      "mouth_tongue_smaller_1",
      "mouth_half_closed_1",
      "mouth_half_closed_2",
      "mouth_half_closed_3",
      "mouth_half_closed_4",
      "mouth_round_1",
      "mouth_round_2",
      "mouth_round_small_1",
      "mouth_big_1",
      "mouth_big_2",
      "mouth_big_3",
      "mouth_big_4",
      "mouth_big_5",
      "mouth_frown_slight_1"     
   ],
   "head":[
      "head_1",
      "head_2",
   ]  
}
   let svgString = "";

  onMount(() => {

 canvas = new fabric.Canvas('canvas');
 canvas.preserveObjectStacking = true;
 let groups = {}
fabric.loadSVGFromURL('/stickguy.svg', (objects) => {

  for (let g of stickguy_groups) {
    groups[g] = new fabric.Group()
    groups[g].id = 'group_'+g;

  }

  for (let object of objects) {
    for (let g of stickguy_groups) {
      if (path_groups[g].includes(object.id) ) {
        groups[g].addWithUpdate(object)
      }
    }
  }

  groups['head'].set({
    left: canvas.width / 2,
    top: 40 + groups['head'].height, 
    originX: 'center',
    originY: 'bottom',
    centeredRotation: false  
  });
  groups['eyes'].set({
    left: canvas.width / 2,
    top: groups['head'].height/3, 
    originX: 'center',
    originY: 'center',
    centeredRotation: false  
  });  
  groups['mouth'].set({
    left: canvas.width / 2,
    top: groups['head'].height * .75, 
    originX: 'center',
    originY: 'center',
    centeredRotation: false  
  });  

   groups['body'].set({
    left: canvas.width / 2,
    top: groups['head'].top  - 10,
    originX: 'center',
    originY: 'top',
    centeredRotation: false   
  });
    groups['lower_left_arm'].set({
    left: canvas.width / 2  - (groups['upper_left_arm'].width) +40,
    top: groups['head'].top + (groups['upper_left_arm'].height/2) -10,
    originX: 'right',
    originY: 'center',
    centeredRotation: false   
  });
     groups['upper_left_arm'].set({
    left: canvas.width / 2 ,
    top: groups['head'].top + 30,
    originX: 'right',
    originY: 'center',
    centeredRotation: false,
  });  

  
      groups['lower_right_arm'].set({
    left: canvas.width / 2  + (groups['upper_right_arm'].width) -40,
    top: groups['head'].top + (groups['upper_right_arm'].height/2) -10,
    originX: 'left',
    originY: 'center',
    centeredRotation: false 
  });
     groups['upper_right_arm'].set({
    left: canvas.width / 2,
    top: groups['head'].top + 30,
    originX: 'left',
    originY: 'center',
    centeredRotation: false, 
  });  
  
    groups['left_leg'].set({
    left: canvas.width / 2  - (groups['left_leg'].width/2) + 30,
   top: groups['head'].top  - 30 + groups['body'].height,
     originX: 'center',
  originY: 'top',
  centeredRotation: false
  }); 
    groups['right_leg'].set({
    left: canvas.width / 2  - (groups['right_leg'].width/2) + 60,
   top: groups['head'].top - 30 + groups['body'].height,
     originX: 'center',
  originY: 'top',
   centeredRotation: false
  });    
  for (let g of stickguy_groups) {
    // don't add this as it's a nested group
      canvas.add(groups[g])
    }
  canvas.renderAll();
});

// Event handler for selection:created
let updateSelection = () => {
 const activeSelection = canvas.getActiveObject();
let headInSelection = false;
let upperLeftArmInSelection = false;
let upperRightArmInSelection = false;


console.log(activeSelection._objects)
  for (let obj of activeSelection._objects) {
    console.log(obj)
    if (obj.id === 'head_1') headInSelection = true;
    if (obj.id.includes('upper_arm_left') ) upperLeftArmInSelection = true;  
    if (obj.id.includes('upper_arm_right') ) upperRightArmInSelection = true;      
  }
  if (headInSelection) {
   // console.log('head is in selection')
    // Add eyes and mouth objects to the current selection
    activeSelection.add(groups['eyes']);
    activeSelection.add(groups['mouth']);
  }
    if (upperLeftArmInSelection) {
    activeSelection.add(groups['lower_left_arm']);
  }
    if (upperRightArmInSelection) {
    activeSelection.add(groups['lower_right_arm']);
  }  
};

//canvas.on('selection:created', updateSelection);
//canvas.on('selection:updated', updateSelection);

// Extend the fabric.ActiveSelection class
const CustomActiveSelection = fabric.util.createClass(fabric.ActiveSelection, {

  initialize: function (objects, options) {
    options = options || {};
  console.log('custom active selection')
    // Check if the desired objects are selected
    const lowerLeftArmInSelection = objects.some((object) => object.id === 'group_lower_left_arm');
    const upperLeftArmInSelection = objects.some((object) => object.id === 'group_upper_left_arm');

    // Set custom originX and originY values for the pivot point if both left arm objects are selected
    if (lowerLeftArmInSelection && upperLeftArmInSelection) {
          console.log('lowerLeftArm '+lowerLeftArmInSelection)
      options.originX = options.originX || 'right';
      options.originY = options.originY || 'center';
      options.centeredRotation = false;
    }

    const lowerRightArmInSelection = objects.some((object) => object.id === 'group_lower_right_arm');
    const upperRightArmInSelection = objects.some((object) => object.id === 'group_upper_right_arm');

    // Set custom originX and originY values for the pivot point if both right arm objects are selected
    if (lowerRightArmInSelection && upperRightArmInSelection) {
          console.log('lowerRightArm '+lowerRightArmInSelection)
      options.originX = options.originX || 'left';
      options.originY = options.originY || 'center';
      options.centeredRotation = false;
    }

    this.callSuper('initialize', objects, options);
  },
});

// Replace the default ActiveSelection class with the custom one
fabric.ActiveSelection = CustomActiveSelection;

// ... Your other canvas setup and event handling code ...


  }); // end onMount


</script>


<br />
<canvas id="canvas" bind:this={canvas} width={canvasWidth} height={canvasHeight}></canvas>


<style>
svg {
     transform: scale(0.5)       translateY(-550px);
}

.hide {
  display:none;
}
</style>
