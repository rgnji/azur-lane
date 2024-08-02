import { shiplist } from "./ship.js";
import { weaponlist } from "./weapon.js";
import { store } from "./store.js";

const fleet_container = Vue.createApp({});

fleet_container.component("item-container", {
  props: ["col-id"],
  template: `
            <div class="col-md-auto fleet_box">
              <button
                class="select_block"
                type="button"
                :data-bs-toggle="weaponOnOff()"
                :data-bs-target="deterModal()"
                @click="takePosition()">
                <img class="bg" :src="target().bg" />
                <img class="fr" :src="target().fr" />
                <img class="icon" :src="target().icon" />
              </button>
            </div>`,
  data() {
    return {
      row: parseInt(this.colId.split("_")[0]),
      col: parseInt(this.colId.split("_")[1]),
      lock: "",
    };
  },
  methods: {
    target() {
      // switch the img to which clicked in modal
      if (this.col === 0) {
        // it's a ship column
        let name = store.getter(this.row);
        return {
          bg: shiplist[name].bg,
          fr: shiplist[name].fr,
          icon: shiplist[name].icon,
        };
      } else {
        // it's a weapon
        let name = store.getterWeapon(this.row, this.col);
        return {
          bg: weaponlist[name].bg,
          fr: weaponlist[name].fr,
          icon: weaponlist[name].icon,
        };
      }
    },
    takePosition() {
      if (this.col === 0) {
        // it's a ship
        store.takePos(this.row);
      } else {
        // it's a weapon
        store.takePosWeapon(this.row, this.col);
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
        return ""; // disable
      } else {
        return "modal"; // enable
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
              v-for="index in 3"
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
            </div>`,
  methods: {
    idCompose(index) {
      return index.toString();
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
  props: ["ship-bg", "ship-frame", "ship-icon", "ship-id"],
  template: `
            <div class="col-md-auto px-1">
              <div class="card card_style">
                <button 
                class="item_container" 
                :id="shipId"
                data-bs-dismiss="modal"
                @click="choose()">
                  <img class="bg" :src="shipBg" />
                  <img class="fr" :src="shipFrame" />
                  <img class="icon" :src="shipIcon" />
                </button>
                <div class="card-body p-1">
                  <p class="card-text">{{shipId}}</p>
                </div>
              </div>
            </div>`,
  methods: {
    choose() {
      store.selectShip(this.shipId);
    },
  },
});

select_ship.mount("#ship_select");
/*------------------------------------------------*/
const select_weapon = Vue.createApp({
  data() {
    return {
      weaponlist: weaponlist,
    };
  },
});

select_weapon.component("weapon-select", {
  props: ["weapon-bg", "weapon-frame", "weapon-icon", "weapon-id"],
  template: `
            <div class="col-md-auto px-1">
              <div class="card card_style">
                <button 
                class="item_container" 
                :id="weaponId"
                data-bs-dismiss="modal"
                @click="choose()">
                  <img class="bg" :src="weaponBg" />
                  <img class="fr" :src="weaponFrame" />
                  <img class="icon" :src="weaponIcon" />
                </button>
                <div class="card-body p-1">
                  <p class="card-text">{{weaponId}}</p>
                </div>
              </div>
            </div>`,
  methods: {
    choose() {
      store.selectWeapon(this.weaponId);
    },
  },
});

select_weapon.mount("#weapon_select");
