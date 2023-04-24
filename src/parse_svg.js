export let parse = (svgString) => {
  const parser = new DOMParser();
  const svgDoc = parser.parseFromString(svgString, 'image/svg+xml');
  const paths = svgDoc.getElementsByTagName('path');
  const groups = {};
  let flattened = {};

  for (let i = 0; i < paths.length; i++) {
    const path = paths[i];
    const groupId = path.parentNode.parentNode.id;
    const pathId = path.id;

    // Add the path to the flattened object
    flattened[pathId] = groupId;

    // Add the path to the group object
    if (!groups[groupId]) {
      groups[groupId] = { paths: [] };
    }
    groups[groupId].paths.push(path);
  }

  // Add any subgroups to the group object
  const subgroups = svgDoc.getElementsByTagName('g');
  for (let i = 0; i < subgroups.length; i++) {
    const subgroup = subgroups[i];
    const groupId = subgroup.id;
    const paths = subgroup.getElementsByTagName('path');

    // Add the paths to the group object
    if (!groups[groupId]) {
      groups[groupId] = { paths: [] };
    }
    for (let j = 0; j < paths.length; j++) {
      groups[groupId].paths.push(paths[j].id);
    }
  }

  // // Create an object with the movable parts and their respective paths
  // const movableParts = {
  //   head: groups['head_group'].paths,
  //   eyes: [...groups['eye_left'].paths, ...groups['eye_right'].paths],
  //   mouth: groups['mouth'].paths,
  //   arms: [...groups['arm_left'].paths, ...groups['arm_right'].paths],
  //   legs: [...groups['leg_left'].paths, ...groups['leg_right'].paths]
  // };
  console.log(flattened);

  console.log(groups);
};
