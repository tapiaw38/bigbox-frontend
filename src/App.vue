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
</style>
