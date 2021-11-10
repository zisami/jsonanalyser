<template>
  <div id="app">
    <div
      id="nav"
      class="hidden"
    >
      <router-link to="/">
        Home
      </router-link> |
      <router-link to="/about">
        About
      </router-link>
    </div>
    <router-view />
  </div>
</template>
<script>


export default {
    data() {
        return {};
    },
    created: function () {},
};
</script>
<style lang="postcss">
body {
    @apply bg-gray-800;
    position: relative;
}
#app {
    @apply text-gray-300;
}

#nav {
    padding: 30px;

    a {
        font-weight: bold;
        color: #2c3e50;

        &.router-link-exact-active {
            color: #42b983;
        }
    }
}
</style>
