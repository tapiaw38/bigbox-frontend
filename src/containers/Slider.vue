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
      <img
        ref="image"
        v-for="image in images"
        :key="image"
        :src="image"
        alt=""
      />
    </div>
    <button @click="next" class="btn btn-right">&gt;</button>
  </div>
</template>

<script>
export default {
  name: "slider",
  props: {
    images: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  data: () => ({
    index: 0,
    transition: "transform 0.2s ease",
  }),
  methods: {
    next() {
      if (this.index === -this.width * (this.images.length - 1)) {
        this.index = 0;
      } else {
        this.transition = "transform 0.2s ease";
        this.index -= this.width;
      }
    },
    prev() {
      if (this.index === 0) {
        this.transition = "transform 0.2s ease";
        this.index = -this.width * (this.images.length - 1);
      } else {
        this.transition = "transform 0.2s ease";
        this.index += this.width;
      }
    },
  },
  computed: {
    width() {
      return this.$refs.image[0].width;
    },
  },
};
</script>

<style lang="scss" scoped>
.slider {
  width: 100%;
  height: auto;
  overflow: hidden;
  position: relative;
}
.container-slides {
  display: flex;
  img {
    width: 100%;
    height: auto;
  }
}

.btn {
  outline: none;
  border: none;
  width: 1.5em;
  height: 1.5em;
  border-radius: 50%;
  background-color: transparent;
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
  left: 0.2em;
}

.btn-right {
  top: 50%;
  transform: translateY(-50%);
  right: 0.2em;
}
</style>
