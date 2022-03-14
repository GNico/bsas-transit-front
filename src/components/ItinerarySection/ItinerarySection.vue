<template>
  <div>
    <b-dropdown aria-role="list" class="is-flex is-justify-content-right">
      <template #trigger="{ active }">
        <a :class="active ? 'has-text-primary' : 'has-text-link'">
          <b-icon icon="help-circle-outline" size="is-small" /> Instrucciones
        </a>
      </template>

      <b-dropdown-item aria-role="listitem" class="info-dropdown has-text-left">
        <div class="has-text-left is-size-7 mb-2">
          Escriba una dirección en la forma <b>[calle altura]</b> o un cruce de
          calles en la forma <b>[calle y calle]</b>. También puede agregar la
          ciudad, partido o localidad despues de una coma. <br />Ejemplo:
          <b>Corrientes 2000, Caba.</b> <br />Alternativamente, haga
          <b>Click derecho</b> en el mapa en la ubicación deseada.
        </div>
      </b-dropdown-item>
    </b-dropdown>

    <b-field
      :type="startError ? 'is-danger' : ''"
      :message="startError ? startError : ''"
    >
      <p class="control">
        <span class="button is-static">A</span>
      </p>
      <DirectionAutocomplete
        ref="startPosInput"
        v-model="startDirectionText"
        placeholder="Punto de partida"
        @select="changeStartPoint"
      />
    </b-field>
    <b-field
      :type="endError ? 'is-danger' : ''"
      :message="endError ? endError : ''"
    >
      <p class="control">
        <span class="button is-static">B</span>
      </p>
      <DirectionAutocomplete
        ref="endPosInput"
        v-model="endDirectionText"
        placeholder="Punto de llegada"
        @select="changeEndPoint"
      />
    </b-field>

    <b-button @click="findRoutes">Buscar</b-button>

    <ItineraryList
      class="mt-3"
      :itineraries="itineraries"
      @selected="$emit('update:selectedItinerary', $event)"
    />
  </div>
</template>

<script>
import api from "@/api/repository";
import DirectionAutocomplete from "./DirectionAutocomplete.vue";
import geoapi from "@/api/geosearch";
import isEmpty from "lodash/isEmpty";
import ItineraryList from "./ItineraryList.vue";

export default {
  name: "ItinerarySection",
  components: {
    ItineraryList,
    DirectionAutocomplete
  },
  props: {
    startPos: {
      type: Object,
      default: () => {
        return {};
      }
    },
    endPos: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      itineraries: [],
      startDirectionText: "",
      endDirectionText: "",
      selectedStartDirection: {},
      selectedEndDirection: {},
      startError: "",
      endError: ""
    };
  },
  computed: {},
  methods: {
    changeStartPoint(selected) {
      if (!selected) {
        this.$emit("update:startPos", {});
        return;
      }
      this.selectedStartDirection = selected;
      if (selected.tipo == "calle") {
        this.startError =
          "Solo ha seleccionado una calle. Indique altura o especifique un cruce de calles";
        this.$emit("update:startPos", {});
      } else {
        this.startError = "";
        this.$emit("update:startPos", {
          lat: selected.coordenadas.y,
          lng: selected.coordenadas.x
        });
      }
    },
    changeEndPoint(selected) {
      if (!selected) {
        this.$emit("update:endPos", {});
        return;
      }
      this.selectedEndDirection = selected;
      if (selected.tipo == "calle") {
        this.endError =
          "Solo ha seleccionado una calle. Indique altura o especifique un cruce de calles";
        this.$emit("update:endPos", {});
      } else {
        this.endError = "";
        this.$emit("update:endPos", {
          lat: selected.coordenadas.y,
          lng: selected.coordenadas.x
        });
      }
    },
    createUnknownDirection(lat, lng) {
      return {
        direccion: lat.toString() + " " + lng.toString(),
        coordenadas: {
          x: lng,
          y: lat
        }
      };
    },
    findRoutes() {
      this.itineraries = [];
      this.$emit("update:selectedItinerary", []);
      if (
        this.startPos.lat &&
        this.startPos.lng &&
        this.endPos.lat &&
        this.endPos.lng
      ) {
        api
          .getItineraries(
            this.startPos.lat,
            this.startPos.lng,
            this.endPos.lat,
            this.endPos.lng,
            1000
          )
          .then(response => (this.itineraries = response.data.itineraries))
          .catch(error => console.log(error));
      }
    }
  },
  watch: {
    startPos(newVal) {
      if (!isEmpty(newVal)) {
        if (
          isEmpty(this.selectedStartDirection) ||
          newVal.lat != this.selectedStartDirection.coordenadas.y ||
          newVal.lng != this.selectedStartDirection.coordenadas.x
        ) {
          geoapi
            .getDirection(newVal.lat, newVal.lng)
            .then(response => {
              this.$refs.startPosInput.setSelected(
                isEmpty(response.data)
                  ? this.createUnknownDirection(newVal.lat, newVal.lng)
                  : response.data
              );
            })
            .catch(error => console.log(error));
        }
      }
    },
    endPos(newVal) {
      if (!isEmpty(newVal)) {
        if (
          isEmpty(this.selectedEndDirection) ||
          newVal.lat != this.selectedEndDirection.coordenadas.y ||
          newVal.lng != this.selectedEndDirection.coordenadas.x
        ) {
          geoapi
            .getDirection(newVal.lat, newVal.lng)
            .then(response => {
              this.$refs.endPosInput.setSelected(
                isEmpty(response.data)
                  ? this.createUnknownDirection(newVal.lat, newVal.lng)
                  : response.data
              );
            })
            .catch(error => console.log(error));
        }
      }
    }
  }
};
</script>

<style>
.info-dropdown {
  white-space: break-spaces !important;
  padding-right: 0 !important;
}
</style>
