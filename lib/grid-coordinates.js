function gridCoordinates(length, style) {
  let gridCoordinates = [];
  for (let y = 0; y < style.v_grid; y++) {
    for (let x = 0; x < style.h_grid; x++) {
      if (gridCoordinates.length >= length) {
        return gridCoordinates;
      }
      gridCoordinates.push([x * style.h_space, y * style.v_space]);
    }
  }
  return gridCoordinates;
}
