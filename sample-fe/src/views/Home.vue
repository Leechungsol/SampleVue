<script setup>
// 1. Imports
// import HomeImage from "@/assets/images/SeoYeonHome.jpg";

// 2. Hooks

// 3. Define props, emits, models

// 4. Define refs and reactive variables

// 5. APIs

// 6. Computed properties

// 7. Watchers

// 8. Methods

// 9. Lifecycle hooks

// 10. Others
</script>

<template>
   <div class="home-page">
    <img :src="HomeImage" />
  </div> 
</template>

<style scoped lang="scss">
.home-page {
  display: flex;
  align-items: center;
  height: calc(100vh - 96px);

  img {
    width: -webkit-fill-available;
  }
}
</style>
