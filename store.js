export const store = Vue.reactive({
  shipPos: -1,
  weaponPos: [-1, -1],
  targetShip: ["remove", "remove", "remove"],
  targetWeapon: [
    ["remove", "remove", "remove"],
    ["remove", "remove", "remove"],
    ["remove", "remove", "remove"],
  ],

  takePos(index) {
    // index = row
    this.shipPos = index;
  },
  takePosWeapon(row, col) {
    this.weaponPos[0] = row;
    this.weaponPos[1] = col - 1;
  },

  selectShip(ship) {
    // ship = ship name
    this.targetShip[this.shipPos] = ship;
  },
  selectWeapon(weapon) {
    let row, col;
    [row, col] = this.weaponPos;
    this.targetWeapon[row][col] = weapon;
    console.log(row, col);
  },

  getter(row) {
    // return ship name
    return this.targetShip[row];
  },
  getterWeapon(row, col) {
    // return weapon name
    return this.targetWeapon[row][col - 1];
  },

  resetWeapon(row) {
    for (let key in 3) {
      this.targetWeapon[row][key] = "empty";
    }
  },
});
