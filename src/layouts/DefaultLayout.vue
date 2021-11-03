<template>
  <div>
    <slot>
      <router-view></router-view>
    </slot>
  </div>
</template>

<script>
export default {
  name: "DefaultLayout",
};
</script>
