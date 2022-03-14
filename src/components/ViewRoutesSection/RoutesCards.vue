<template>
  <div>
    <div v-for="route in routes" :key="route.type + route.line" class="mb-2">
      <BusRoutesCard
        v-if="route.type == 'bus'"
        :routes="route.routes"
        :line="route.line"
        @select="changeSelectedRoutes($event, route.type + route.line)"
        @close="removeLineRoutes(route.type + route.line)"
      />

      <SubwayRouteCard
        v-if="route.type == 'subway'"
        :route="route.route"
        @select="changeSelectedRoutes($event, route.type + route.line)"
        @close="removeLineRoutes(route.type + route.line)"
      />

      <TrainRoutesCard
        v-if="route.type == 'train'"
        :routes="route.routes"
        :line="route.line"
        @select="changeSelectedRoutes($event, route.type + route.line)"
        @close="removeLineRoutes(route.type + route.line)"
      />
    </div>
  </div>
</template>

<script>
import BusRoutesCard from "./BusRoutesCard.vue";
import SubwayRouteCard from "./SubwayRouteCard.vue";
import TrainRoutesCard from "./TrainRoutesCard.vue";

export default {
  components: {
    BusRoutesCard,
    SubwayRouteCard,
    TrainRoutesCard
  },
  props: {
    routes: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      selectedRoutesByKey: {}
    };
  },
  computed: {},
  methods: {
    removeLineRoutes(key) {
      delete this.selectedRoutesByKey[key];
      this.emitSelected();
      this.$emit("close", key);
    },
    changeSelectedRoutes(selected, key) {
      this.selectedRoutesByKey[key] = selected;
      this.emitSelected();
    },
    emitSelected() {
      var selectedFlat = [];
      Object.values(this.selectedRoutesByKey).forEach(subarray => {
        selectedFlat = selectedFlat.concat(subarray);
      });
      this.$emit("select", selectedFlat);
    }
  }
};
</script>
