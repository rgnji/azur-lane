import { shiplist } from "./ship.js";
import { weaponlist } from "./weapon.js";

const empty_ship = {
  bg: "",
  fr: "",
  icon: "ui/empty.png",
};

const empty_weapon = {
  bg: "",
  fr: "",
  icon: "ui/icon_back.png",
};

const app = {
  fleet_location: "",
  order: ["#shipselect", "#weaponselect", "#weaponselect"],
  img_ship: {
    bg: "",
    fr: "",
    icon: "",
  },

  change_img(index) {
    //item = ship keys
    const target = document.getElementById(this.fleet_location);
    target.children[0].attributes("src") = shiplist[index].bg;
    target.children[1].attributes("src") = shiplist[index].fr;
    target.children[2].attributes("src") = shiplist[index].icon;
  },
  getId(item, ship) {
    // item = col, ship = row
    // 0_1 => item 0, ship 1 (0 base)
    return item.toString() + "_" + ship.toString();
  },
  setId(id) {
    this.fleet_location = id;
    return;
  },
};

const item_container = Vue.createApp({});

item_container.component("item-container", {
  props: ["modal_type", "bg", "fr", "icon", "item", "ship"],
  template: `
            <div class="col-md-auto fleet_box">
              <button
                class="select_block"
                type="button"
                id="app.getId(item, ship)"
                data-bs-toggle="modal"
                :data-bs-target="modal_type"
                onclick="setId(this.id)">
                <img class="bg" :src="bg" />
                <img class="fr" :src="fr" />
                <img class="icon" :src="icon" />
              </button>
            </div>`,
});

const ship_container = Vue.createApp({});

ship_container.component("ship-container", {
  props: ["number"],
  template: `
            <div class="row row_box">
              <item-container
              v-for="(order, index) in app.order"
              :modal_type="order"
              :ship="number"
              :item="index.toString()"></item-container>
            </div>`,
});

const fleet_container = Vue.createApp({});

fleet_container.component("fleet-container", {
  template: `
            <div class="container-fluid d-flex justify-content-center mt-5">
              <div class="p-2 bordershow">
                <ship-container
                v-for="order in orders"
                :number="order"></ship-container>
              </div>
            </div>`,
  data() {
    return {
      orders: [0, 1, 2],
    };
  },
});
/*------------------------------------------------*/
const select_ship = Vue.createApp({
  data() {
    return {
      shiplist: shiplist,
    };
  },
});

select_ship.component("ship-select", {
  props: ["name", "bg", "fr", "icon", "key_ship"],
  template: `
            <div class="col-md-auto px-1">
              <div class="card card_style">
                <button 
                class="item_container" 
                
                data-bs-dismiss="modal" 
                onclick="app.change_img(key_ship);">
                  <img class="bg" :src="bg" />
                  <img class="fr" :src="fr" />
                  <img class="icon" :src="icon" />
                </button>
                <div class="card-body p-1">
                  <p class="card-text">{{name}}</p>
                </div>
              </div>
            </div>`,
  methods: {
    change_img(){

    }
  }
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

select_weapon.mount("#weapon_select");
