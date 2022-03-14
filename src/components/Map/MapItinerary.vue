<template>
  <div>
    <div v-for="(step, i) in itinerary" :key="i">
      <l-polyline
        v-if="step.type == 'bus'"
        :lat-lngs="coordsToLatLngs(step.busRoute.path.coordinates)"
        color="red"
        :weight="8"
        :opacity="0.8"
      ></l-polyline>

      <l-polyline
        v-if="step.type == 'subway'"
        :lat-lngs="coordsToLatLngs(step.subwayRoute.path.coordinates)"
        :color="'#' + step.subwayRoute.color"
        :weight="9"
        :opacity="0.8"
      ></l-polyline>

      <l-polyline
        :key="i"
        :lat-lngs="coordsToLatLngs(step.travelPath.coordinates)"
        color="blue"
        dashArray="7"
      ></l-polyline>
    </div>
  </div>
</template>

<script>
import { GeoJSON } from "leaflet";
import { LPolyline } from "vue2-leaflet";

export default {
  components: {
    LPolyline
  },
  props: {
    itinerary: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    coordsToLatLngs(coords) {
      return GeoJSON.coordsToLatLngs(coords);
    }
  }
};
</script>
