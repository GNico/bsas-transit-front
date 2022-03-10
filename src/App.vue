<template>
  <div id="app">
    <b-navbar type="is-primary">
      <template #brand>
        <b-navbar-item>
          <img
            src="https://raw.githubusercontent.com/buefy/buefy/dev/static/img/buefy-logo.png"
            alt="Lightweight UI components for Vue.js based on Bulma"
          />
        </b-navbar-item>
      </template>

      <template #start>
        <b-navbar-item href="#" @click="sectionIndex = 0">
          Consultar recorridos
        </b-navbar-item>
        <b-navbar-item href="#" @click="sectionIndex = 1">
          Como llegar
        </b-navbar-item>
      </template>
    </b-navbar>

    <Home :sectionIndex="sectionIndex" />

    <!--  <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> 
    <router-view />-->
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
  background: #aaa;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
