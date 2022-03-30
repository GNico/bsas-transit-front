<template>
  <b-autocomplete
    expanded
    ref="autocomplete"
    :value="value"
    @input="$emit('input', $event)"
    :data="verifiedData"
    :placeholder="placeholder"
    field="direccion"
    :loading="isFetching"
    @typing="getAsyncData"
    @select="option => $emit('select', option)"
  >
    <template #empty>
      <div v-if="isFetching">
        Buscando...
      </div>
    </template>
    <template #default="{option}">
      <div style="white-space: break-spaces">
        {{ option.direccion }}
      </div>
    </template>
  </b-autocomplete>
</template>

<script>
import geoapi from "@/api/geosearch";
import debounce from "lodash/debounce";

export default {
  props: {
    value: {
      type: String,
      default: ""
    },
    placeholder: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      inp: "",
      data: [],
      isFetching: false
    };
  },
  computed: {
    verifiedData() {
      return this.data.filter(direction =>
        Object.prototype.hasOwnProperty.call(direction, "coordenadas")
      );
    }
  },
  methods: {
    getAsyncData: debounce(function(name) {
      if (!name.length) {
        this.data = [];
        return;
      }
      this.isFetching = true;
      geoapi
        .getSuggestions(name)
        .then(({ data }) => {
          this.data = [];
          data.direccionesNormalizadas.forEach(item => this.data.push(item));
        })
        .catch(error => {
          this.data = [];
          throw error;
        })
        .finally(() => {
          this.isFetching = false;
        });
    }, 500),

    setSelected(option) {
      this.$refs.autocomplete.setSelected(option);
    }
  }
};
</script>
