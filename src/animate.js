// create separate timelines for each arm animation
const handsWayUpTl = gsap.timeline({ paused: true });
const handsUpTl = gsap.timeline({ paused: true });
const handsNeutralTl = gsap.timeline({ paused: true });
const handsHalfDownTl = gsap.timeline({ paused: true });
const handsDownTl = gsap.timeline({ paused: true });
const handUpElbowsBentTl = gsap.timeline({ paused: true });
const handUpElbowsBentLeftTl = gsap.timeline({ paused: true });
const handUpElbowsBentRightTl = gsap.timeline({ paused: true });
// create cached references to each timeline
const timelines = {
  hands_way_up: handsWayUpTl,
  hands_up: handsUpTl,
  hands_neutral: handsNeutralTl,
  hands_half_down: handsHalfDownTl,
  hands_down: handsDownTl,
  hand_up_elbows_bent: handUpElbowsBentTl,
  hand_up_elbows_bent_left: handUpElbowsBentLeftTl,
  hand_up_elbows_bent_right: handUpElbowsBentRightTl,
};
let activeAnimations = {
  hands_way_up: false,
  hands_up: false,
  hands_neutral: false,
  hands_half_down: false,
  hands_down: false,
  hand_up_elbows_bent: false,
  hand_up_elbows_bent_left: false,
  hand_up_elbows_bent_right: false,
};

const controls = [
  {
    id: 'hands_way_up',
    text: 'hands way up',
  },
  {
    id: 'hands_up',
    text: 'hands up',
  },
  {
    id: 'hands_half_down',
    text: 'hands half down',
  },
  {
    id: 'hands_down',
    text: 'hands down',
  },
  {
    id: 'hand_up_elbows_bent',
    text: 'hand up elbows bent',
  },
  {
    id: 'hand_up_elbows_bent_left',
    text: 'hand up elbows bent left',
  },
  {
    id: 'hand_up_elbows_bent_right',
    text: 'hand up elbows bent right',
  },
  {
    id: 'legs_apart',
    text: 'legs apart',
  },
  {
    id: 'right_elbow_bent_up',
    text: 'right elbow up',
  },
  {
    id: 'left_elbow_bent_up',
    text: 'left elbow up',
  },
  {
    id: 'hide_hand_left',
    text: 'hide hand left',
  },
  {
    id: 'hide_hand_right',
    text: 'hide hand right',
  },
  {
    id: 'shrink_pointer_right',
    text: 'shrink pointer right',
  },
  {
    id: 'shrink_pointer_left',
    text: 'shrink pointer left',
  },
  {
    id: 'random_mouth',
    text: 'random mouth',
  },
];

