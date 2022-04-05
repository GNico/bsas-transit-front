<template>
  <div class="">
    <div class="home columns is-gapless is-padingless">
      <!--Left sidebar -->
      <div class="column is-3 sidebar">
        <RoutesSection
          v-show="sectionIndex == 0"
          class="p-2 pt-4"
          @select="selected => (selectedRoutes = selected)"
        />

        <ItinerarySection
          v-show="sectionIndex == 1"
          class="p-2 pt-4"
          :startPos.sync="startPos"
          :endPos.sync="endPos"
          @update:selectedItinerary="selectedItinerary = $event"
        />

        <InformationSection
          v-show="sectionIndex == 2"
          class="p-2 pt-4"
          :infoPos.sync="infoPos"
        />
      </div>

      <!-- Map section -->
      <div class="column map-container ">
        <Map
          :startPos.sync="startPos"
          :endPos.sync="endPos"
          :infoPos.sync="infoPos"
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
        <ContextMenuItem @click.native="setInfoPosMenu(contextData)">
          Mas información...
        </ContextMenuItem>
        <ContextMenuItem @click.native="clearAll">
          Limpiar puntos marcados
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
import InformationSection from "@/components/InformationSection/InformationSection.vue";

export default {
  name: "Home",
  components: {
    ContextMenu,
    ContextMenuItem,
    Map,
    MapRoutes,
    MapItinerary,
    RoutesSection,
    ItinerarySection,
    InformationSection
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
      infoPos: {},
      selectedItinerary: []
    };
  },
  methods: {
    setStartPosMenu(pos) {
      this.startPos = pos;
      this.$refs.menu.close();
      this.$emit("update:sectionIndex", 1);
    },
    setEndPosMenu(pos) {
      this.endPos = pos;
      this.$refs.menu.close();
      this.$emit("update:sectionIndex", 1);
    },
    setInfoPosMenu(pos) {
      this.infoPos = pos;
      this.$refs.menu.close();
      this.$emit("update:sectionIndex", 2);
    },
    clearAll() {
      this.startPos = {};
      this.endPos = {};
      this.infoPos = {};
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
