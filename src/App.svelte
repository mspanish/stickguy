<script>
  import { onMount } from "svelte";
  //import  { gsap }  from "gsap";
  import { parse } from './parse_svg.js';
 //import stickguy from './assets/stickguy.svg';
  import { fabric } from 'fabric';
  import { addCustomControls } from './custom_controls.js'
 
 
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
      "left_3rd_shadow",
      "left_3rd",
      "left_2nd_shadow",
      "left_2nd",
      "left_pointer_shadow",
      "left_pointer",
      "left_thumb_shadow",
      "left_thumb"
   ],
   "upper_right_arm":[
      "upper_arm_right_1",
      "upper_arm_right_2",
      "upper_arm_right_3"
   ],
   "lower_right_arm":[
      "lower_arm_right_1",
      "lower_arm_right_2_pinky",
      "right_3rd_shadow",
      "right_3rd",
      "right_2nd_shadow",
      "right_2nd",
      "right_pointer_shadow",
      "right_pointer",
      "right_thumb_shadow",
      "right_thumb"
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
   ],
   "head":[
      "head_1",
      "head_2",
   ]  
}
   let svgString = "";

  onMount(() => {

 canvas = new fabric.Canvas('canvas');
 fabric.Object.prototype.cornerSize = 18;
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
    top: 60 + groups['head'].height, 
    originX: 'center',
    originY: 'bottom',
    centeredRotation: false  
  });
  groups['eyes'].set({
    left: canvas.width / 2,
    top: groups['head'].height/2, 
    originX: 'center',
    originY: 'center',
    centeredRotation: false  
  });  
  groups['mouth'].set({
    left: canvas.width / 2,
    top: groups['head'].height * .85, 
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
 // selectMyObjects(['group_mouth', 'group_eyes', 'group_head'])
}); // end load SVG

// Event handler for selection:created
let updateSelection = () => {
  console.log('running update selection')
 const activeSelection = canvas.getActiveObject();
let headInSelection = false;
let upperLeftArmInSelection = false;
let upperRightArmInSelection = false;


   //console.log(activeSelection._objects)
  for (let obj of activeSelection._objects) {
    //console.log(obj.id)
    if (obj.id === 'head_1') headInSelection = true;
    if (obj.id.includes('upper_arm_left') ) upperLeftArmInSelection = true;  
    if (obj.id.includes('upper_arm_right') ) upperRightArmInSelection = true;      
  }
  if (headInSelection) {
      selectMyObjects(['group_mouth', 'group_eyes', 'group_head']);
  }
    if (upperLeftArmInSelection) {
      selectMyObjects(['group_upper_left_arm', 'group_lower_left_arm']);
  }
    if (upperRightArmInSelection) {
      selectMyObjects(['group_upper_right_arm', 'group_lower_right_arm']);
  }  
};

canvas.on('selection:created', updateSelection);
canvas.on('selection:updated', updateSelection);

// Extend the fabric.ActiveSelection class
const CustomActiveSelection = fabric.util.createClass(fabric.ActiveSelection, {

  initialize: function (objects, options) {
    options = options || {};
    console.log('custom active selection')
    console.log(objects)
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

addCustomControls(fabric, canvas);


  }); // end onMount

let selectMyObjects = (ids)=> {
    // Programmatically select the head, eyes, and mouth objects
    let allObjects = canvas.getObjects()
    let arr = []
    for (let id of ids) {
        let element = canvas.getObjects().find((obj) => obj.id === id);
        
        if (!element) continue

        if (id === 'group_upper_left_arm' || id === 'group_lower_left_arm') {
          console.log('selectObj, got left arm')
          element.set({
            originX: 'right',
            originY: 'center',
  
            centeredRotation: false,
          });
        } else if (id === 'group_upper_right_arm' || id === 'group_lower_right_arm') {
          element.set({
            originX: 'left',
            originY: 'center',
        
            centeredRotation: false,
          });
        }

        
      if (element) arr.push(element);
    }
    if (arr.length < 1) return

    let activeSelection = new fabric.ActiveSelection(arr, {
      canvas: canvas,
    });
     // console.log(activeSelection)
      canvas.setActiveObject(activeSelection);
      canvas.requestRenderAll();
}
let emojiHead = () => {

  fabric.loadSVGFromURL('/cold.svg', function(objects) {
    console.log(objects)
    // Find the mouth group
    let num = 0;

  
    var headGroup = canvas.getObjects().find(function(object) {
      return object.id === "group_head";
    });
     var mouthGroup = canvas.getObjects().find(function(object) {
      return object.id === "group_mouth";
    }); 
      var eyesGroup = canvas.getObjects().find(function(object) {
      return object.id === "group_eyes";
    });

    let h = headGroup.height; 
    let top = headGroup.top;
    headGroup.forEachObject(function(obj) {
      headGroup.remove(obj);
    });

    var svgGroup = new fabric.Group(objects, {
      left: 0,
      top: headGroup.height/2,
        originX: 'center',
        originY: 'bottom',
        centeredRotation: false,
          perPixelTargetFind: true,
          id: 'import_head'
      });

      // Scale the group to the desired size
      svgGroup.scaleToWidth(375);
      svgGroup.scaleToHeight(375);
      
      headGroup.add(svgGroup)

      mouthGroup.set({
        visible: false,
        evented: false
      });
      eyesGroup.set({
        visible: false,
        evented: false
      });
      mouthGroup.sendToBack();
      eyesGroup.sendToBack();
    //canvas.remove(mouthGroup);
    //canvas.remove(eyesGroup);
//    headGroup.setCoords();
  //  headGroup.scaleToWidth(375);
    //headGroup.scaleToHeight(375);

    headGroup.set({
      // left: canvas.width / 2,
      // top: 260,
      originX: 'center',
      originY: 'bottom',
      centeredRotation: false  
    })
   // headGroup.setCoords();
    // Render the canvas to update the view
    canvas.renderAll();
  });
}

function getRandomElement(arr) {
  if (arr.length === 0) {
    throw new Error('Array is empty');
  }

  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

let changeMouth = ()=> {
  let mouth_array = [
    'mouth_smaller',
    'mouth_big',
    'mouth_half_closed',
    'mouth_round',
    'mouth_round_small',
    'mouth_frown_slight',
  ];
  let cur_mouth = getRandomElement(mouth_array);
  
  console.log('cur_mouth '+cur_mouth)

  fabric.loadSVGFromURL('/_'+cur_mouth+'.svg', function(objects) {
    console.log(objects)
    // Find the mouth group
    var mouthGroup = canvas.getObjects().find(function(object) {
      return object.id === "group_mouth";
    });
    var headGroup = canvas.getObjects().find(function(object) {
      return object.id === "group_head";
    }); 
    mouthGroup.forEachObject(function(obj) {
      mouthGroup.remove(obj);
    });
    for (let obj of objects) {
      console.log(obj)
       mouthGroup.addWithUpdate(obj);
    }
    mouthGroup.set({
    left: canvas.width / 2,
    top: headGroup.height * .85, 
    originX: 'center',
    originY: 'center',
    centeredRotation: false  
    })
    // Render the canvas to update the view
    canvas.renderAll();
  });

}
</script>

<button on:click={emojiHead}>change mouth</button>
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
