<template>
  <div class="">
    <div class="home columns is-gapless is-padingless">
      <!--Left sidebar -->
      <div class="column is-3 sidebar">
        <RoutesSection
          v-show="sectionIndex == 0"
          class="p-2"
          @select="selected => (selectedRoutes = selected)"
        />

        <ItinerarySection
          v-show="sectionIndex == 1"
          class="p-2"
          :startPos.sync="startPos"
          :endPos.sync="endPos"
          @update:selectedItinerary="selectedItinerary = $event"
        />
      </div>

      <!-- Map section -->
      <div class="column map-container ">
        <Map
          :startPos.sync="startPos"
          :endPos.sync="endPos"
          @rightclick="$refs.menu.open($event.event, $event.data)"
        >
          <template #routes>
            <MapRoutes :routes="selectedRoutes" />
          </template>

          <template #itinerary>
            <MapItinerary :itinerary="selectedItinerary" />
          </template>
        </Map>
      </div>
    </div>

    <!-- Map right click menu -->
    <ContextMenu id="menu" ref="menu">
      <template slot-scope="{ contextData }">
        <ContextMenuItem @click.native="setStartPosMenu(contextData)">
          Marcar ubicación de partida 
        </ContextMenuItem>
        <ContextMenuItem @click.native="setEndPosMenu(contextData)">
          Marcar ubicación de destino 
        </ContextMenuItem>
        <ContextMenuItem @click.native="$refs.menu.close">
          Buscar lineas cercanas
        </ContextMenuItem>
      </template>
    </ContextMenu>
  </div>
</template>

<script>
import ContextMenu from "@/components/ContextMenu/ContextMenu";
import ContextMenuItem from "@/components/ContextMenu/ContextMenuItem";
import Map from "@/components/Map/Map.vue";
import MapRoutes from "@/components/Map/MapRoutes.vue";
import MapItinerary from "@/components/Map/MapItinerary.vue";
import RoutesSection from "@/components/ViewRoutesSection/RoutesSection.vue";
import ItinerarySection from "@/components/ItinerarySection/ItinerarySection.vue";

export default {
  name: "Home",
  components: {
    ContextMenu,
    ContextMenuItem,
    Map,
    MapRoutes,
    MapItinerary,
    RoutesSection,
    ItinerarySection
  },
  props: {
    sectionIndex: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      selectedRoutes: [],
      startPos: {},
      endPos: {},
      selectedItinerary: []
    };
  },
  methods: {
    setStartPosMenu(pos) {
      this.startPos = pos;
      this.$refs.menu.close();
    },
    setEndPosMenu(pos) {
      this.endPos = pos;
      this.$refs.menu.close();
    }
  },
  mounted() {
    var menu = document.getElementById("menu");
    document.firstElementChild.appendChild(menu);
  }
};
</script>

<style>
.map-container {
  height: calc(100vh - 3.5rem);
  width: 100%;
}

.sidebar {
  height: calc(100vh - 3.5rem);
  overflow-y: auto;
}
</style>
