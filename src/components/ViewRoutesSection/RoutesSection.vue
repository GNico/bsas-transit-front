<template>
  <div>
    <div class="is-flex is-justify-content-space-evenly">
      <b-field>
        <b-select
          @input="onBusLineSelection"
          size="is-small"
          v-model="busValue"
        >
          <option class="is-paddingless" value="none" key="none">Colectivo</option>
          <option class="is-paddingless" v-for="line in busLines" :value="line" :key="line">
            {{ line }}
          </option>
        </b-select>
      </b-field>

      <b-field>
        <b-select
          @input="onSubwayLineSelection"
          size="is-small"
          v-model="subwayValue"
        >
          <option class="is-paddingless" value="none">Subte</option>
          <option class="is-paddingless" v-for="line in subwayLines" :value="line" :key="line">
            {{ line }}
          </option>
        </b-select>
      </b-field>

      <b-field>
        <b-select
          @input="onTrainLineSelection"
          size="is-small"
          v-model="trainValue"
        >
          <option class="is-paddingless" value="none" key="none">Tren</option>
          <option class="is-paddingless" v-for="line in trainLines" :value="line" :key="line">
            {{ line }}
          </option>
        </b-select>
      </b-field>
    </div>

    <RoutesCards
      :routes="routes"
      @select="event => $emit('select', event)"
      @close="deleteRoute"
    />
  </div>
</template>

<script>
import api from "@/api/repository";
import RoutesCards from "./RoutesCards.vue";

export default {
  name: "RoutesSection",
  components: {
    RoutesCards
  },
  data() {
    return {
      busLines: [],
      subwayLines: [],
      trainLines: [],
      routes: [],
      busValue: "none",
      subwayValue: "none",
      trainValue: "none"
    };
  },
  methods: {
    onBusLineSelection(line) {
      if (line) {
        this.$nextTick(() => (this.busValue = "none"));
        if (this.addToFrontIfExists(line, "bus")) return;
        api
          .getBusRoutesForLine(line)
          .then(response => {
            let route = response.data;
            route["type"] = "bus";
            this.routes.unshift(route);
          })
          .catch(error => console.log(error));
      }
    },
    onSubwayLineSelection(line) {
      if (line) {
        this.$nextTick(() => (this.subwayValue = "none"));
        if (this.addToFrontIfExists(line, "subway")) return;
        api
          .getSubwayRoutesForLine(line)
          .then(response => {
            let route = response.data;
            route["type"] = "subway";
            this.routes.unshift(route);
          })
          .catch(error => console.log(error));
      }
    },

    onTrainLineSelection(line) {
      if (line) this.$nextTick(() => (this.trainValue = "none"));
    },

    addToFrontIfExists(line, type) {
      var idx = this.routes.findIndex(
        elem => elem.type + elem.line == type + line
      );
      if (idx > -1) {
        var existent = this.routes[idx];
        this.routes.splice(idx, 1);
        this.routes.unshift(existent);
        return true;
      }
      return false;
    },
    clearRoutes() {
      this.routes = [];
    },
    deleteRoute(id) {
      var idx = this.routes.findIndex(elem => elem.type + elem.line == id);
      if (idx > -1) this.routes.splice(idx, 1);
    }
  },
  created() {
    api
      .getLines()
      .then(response => {
        this.busLines = response.data.busLines;
        this.subwayLines = response.data.subwayLines;
        this.trainLines = response.data.trainLines;
      })
      .catch(error => console.log(error));
  }
};
</script>
