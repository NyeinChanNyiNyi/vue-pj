const Covers = {
  template: `
  <div class="img-sty">
    <img :src="image" alt="" @click="click" @click="imgCount">
  </div>
  `,
  props: ["image"],
  methods: {
    click() {
      this.$emit("chosen", this.image);
    },
    imgCount() {
      this.$emit("imagecount", this.image);
    },
  },
};

const Games = Vue.createApp({
  components: { Covers },
  template: `
  <div style="display:flex;align-items:center;justify-content:center" class="imgshow">
  <covers v-for="image in coverimg" :image="image" @chosen="addImg" @imagecount="countAdd">
  </covers>
  </div>

  <hr></hr>

  <div style="display:flex;align-items:center;justify-content:center;margin:15px" class="countshow">
    <p v-show="imgOne>0">img1 <span>{{imgOne}}</span></p>
    <p v-show="imgTwo>0">img2 <span>{{imgTwo}}</span></p>
    <p v-show="imgThree>0">img3 <span>{{imgThree}}</span></p>
    <p  v-show="imgFour>0">img4 <span>{{imgFour}}</span></p>
    <div v-show="totalimg>0">Total {{totalimg}}</div>
    <div v-show="totalimg>0" style="cursor:pointer;background:grey;color:#fff;margin-left:15px" @click="undo">Undo</div>
  </div>

  <div class="grid-show">
  <covers v-for="image in imgHistory" :image="image">
  </covers>
  </div>



  
  `,

  data() {
    return {
      coverimg: [
        "images/top1.jpg",
        "images/top2.jpg",
        "images/top3.jpg",
        "images/top4.jpg",
      ],
      imgHistory: [],
      imgOne: 0,
      imgTwo: 0,
      imgThree: 0,
      imgFour: 0,
    };
  },

  methods: {
    addImg(img) {
      this.imgHistory.push(img);
    },
    countAdd(img) {
      if (img == "images/top1.jpg") {
        this.imgOne++;
      } else if (img == "images/top2.jpg") {
        this.imgTwo++;
      } else if (img == "images/top3.jpg") {
        this.imgThree++;
      } else if (img == "images/top4.jpg") {
        this.imgFour++;
      }
    },

    undo() {
      this.imgHistory.pop();
      if (this.imgHistory[this.imgHistory.length-1] == "images/top1.jpg") {
        this.imgOne--;
      } else if (this.imgHistory[this.imgHistory.length - 1] == "images/top2.jpg") {
        this.imgTwo--;
      } else if (this.imgHistory[this.imgHistory.length - 1] == "images/top3.jpg") {
        this.imgThree--;
      } else if (this.imgHistory[this.imgHistory.length - 1] == "images/top4.jpg") {
        this.imgFour--;
      }
    },
  },

  computed: {
    totalimg() {
      return this.imgHistory.length;
    },
  },
});

Games.mount("#app");
