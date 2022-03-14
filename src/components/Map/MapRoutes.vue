<template>
  <div>
    <template v-for="item in routes">
      <l-polyline
        v-if="item.type == 'bus'"
        :key="item.uniqueRouteId"
        :lat-lngs="coordsToLatLngs(item.path.coordinates)"
        :color="item.returnDirection ? 'blue' : 'red'"
        :weight="5"
      ></l-polyline>

      <l-polyline
        v-if="item.type == 'train'"
        :key="item.uniqueRouteId"
        :lat-lngs="coordsToLatLngs(item.path.coordinates)"
        color="purple"
        :weight="5"
      ></l-polyline>

      <template v-if="item.type == 'subway'">
        <l-polyline
          :key="item.uniqueRouteId"
          :lat-lngs="coordsToLatLngs(item.path.coordinates)"
          :color="'#' + item.color"
          :weight="7"
        ></l-polyline>

        <StationMarker
          v-for="stop in item.stops"
          :key="stop.code"
          :color="'#' + item.color"
          iconClass="mdi-subway-variant"
          :iconColor="'#' + item.color"
        >
          <l-marker
            slot-scope="{ customIcon }"
            :icon="customIcon"
            :lat-lng="[
              stop.location.coordinates[1],
              stop.location.coordinates[0]
            ]"
            visible
          />
        </StationMarker>
      </template>
    </template>
  </div>
</template>

<script>
import { GeoJSON } from "leaflet";
import { LPolyline, LMarker } from "vue2-leaflet";
import StationMarker from "./StationMarker";

export default {
  components: {
    LPolyline,
    LMarker,
    StationMarker
  },
  props: {
    routes: {
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
