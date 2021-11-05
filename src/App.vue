<template>
  <div id="app">
    <transition name="fade">
      <router-view />
    </transition>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style lang="scss">
#app {
  font-family: Sofia Pro W01, sans-serif !important;
  color: #464646;
  text-align: center;
}
body {
  background-color: $white;
}
.container {
  margin-top: 3%;
  margin-left: 13%;
  margin-right: 13%;
  @media (max-width: 850px) {
    margin-left: 5%;
    margin-right: 5%;
  }
}
</style>
