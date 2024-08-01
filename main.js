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
  ship_key: "",
  order: ["#shipselect", "#weaponselect", "#weaponselect"],
  skills: ["skill1", "skill2", "skill3"],
  btn_type: {
    ship: {
      modal_type: "#shipselect",
    },
    weapon: {
      modal_type: "#weaponselect",
    },
    equipment: {
      modal_type: "#equipselect",
    },
  },
  img_ship: {
    bg: "",
    fr: "",
    icon: "",
  },

  change_img(index) {
    //item = ship keys
    const target = document.getElementById(this.fleet_location);
    target.children[0].setAttribute("src", shiplist[index].bg);
    target.children[1].setAttribute("src", shiplist[index].fr);
    target.children[2].setAttribute("src", shiplist[index].icon);
  },
  getId(item, ship) {
    // item = col, ship = row
    // 0_1 => item 0, ship 1 (0 base)
    return item.toString() + "_" + ship.toString();
  },
  setId(id) {
    this.fleet_location = id;
  },
};

const fleet_container = Vue.createApp({});

fleet_container.component("item-container", {
  props: ["modal_type", "ship"],
  template: `
            <div class="col-md-auto fleet_box">
              <button
                class="select_block"
                type="button"
                data-bs-toggle="modal"
                :data-bs-target="modal_type">
                <img class="bg" :src="shiplist[back][ship].bg" />
                <img class="fr" :src="shiplist[back][ship]fr" />
                <img class="icon" :src="shiplist[back][ship]icon" />
              </button>
            </div>`,
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

fleet_container.component("ship-container", {
  props: ["number"],
  template: `
            <div class="row row_box">
              <item-container
              :modal_type="#shipselect"></item-container>
              <item-container
              v-for="index in 5"
              :key="index"
              :modal_type="#weaponselect"></item-container>
              <word-container
              v-for="skill in app.skills"
              :skill="skill"></word-container>
            </div>`,
});

fleet_container.component("fleet-container", {
  template: `
            <div class="container-fluid d-flex justify-content-center mt-5">
              <div class="p-2 bordershow">
                <ship-container
                v-for="index in 3"
                :key="index"></ship-container>
              </div>
            </div>`,
});

fleet_container.mount("#fleet-board");
/*------------------------------------------------*/
const select_ship = Vue.createApp({
  data() {
    return {
      shiplist: shiplist,
    };
  },
  methods: {
    return_ship_key(key) {
      app.ship_key = key;
      app.change_img;
      console.log(key);
    },
  },
});

select_ship.component("ship-select", {
  props: ["name", "bg", "fr", "icon", "ship_key"],
  template: `
            <div class="col-md-auto px-1">
              <div class="card card_style">
                <button 
                class="item_container" 
                data-bs-dismiss="modal">
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