function calculateTransformOrigin(angle, distance) {
  // Convert angle from degrees to radians
  const angleInRadians = angle * (Math.PI / 180);

  // Calculate the X and Y offsets using trigonometry
  const xOffset = Math.cos(angleInRadians) * distance;
  const yOffset = Math.sin(angleInRadians) * distance;

  // Construct the transformOrigin string
  const transformOrigin = `${xOffset}% ${yOffset}%`;

  return transformOrigin;
}
function getRandomElement(arr) {
  if (arr.length === 0) {
    throw new Error('Array is empty');
  }

  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

// update the active animations object and play the animation
function playArmAnimation(animationName) {
  reverseActiveTimelines(); // reverse all active timelines first
  activeAnimations[animationName] = true;
  timelines[animationName].play();
}

// update the active animations object and pause the animation
function pauseArmAnimation(animationName) {
  activeAnimations[animationName] = false;
  timelines[animationName].pause();
}

// onMount(() => {
// // add animations to each timeline
// handsWayUpTl
//   .to('#arm_right', 1, { rotation: -56, transformOrigin: "2% 50%" })
//   .to('#arm_left', 1, { rotation: 60, transformOrigin: "98% 50%" }, 0);

// handsUpTl
//   .to('#arm_right', 1, { rotation: -28, transformOrigin: "2% 50%" })
//   .to('#arm_left', 1, { rotation: 30, transformOrigin: "98% 50%" }, 0);

// handsNeutralTl
//   .to('#arm_right', 1, { rotation: 0, transformOrigin: "2% 50%" })
//   .to('#arm_left', 1, { rotation: 0, transformOrigin: "98% 50%" }, 0);

// handsHalfDownTl
//   .to('#arm_right', 1, { rotation: 28, transformOrigin: "2% 50%" })
//   .to('#arm_left', 1, { rotation: -30, transformOrigin: "98% 50%" }, 0);

// handsDownTl
//   .to('#arm_right', 1, { rotation: 56, transformOrigin: "2% 50%" })
//   .to('#arm_left', 1, { rotation: -60, transformOrigin: "98% 50%" }, 0);

// handUpElbowsBentTl
//   .to('#arm_right', 1, {rotation: 45, transformOrigin: '0% 55%'})
//   .to('#lower_arm_right', 1, {rotation: -90, transformOrigin: '0% 55%'}, 0)
//   .to('#arm_left', 1, {rotation: -45, transformOrigin: '98% 50%'}, 0)
//   .to('#lower_arm_left', 1, {rotation: 90, transformOrigin: '100% 55%'}, 0);

// handUpElbowsBentLeftTl
//   .to('#arm_left', 1, {rotation: -45, transformOrigin: '98% 50%'}, 0)
//   .to('#lower_arm_left', 1, {rotation: 90, transformOrigin: '100% 55%'}, 0);

// handUpElbowsBentRightTl
//   .to('#arm_right', 1, {rotation: 45, transformOrigin: '0% 55%'}, 0)
//   .to('#lower_arm_right', 1, {rotation: -90, transformOrigin: '0% 55%'}, 0);

//   }); // end onMount

let armsTl = gsap.timeline({ paused: true });
let legsTl = gsap.timeline({ paused: true });
let handsTl = gsap.timeline({ paused: true });

function reverseActiveTimelines(
  activeAnimations,
  timelineArray,
  currentAnimation
) {
  let previousTimeline = activeAnimations.arm;

  // Reverse the previous timeline and set it to null
  if (previousTimeline) {
    previousTimeline.reverse().eventCallback('onReverseComplete', () => {
      previousTimeline = null;
      currentAnimation.play();
    });
  } else {
    currentAnimation.play();
  }
}

let allAnimations = [
  handsWayUpTl,
  handsUpTl,
  handsNeutralTl,
  handsHalfDownTl,
  handsDownTl,
  handUpElbowsBentTl,
  handUpElbowsBentLeftTl,
  handUpElbowsBentRightTl,
];

let animations = {
  hands_way_up: () => {
    reverseActiveTimelines(activeAnimations, allAnimations, handsWayUpTl);
    activeAnimations.arm = handsWayUpTl;
  },

  hands_up: () => {
    reverseActiveTimelines(activeAnimations, allAnimations, handsUpTl);
    activeAnimations.arm = handsUpTl;
  },

  hands_neutral: () => {
    reverseActiveTimelines(activeAnimations, allAnimations, handsNeutralTl);
    activeAnimations.arm = handsNeutralTl;
  },

  hands_half_down: () => {
    reverseActiveTimelines(activeAnimations, allAnimations, handsHalfDownTl);
    activeAnimations.arm = handsHalfDownTl;
  },

  hands_down: () => {
    reverseActiveTimelines(activeAnimations, allAnimations, handsDownTl);
    activeAnimations.arm = handsDownTl;
  },

  hand_up_elbows_bent: () => {
    reverseActiveTimelines(activeAnimations, allAnimations, handUpElbowsBentTl);
    activeAnimations.arm = handUpElbowsBentTl;
  },

  hand_up_elbows_bent_left: () => {
    reverseActiveTimelines(
      activeAnimations,
      allAnimations,
      handUpElbowsBentLeftTl
    );
    activeAnimations.arm = handUpElbowsBentLeftTl;
  },

  hand_up_elbows_bent_right: () => {
    reverseActiveTimelines(
      activeAnimations,
      allAnimations,
      handUpElbowsBentRightTl
    );
    activeAnimations.arm = handUpElbowsBentRightTl;
  },

  hide_hand_right: () => {
    let time = legsTl.currentLabel('hide_hand_right');
    if (time > -1) {
      legsTl.reverse('hide_hand_right');
    } else {
      handsTl
        .to('#hand_right', 1, { opacity: 0 }, 'hide_hand_right')
        .play('hide_hand_right');
    }
  },
  legs_apart: () => {
    let time = legsTl.currentLabel('legs_apart');
    if (time > -1) {
      legsTl.reverse('legs_apart');
    } else {
      legsTl
        .to(
          '#leg_left',
          1,
          { rotation: 30, transformOrigin: '50% 0%' },
          'legs_apart'
        )
        .to(
          '#leg_right',
          1,
          { rotation: -30, transformOrigin: '0% 5%' },
          'legs_apart'
        )
        .play('legs_apart')
        .addPause();
    }
  },

  shrink_pointer_right: () => {
    let time = handsTl.currentLabel('shrink_pointer_right');
    if (time > -1) {
      handTl.reverse('shrink_pointer_right');
    } else {
      handsTl
        .to('#pointer_right', 1, { scaleX: 0.5 }, 'shrink_pointer_right')
        .to(
          '#pointer_shadow_right',
          1,
          { scaleX: 0.55 },
          'shrink_pointer_right'
        )
        .play('shrink_pointer_right');
    }
  },
  shrink_pointer_left: () => {
    let time = handsTl.currentLabel('shrink_pointer_left');
    if (time > -1) {
      handsTl.reverse('shrink_pointer_left');
    } else {
      handsTl
        .to(
          '#pointer_left',
          1,
          { scaleX: 0.5, transformOrigin: '100% 0%' },
          'shrink_pointer_left'
        )
        .to(
          '#pointer_shadow_left',
          1,
          { scaleX: 0.55, transformOrigin: '100% 0%' },
          'shrink_pointer_left'
        )
        .play('shrink_pointer_left');
    }
  },

  hide_hand_left: () => {
    let time = legsTl.currentLabel('hide_hand_left');
    if (time > -1) {
      legsTl.reverse('hide_hand_left');
    } else {
      handsTl
        .to('#hand_left', 1, { opacity: 0 }, 'hide_hand_left')
        .play('hide_hand_left');
    }
  },

  random_mouth: () => {
    randomMouth();
    morphMouth();
  },
};

let controlClickHandler = (buttonId) => {
  animations[buttonId]();
};

let morphMouth = () => {
  // Define the mouth paths
  const mouthScaleTl = gsap.timeline({ paused: true });
  mouthScaleTl
    .to('#mouth', { duration: 0.2, scale: 1.2 })
    .to('#mouth', { duration: 0.2, scale: 0.8 })
    .to('#mouth', { duration: 0.2, scale: 1 })
    .play();
};

let randomMouth = () => {
  let mouth_array = [
    'mouth_smaller',
    'mouth_big',
    'mouth_half_closed',
    'mouth_round',
    'mouth_round_small',
    'mouth_frown_slight',
  ];
  let cur_mouth = getRandomElement(mouth_array);
  for (let group of mouth_array) {
    let element = document.getElementById(group);
    if (element) {
      element.style.display = 'none';
    }
  }
  let current_mouth = document.getElementById(cur_mouth);
  if (current_mouth) {
    current_mouth.style.display = 'inline';
  }
};

/*
{#each controls as obj}
  <button on:click={() =>  controlClickHandler(obj.id)}   type="button" id="{obj.id}">
    {obj.text}
  </button>
{/each}


*/
