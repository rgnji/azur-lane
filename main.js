import { shiplist } from "./ship.js";
import { weaponlist } from "./weapon.js";

const select_ship = Vue.createApp({
  data() {
    return {
      shiplist: shiplist,
    };
  },
});

select_ship.component("ship-select", {
  props: ["name", "bg", "fr", "icon"],
  template: `
            <div class="col-md-auto px-1">
              <div class="card card_style">
                <button class="item_container" data-bs-dismiss="modal">
                  <img class="bg" :src="bg" />
                  <img class="fr" :src="fr" />
                  <img class="icon" :src="icon" />
                </button>
                <div class="card-body p-1">
                  <p class="card-text">{{name}}</p>
                </div>
              </div>
            </div>`,
});

select_ship.mount("#ship_select");

const select_weapon = Vue.createApp({
  data() {
    return {
      weaponlist: weaponlist,
    };
  },
});

select_weapon.component("weapon-select", {
  props: ["name", "bg", "fr", "icon"],
  template: `<div class="col-md-auto px-1">
              <div class="card card_style">
                <button class="item_container" data-bs-dismiss="modal">
                  <img class="bg" :src="bg" />
                  <img class="fr" :src="fr" />
                  <img class="icon" :src="icon" />
                </button>
                <div class="card-body p-1">
                  <p class="card-text">{{name}}</p>
                </div>
              </div>
            </div>`,
});

select_weapon.mount("#weapon_select")