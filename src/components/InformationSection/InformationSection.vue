<template>
  <div>
    <div v-if="isEmptyPos" class="is-size-6">
      Para obtener información de una ubicación, <b>Click derecho</b> en el mapa
      y seleccione "Mas información"
    </div>

    <template v-else>
      <div class="columns mb-0">
        <div class="column is-4 has-text-weight-bold has-text-right">
          Lat
        </div>
        <div class="column has-text-left">
          {{ infoPos.lat }}
        </div>
      </div>

      <div class="columns mb-0">
        <div class="column is-4 has-text-weight-bold has-text-right">
          Lon
        </div>
        <div class="column has-text-left">
          {{ infoPos.lng }}
        </div>
      </div>

      <div
        class="columns mb-0"
        v-if="closeLines.busLines && closeLines.busLines.length"
      >
        <div class="column is-4 has-text-weight-bold has-text-right">
          Colectivos
        </div>
        <div class="column has-text-left">
          {{ closeLines.busLines.join(", ") }}
        </div>
      </div>

      <div
        class="columns mb-0"
        v-if="closeLines.subwayLines && closeLines.subwayLines.length"
      >
        <div class="column is-4 has-text-weight-bold has-text-right">
          Subte
        </div>
        <div class="column has-text-left">
          {{ closeLines.subwayLines.join(", ") }}
        </div>
      </div>

      <div
        class="columns mb-0"
        v-if="closeLines.trainLines && closeLines.trainLines.length"
      >
        <div class="column is-4 has-text-weight-bold has-text-right">
          Trenes
        </div>
        <div class="column has-text-left">
          {{ closeLines.trainLines.join(", ") }}
        </div>
      </div>

      <div v-if="loading">
        <i class="mdi mdi-loading icn-spinner"></i>
      </div>
      <div v-else-if="errorMsg" class="is-size-7">
        {{ errorMsg }}
      </div>

      <template v-else>
        <div class="columns mb-0" v-if="locationData.address.road">
          <div class="column is-4 has-text-weight-bold has-text-right">
            Calle
          </div>
          <div class="column has-text-left">
            {{ locationData.address.road }}
          </div>
        </div>

        <div class="columns mb-0" v-if="locationData.address.house_number">
          <div class="column is-4 has-text-weight-bold has-text-right">
            Número
          </div>
          <div class="column has-text-left">
            {{ locationData.address.house_number }}
          </div>
        </div>

        <div class="columns mb-0" v-if="locationData.address.postcode">
          <div class="column is-4 has-text-weight-bold has-text-right">
            Cod. Postal
          </div>
          <div class="column has-text-left">
            {{ locationData.address.postcode }}
          </div>
        </div>

        <div class="columns mb-0" v-if="locationData.address.state_district">
          <div class="column is-4 has-text-weight-bold has-text-right">
            Localidad
          </div>
          <div class="column has-text-left">
            {{ locationData.address.suburb }} -
            {{ locationData.address.state_district }}
          </div>
        </div>

        <div class="columns mb-0" v-if="locationData.address.state">
          <div class="column is-4 has-text-weight-bold has-text-right">
            Ciudad
          </div>
          <div class="column has-text-left">
            {{ locationData.address.state }}
          </div>
        </div>
      </template>
    </template>
  </div>
</template>

<script>
import isEmpty from "lodash/isEmpty";
import nominatim from "@/api/nominatim";
import transportapi from "@/api/repository";

export default {
  props: {
    infoPos: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      locationData: {},
      closeLines: {},
      loading: false,
      errorMsg: ""
    };
  },
  computed: {
    isEmptyPos() {
      return isEmpty(this.infoPos);
    }
  },
  methods: {},
  watch: {
    infoPos(newVal) {
      this.loading = true;
      nominatim
        .reverseGeosearch(newVal.lat, newVal.lng)
        .then(response => {
          this.locationData = response.data;
          this.loading = false;
          this.errorMsg = "";
        })
        .catch(error => {
          this.loading = false;
          this.errorMsg =
            "No se pudo obtener más información. Intente nuevamente.";
          console.log(error);
        });

      transportapi
        .getLinesCloseTo(newVal.lat, newVal.lng)
        .then(response => {
          this.closeLines = response.data;
        })
        .catch(error => {
          this.closestLines = {};
          console.log(error);
        });
    }
  }
};
</script>

<style>
.icn-spinner {
  animation: spin-animation 0.7s infinite;
  display: inline-block;
}

@keyframes spin-animation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(359deg);
  }
}
</style>
