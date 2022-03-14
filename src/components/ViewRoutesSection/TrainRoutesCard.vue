<template>
  <b-collapse class="card" animation="slide" :open.sync="isOpen">
    <template #trigger="props">
      <div class="card-header" role="button">
        <div class="card-header-title">
          <b-icon
            class="header-icon"
            :icon="props.open ? 'menu-right' : 'menu-down'"
          />
          <span> Tren {{ line }} </span>
        </div>
        <a class="card-header-icon" @click="$emit('close')">
          <b-icon icon="close"> </b-icon>
        </a>
      </div>
    </template>
    <div class="card-content">
      <div class="content">
        <div>
          <b>Ramales</b>
        </div>
        <!-- Line routes display -->
        <div class="is-flex is-flex-direction-column m-1">
          <div
            class="has-text-left"
            v-for="item in routes"
            :key="item.uniqueRouteId"
          >
            <b-checkbox
              v-model="selectedRoutes"
              :native-value="item"
              size="is-small"
              class="mb-1"
              @input="onRouteSelection"
            >
              <div>
                {{ item.branch }}
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
  computed: {},
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
          this.selectedRoutes = [this.routes[0]];
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
