<template>
  <div>
    <div class="card">
      <div class="card-image">
        <slot name="card-image"></slot>
      </div>

      <div class="card-title">
        <slot name="card-title"></slot>
      </div>

      <div class="card-location">
        <slot name="card-location"></slot>
      </div>

      <div class="card-description">
        <slot name="card-description"></slot>
      </div>

      <div class="card-pointer">
        <slot name="card-pointer"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.card {
  width: 100%;
  min-width: 250px;
  border-radius: 0.25rem;
  margin: 5%;
  &:hover {
    cursor: pointer;
    box-shadow: 0px 2px 22px -5px rgba(0, 0, 0, 0.72);
    -webkit-box-shadow: 0px 2px 22px -5px rgba(0, 0, 0, 0.72);
    -moz-box-shadow: 0px 2px 22px -5px rgba(0, 0, 0, 0.72);
  }
  .card-image {
    width: 100%;
  }
  .card-title {
    margin-top: 5%;
    margin-right: 2%;
  }
  .card-pointer {
    margin-top: 5%;
    margin-bottom: 5%;
  }
}
</style>
