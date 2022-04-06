<template>
  <div>
    <b-collapse
      class="card"
      animation="slide"
      v-for="(itinerary, akey) of itineraryContent"
      :key="akey"
      :open="isOpen == akey"
      @open="openItinerary(akey)"
      @close="closeItinerary(akey)"
    >
      <template #trigger="props">
        <div class="card-header" role="button">
          <div class="card-header-title">
            {{ itinerary.header }}
          </div>
          <a class="card-header-icon">
            <b-icon :icon="props.open ? 'menu-down' : 'menu-up'"></b-icon>
          </a>
        </div>
      </template>
      <div class="card-content">
        <div v-for="(step, ind) in itinerary.steps" :key="ind" class="media">
          <div
            class="media-left is-flex is-flex-direction-column is-align-items-center"
          >
            <b-icon :icon="step.iconClass" size="is-small"> </b-icon>
          </div>

          <div
            class="media-content is-size-7 has-text-left is-flex is-flex-direction-column"
          >
            <span> {{ step.text }} </span>
            <span>
              Distancia: <b>{{ formatDistance(step.travelDistance) }}</b>
            </span>
            <template v-if="step.branches">
              <strong> Ramales: </strong>

              <span v-for="(b, k) of step.branches" :key="k">
                <b>{{ b.branch }} </b> - {{ b.tripSign }}
              </span>
            </template>
          </div>
        </div>
      </div>
    </b-collapse>
  </div>
</template>

<script>
import cloneDeep from "lodash/cloneDeep";

const stepsDefinition = {
  foot: {
    iconClass: "walk",
    // eslint-disable-next-line
    getStepHeader: step => "",
    // eslint-disable-next-line
    getText: step => "Caminar."
  },
  bus: {
    iconClass: "bus",
    getStepHeader: step => "Colectivo " + step.busRoute.line,
    getText: step => "Tomar colectivo linea " + step.busRoute.line + "."
  },
  subway: {
    iconClass: "subway-variant",
    getStepHeader: step => "Subte " + step.subwayRoute.line,
    getText: step => "Tomar subte linea " + step.subwayRoute.line + "."
  }
};

export default {
  props: {
    itineraries: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      isOpen: 0
    };
  },

  computed: {
    groupedItineraries() {
      var grouped = {};
      this.itineraries.forEach(it => {
        if (Object.prototype.hasOwnProperty.call(grouped, it.cost)) {
          grouped[it.cost].push(cloneDeep(it));
        } else {
          grouped[it.cost] = [cloneDeep(it)];
        }
      });
      return grouped;
    },

    itineraryContent() {
      var allContent = {};
      var grouped = this.groupedItineraries;
      for (const key in grouped) {
        //get all bus branches
        var branches = [];
        grouped[key].forEach(itin => {
          itin.steps.forEach(step => {
            if (step.type == "bus")
              branches.push({
                branch: step.busRoute.branch,
                desc: step.busRoute.description,
                tripSign: step.busRoute.tripSign
              });
          });
        });

        //get only first itinerary from each group
        var mainIt = grouped[key][0];
        var header = "";
        var steps = [];
        mainIt.steps.forEach(step => {
          header = header + stepsDefinition[step.type].getStepHeader(step);
          steps.push({
            iconClass: stepsDefinition[step.type].iconClass,
            startLocation: step.startLocation,
            endLocation: step.endLocation,
            travelDistance: step.travelDistance,
            busRoute: step.busRoute,
            text: stepsDefinition[step.type].getText(step),
            branches: step.type == "bus" ? branches : null
          });
        });
        var content = {
          header: header,
          steps: steps
        };
        allContent[key] = content;
      }
      return allContent;
    }
  },
  methods: {
    formatDistance(distMeters) {
      var dist = distMeters.toString() + " m";
      if (distMeters > 1000)
        dist = (distMeters / 1000).toFixed(1).toString() + " km";
      return dist;
    },
    openItinerary(akey) {
      if (this.isOpen != akey) {
        this.isOpen = akey;
        this.$emit("selected", this.groupedItineraries[this.isOpen][0].steps);
      }
    },
    closeItinerary(akey) {
      if (this.isOpen == akey) {
        this.isOpen = 0;
        this.$emit("selected", []);
      }
    }
  },
  watch: {
    isOpen(newVal) {
      if (newVal) {
        console.log(newVal);
      }
    }
  }
};
</script>
