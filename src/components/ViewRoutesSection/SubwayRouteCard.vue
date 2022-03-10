<template>
  <b-collapse class="card" animation="slide" :open.sync="isOpen">
    <template #trigger="props">
      <div class="card-header" role="button">
        <div class="card-header-title">
          <b-icon
            class="header-icon"
            :icon="props.open ? 'menu-right' : 'menu-down'"
          />
          <span> Subte {{ route.line }} </span>
        </div>
        <a class="card-header-icon" @click="$emit('close')">
          <b-icon icon="close"> </b-icon>
        </a>
      </div>
    </template>
    <div class="card-content">
      <div class="content">
        <div class="has-text-left">
          <b-checkbox
            v-model="selectedRoutes"
            :native-value="route"
            size="is-small"
            class="mb-1"
            @input="onRouteSelection"
          >
            {{ route.name }}
          </b-checkbox>
        </div>
      </div>
    </div>
  </b-collapse>
</template>

<script>
export default {
  props: {
    route: {
      type: Object,
      default: () => {
        return {};
      }
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
          this.selectedRoutes = [this.route];
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
