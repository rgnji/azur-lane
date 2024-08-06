import { shiplist } from "./ship.js";
import { weaponlist } from "./weapon.js";
import { store } from "./store.js";

const fleet_container = Vue.createApp({});

fleet_container.component("item-container", {
  props: ["colId"],
  template: `
            <div class="col-md-auto fleet_box" :id="colId">
              <button
                class="select_block d-flex flex-wrap align-content-center"
                type="button"
                :data-bs-toggle="weaponOnOff()"
                :data-bs-target="deterModal()"
                @click="takePosition()">
                <img class="bg" :src="target(0)" />
                <img class="fr" :src="target(1)" />
                <img class="icon" :src="target(2)" />
              </button>
            </div>`,
  data() {
    return {
      row: parseInt(this.colId.split("_")[0]),
      col: parseInt(this.colId.split("_")[1]),
    };
  },
  methods: {
    target(val) {
      // render button image
      if (this.col === 0) {
        // it's a ship column
        let name = store.getter(this.row);
        switch (val) {
          case 0:
            return shiplist[name].bg;
          case 1:
            return shiplist[name].fr;
          case 2:
            return shiplist[name].icon;
          default:
            break;
        }
      } else {
        // it's a weapon
        let name = store.getterWeapon(this.row, this.col);
        switch (val) {
          case 0:
            return weaponlist[name].bg;
          case 1:
            return weaponlist[name].fr;
          case 2:
            return weaponlist[name].icon;
          default:
            break;
        }
      }
    },
    takePosition() {
      if (this.col === 0) {
        // it's a ship
        store.takePos(this.row);
      } else {
        // it's a weapon
        store.takePosWeapon(this.row, this.col);

        // determine weapon modal content
        let ship = store.getter(this.row);
        switch (this.col) {
          case 1:
            const type_1 = shiplist[ship].equip.equip_1; // array
            store.weaponModalPush("remove");
            // iterate the whole weapon list
            for (let key in weaponlist) {
              // if the weapon type matches, store the name (key) in reactive
              if (type_1.includes(weaponlist[key].type)) {
                store.weaponModalPush(key);
              }
            }
            break;
          case 2:
            const type_2 = shiplist[ship].equip.equip_2; // array
            store.weaponModalPush("remove");
            // iterate the whole weapon list
            for (let key in weaponlist) {
              // if the weapon type matches, store the name (key) in reactive
              if (type_2.includes(weaponlist[key].type)) {
                store.weaponModalPush(key);
              }
            }
            break;
          case 3:
            const type_3 = shiplist[ship].equip.equip_3; // array
            store.weaponModalPush("remove");
            // iterate the whole weapon list
            for (let key in weaponlist) {
              // if the weapon type matches, store the name (key) in reactive
              if (type_3.includes(weaponlist[key].type)) {
                store.weaponModalPush(key);
              }
            }
            break;
          case 4:
            const type_4 = shiplist[ship].equip.equip_4; // array
            store.weaponModalPush("remove");
            // iterate the whole weapon list
            for (let key in weaponlist) {
              // if the weapon type matches, store the name (key) in reactive
              if (type_4.includes(weaponlist[key].type)) {
                store.weaponModalPush(key);
              }
            }
            break;
          case 5:
            const type_5 = shiplist[ship].equip.equip_5; // array
            store.weaponModalPush("remove");
            // iterate the whole weapon list
            for (let key in weaponlist) {
              // if the weapon type matches, store the name (key) in reactive
              if (type_5.includes(weaponlist[key].type)) {
                store.weaponModalPush(key);
              }
            }
            break;
          default:
            break;
        }
      }
    },
    deterModal() {
      if (this.col === 0) {
        // ship
        return "#shipselect";
      } else {
        // weapon
        return "#weaponselect";
      }
    },
    weaponOnOff() {
      if (store.getter(this.row) === "remove" && this.col !== 0) {
        store.resetWeapon(this.row, this.col); // remove weapon
        return ""; // disable modal toggle
      } else {
        return "modal"; // enable modal toggle
      }
    },
  },
});

