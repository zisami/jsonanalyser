<template>
  <div id="app">
    <div id="nav">
      <router-link to="/" name="home"> Home </router-link> |
      <router-link to="/about" name="about"> About </router-link>
    </div>
    <router-view />
  </div>
</template>
<script>
export default {
  metaInfo: {
     bodyAttrs: {
      lang: 'de'
    },
    title: "JSON Analyser",
    meta: [
      {
        name: "description",
        content: "Load, explore, analyse and understand your JSON.",
      },
      {
        property: "og:title",
        content: "JSON Analyser - own your data",
      },
      { property: "og:site_name", content: "JSON Analyser" },
      { property: "og:type", content: "website" },
      { name: "robots", content: "index,follow" },
    ],
  },
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
