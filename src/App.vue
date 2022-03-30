<template>
  <div id="app">
    <b-navbar type="is-light">
      <template #brand>
        <b-navbar-item>
          <img src="@/assets/bondilogo.png"/>
        </b-navbar-item>
      </template>

      <template #start>
        <b-navbar-item href="#" @click="sectionIndex = 0" style="border-left: 2px solid rgba(0,0,0,0.1)">
          Recorridos
        </b-navbar-item>
        <b-navbar-item href="#" @click="sectionIndex = 1">
          Como llegar
        </b-navbar-item>
        <b-navbar-item href="#" @click="sectionIndex = 2">
          Información
        </b-navbar-item>
      </template>
    </b-navbar>

    <Home :sectionIndex="sectionIndex" />
  </div>
</template>

<script>
import Home from "@/views/Home";

export default {
  components: {
    Home
  },
  data() {
    return {
      sectionIndex: 0
    };
  }
};
</script>

<style>
html {
  overflow: hidden !important;
}

body {
  min-height: 100vh;
  background: #ddd;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
