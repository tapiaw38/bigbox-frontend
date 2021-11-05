<template>
  <div class="slider">
    <button @click="prev" class="btn btn-left">&lt;</button>
    <div
      class="container-slides"
      :style="{
        transform: `translateX(${index}px)`,
        transition: `${transition}`,
      }"
    >
      <card
        class="cardList"
        v-for="card in cards"
        :key="card.id"
        ref="cardSlider"
      >
        <template v-slot:card-image>
          <div class="content-image">
            <img :src="JSON.parse(card.activity).image[0]" alt="" />
          </div>
        </template>

        <template v-slot:card-title>
          <div class="content-middle">
            <h1>{{ card.title }}</h1>

            <icon
              v-if="JSON.parse(card.activity).participants === 1"
              class="icon-person"
              name="person"
            />
            <icon v-else class="icon-person" name="persons" />
          </div>
        </template>

        <template v-slot:card-location>
          <div
            v-for="(location, index) in JSON.parse(card.activity).locations"
            :key="index"
            class="content-location"
          >
            <icon class="icon-location" name="location" />
            <p>{{ location.address }}, {{ location.province }}</p>
          </div>
        </template>

        <template v-slot:card-description>
          <p>{{ JSON.parse(card.activity).category }}</p>
        </template>

        <template v-slot:card-pointer>
          <h2 class="pointer">{{ card.points }} Puntos</h2>
        </template>
      </card>
    </div>
    <button @click="next" class="btn btn-right">&gt;</button>
  </div>
</template>

<script>
import Icon from "../components/icons/Icon.vue";
export default {
  name: "slider",
  props: {
    cards: {
      type: Array,
      required: true,
      default: () => [],
    },
    columns: {
      type: Number,
      required: false,
      default: 1,
    },
  },
  components: {
    Card: () => import("../components/Card.vue"),
    Icon,
  },
  data: () => ({
    index: 0,
    transition: "transform 0.2s ease",
  }),
  methods: {
    next() {
      if (this.cards.length < this.columns) return;
      else if (this.index === -this.width * (this.cards.length - 1)) {
        this.index = 0;
      } else {
        this.transition = "transform 0.2s ease";
        this.index -= this.width;
      }
    },
    prev() {
      if (this.cards.length < this.columns) return;
      else if (this.index === 0) {
        this.transition = "transform 0.2s ease";
        this.index = -this.width * (this.cards.length - 1);
      } else {
        this.transition = "transform 0.2s ease";
        this.index += this.width;
      }
    },
  },
  computed: {
    width() {
      console.log(this.cards);
      return this.$refs.cardSlider[0].$el.clientWidth;
    },
  },
};
</script>

<style lang="scss" scoped>
.slider {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}
.container-slides {
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn {
  outline: none;
  border: none;
  width: 1.5em;
  height: 1.5em;
  border-radius: 50%;
  background-color: rgba(73, 70, 70, 0.349);
  color: $white;
  display: block;
  position: absolute;
  z-index: 100;
  cursor: pointer;
  font-size: 2em;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    color: $gray;
    background-color: rgba(255, 255, 255, 0.418);
  }
}

.btn-left {
  top: 50%;
  transform: translateY(-50%);
  left: 0em;
}

.btn-right {
  top: 50%;
  transform: translateY(-50%);
  right: 0em;
}

/* card styles */

.cardList {
  margin: 30px;
}

h1,
p {
  text-align: left;
  font-size: 0.8em;
  font-weight: lighter;
  margin: 2%;
}
h1 {
  font-size: 0.8em;
  font-weight: bold;
}

img {
  width: 100%;
  object-fit: cover;
  height: max(2rem, 20vh);
}
.content-image {
  background-color: #f5f5f5;
  height: max(2rem, 20vh);
}
.pointer {
  margin-left: 2%;
  padding-bottom: 5%;
  font-size: 0.8em;
  font-weight: bolder;
  text-align: left;
}
.content-middle {
  width: 100%;
  display: flex;
  justify-content: space-between;
  position: relative;
  .icon-person {
    margin-top: 3%;
  }
}
.content-location {
  display: flex;
  align-items: center;
  .icon-location {
    margin-left: 2%;
    margin-right: 1%;
  }
}
</style>