fleet_container.component("word-container", {
  props: ["skill"],
  template: `
            <div class="col-md-auto fleet_box">
              <div class="select_block_skill">
                <span class="skill_name">{{skill}}</span>
                <span class="reload_value"></span>
              </div>
            </div>`,
});

/* 1_2 => row 1, col 2 */
fleet_container.component("ship-container", {
  props: ["row-id"],
  template: `
            <div class="row row_box">
              <item-container
              :col-id="idCompose(0)"></item-container>
              <item-container
              v-for="index in 5"
              :key="index"
              :col-id="idCompose(index)"></item-container>
              <word-container
              v-for="(skill, index) in skills"
              :skill="skill"
              :key="index"></word-container>
            </div>`,
  data() {
    return {
      skills: ["skill1", "skill2", "skill3", "skill4"],
    };
  },
  methods: {
    idCompose(index) {
      return this.rowId + "_" + index.toString();
    },
  },
});

fleet_container.component("fleet-container", {
  template: `
            <div class="container-fluid d-flex justify-content-center mt-5">
              <div class="p-2 bordershow">
                <ship-container
                v-for="index in 3"
                :key="index"
                :row-id="idCompose(index - 1)"></ship-container>
              </div>
            </div>
            <div class="d-flex justify-content-center">
              <button 
              type="button" 
              class="btn btn-danger empty_btn"
              @click="resetFleet()">EMPTY FLEET</button>
            </div>`,
  methods: {
    idCompose(index) {
      return index.toString();
    },
    resetFleet() {
      store.resetFleet();
    },
  },
});

fleet_container.mount("#fleet-board");
/*------------------------------------------------*/
const select_ship = Vue.createApp({
  data() {
    return {
      shiplist: shiplist,
    };
  },
});

select_ship.component("ship-select", {
  props: ["shipBg", "shipFrame", "shipIcon", "shipId"],
  template: `
            <div class="col-md-auto p-0 m-1">              
              <button 
              class="item_container d-flex align-content-center flex-wrap" 
              :id="shipId"
              data-bs-dismiss="modal"
              v-tooltip
              data-bs-placement="bottom"
              data-bs-offset="0,5"
              data-bs-delay="0.1"
              :title="shipId"
              @click="choose()">
                <img class="bg" :src="shipBg" />
                <img class="fr" :src="shipFrame" />
                <img class="icon" :src="shipIcon" />
              </button>                  
            </div>`,
  methods: {
    choose() {
      store.selectShip(this.shipId);
    },
  },
});

select_ship.directive("tooltip", {
  mounted(el) {
    const tooltip = new bootstrap.Tooltip(el);
  },
});

select_ship.mount("#ship_select");
/*------------------------------------------------*/
const select_weapon = Vue.createApp({
  data() {
    return {
      targetName: store.weaponModalGetter(),
    };
  },
});

select_weapon.component("weapon-select", {
  props: ["weaponName"],
  template: `
            <div class="col-md-auto p-0 m-1">
              <button 
              class="item_container d-flex align-content-center flex-wrap" 
              :id="weaponId"
              data-bs-dismiss="modal"
              v-tooltip
              data-bs-placement="bottom"
              data-bs-offset="0,5"
              data-bs-delay="0.1"
              :title="weaponId"
              @click="choose()">
                <img class="bg" :src="weaponBg" />
                <img class="fr" :src="weaponFrame" />
                <img class="icon" :src="weaponIcon" />
              </button>
            </div>`,
  data() {
    return {
      weaponBg: weaponlist[this.weaponName].bg,
      weaponFrame: weaponlist[this.weaponName].fr,
      weaponIcon: weaponlist[this.weaponName].icon,
      weaponId: weaponlist[this.weaponName].text,
    };
  },
  methods: {
    choose() {
      store.selectWeapon(this.weaponId);
      store.weaponModalReset();
    },
  },
});

select_weapon.directive("tooltip", {
  mounted(el) {
    const tooltip = new bootstrap.Tooltip(el);
  },
});

select_weapon.mount("#weapon_select");
