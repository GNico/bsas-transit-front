<template>
  <b-collapse class="card" animation="slide" :open.sync="isOpen">
    <template #trigger="props">
      <div class="card-header" role="button">
        <div class="card-header-title">
          <b-icon
            class="header-icon"
            :icon="props.open ? 'menu-right' : 'menu-down'"
          />
          <span> Colectivo {{ line }} </span>
        </div>
        <a class="card-header-icon" @click="$emit('close')">
          <b-icon icon="close"> </b-icon>
        </a>
      </div>
    </template>
    <div class="card-content">
      <div class="content">
        <!-- Line routes display -->
        <div class="has-text-left" v-for="branch in sortedBranch" :key="branch">
          <div>
            <b>Ramal {{ branch }} </b>
          </div>
          <div class="is-flex is-flex-direction-column m-1">
            <b-checkbox
              v-for="item in routesByBranch[branch]"
              :key="item.routeId + item.tripSign"
              v-model="selectedRoutes"
              :native-value="item"
              size="is-small"
              class="mb-1"
              @input="onRouteSelection"
            >
              <div>
                <strong v-if="item.returnDirection">VUELTA</strong>
                <strong v-else>IDA</strong>
                - {{ item.tripSign }}
              </div>
            </b-checkbox>
          </div>
        </div>
      </div>
    </div>
  </b-collapse>
</template>

<script>
export default {
  props: {
    routes: {
      type: Array,
      default: () => []
    },
    line: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      isOpen: true,
      selectedRoutes: []
    };
  },
  computed: {
    routesByBranch() {
      var result = {};
      this.routes.forEach(route => {
        if (Object.prototype.hasOwnProperty.call(result, route.branch)) {
          result[route.branch].push(route);
        } else {
          result[route.branch] = [route];
        }
      });
      return result;
    },
    sortedBranch() {
      return Object.keys(this.routesByBranch).sort();
    }
  },
  methods: {
    onRouteSelection() {
      this.$emit("select", this.selectedRoutes);
    }
  },
  watch: {
    routes: {
      immediate: true,
      handler: function() {
        this.$nextTick(() => {
          this.selectedRoutes = [this.routesByBranch[this.sortedBranch[0]][0]];
          this.onRouteSelection();
        });
      }
    }
  }
};
</script>

<style>
.header-icon {
  line-height: 0.5;
}
</style>
