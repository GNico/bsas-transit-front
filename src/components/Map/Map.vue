<template>
  <l-map
    :zoom="zoom"
    :center="center"
    :options="mapOptions"
    @update:center="centerUpdate"
    @update:zoom="zoomUpdate"
    @contextmenu="onRightClick"
  >
    <l-tile-layer :url="url" :attribution="attribution" />

    <CustomIconMarker color="blue" iconClass="mdi-alpha-a" iconColor="blue">
      <l-marker
        v-if="startPos.lat && startPos.lng"
        slot-scope="{ customIcon }"
        :icon="customIcon"
        :lat-lng="startPos"
        visible
        draggable
        @dragend="$emit('update:startPos', $event.target._latlng)"
      />
    </CustomIconMarker>

    <CustomIconMarker color="blue" iconClass="mdi-alpha-b" iconColor="blue">
      <l-marker
        v-if="endPos.lat && endPos.lng"
        slot-scope="{ customIcon }"
        :icon="customIcon"
        :lat-lng="endPos"
        visible
        draggable
        @dragend="$emit('update:endPos', $event.target._latlng)"
      />
    </CustomIconMarker>

    <CustomIconMarker
      color="purple"
      iconClass="mdi-information-variant"
      iconColor="purple"
    >
      <l-marker
        v-if="infoPos.lat && infoPos.lng"
        slot-scope="{ customIcon }"
        :icon="customIcon"
        :lat-lng="infoPos"
        visible
        draggable
        @dragend="$emit('update:infoPos', $event.target._latlng)"
      />
    </CustomIconMarker>

    <slot name="routes"> </slot>

    <slot name="itinerary"> </slot>
  </l-map>
</template>

<script>
import { latLng, GeoJSON } from "leaflet";
import { LMap, LTileLayer, LMarker } from "vue2-leaflet";
import CustomIconMarker from "./CustomIconMarker";

export default {
  name: "Map",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    CustomIconMarker
  },
  props: {
    startPos: {
      type: Object,
      default: () => ({})
    },
    endPos: {
      type: Object,
      default: () => ({})
    },
    infoPos: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      zoom: 12,
      center: latLng(-34.6, -58.45),
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      currentZoom: 12,
      currentCenter: latLng(-34.6, -58.45),
      mapOptions: {
        zoomSnap: 0.25,
        doubleClickZoom: false
      }
    };
  },
  computed: {},
  methods: {
    zoomUpdate(zoom) {
      this.currentZoom = zoom;
    },
    centerUpdate(center) {
      this.currentCenter = center;
    },
    coordsToLatLngs(coords) {
      return GeoJSON.coordsToLatLngs(coords);
    },
    onRightClick(event) {
      this.$emit("rightclick", {
        event: event.originalEvent,
        data: event.latlng
      });
    }
  }
};
</script>

<style>
.leaflet-grab {
  cursor: auto !important;
}
</style>
