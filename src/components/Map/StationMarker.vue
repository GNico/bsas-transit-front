<script>
import { divIcon } from "leaflet";

export default {
  props: {
    color: {
      type: String,
      default: "#000000"
    },
    iconClass: {
      type: String,
      default: "mdi-bus"
    },
    iconColor: {
      type: String,
      default: "#000000"
    }
  },
  computed: {
    icon() {
      return divIcon({
        className: "subway-custom-div-icon",
        html: `<div class="icon-scaled"><div style='border-color:${this.color}; background:${this.backgroundColor};' class='subway-marker-pin'></div>
          <i class='mdi ${this.iconClass}' style='color: ${this.iconColor}'></i></div>`,
        iconSize: [30, 30],
        iconAnchor: [15, 30]
      });
    },
    backgroundColor() {
      var color =
        this.iconColor.charAt(0) === "#"
          ? this.iconColor.substring(1, 7)
          : this.iconColor;
      var r = parseInt(color.substring(0, 2), 16); // hexToR
      var g = parseInt(color.substring(2, 4), 16); // hexToG
      var b = parseInt(color.substring(4, 6), 16); // hexToB
      return r * 0.299 + g * 0.587 + b * 0.114 > 200 ? "#000000" : "#ffffff";
    }
  },
  render() {
    return this.$scopedSlots.default({
      customIcon: this.icon
    });
  }
};
</script>

<style>
.subway-marker-pin {
  width: 30px;
  height: 30px;
  position: absolute;
  border: 3px solid;
  background: white;
}

.subway-custom-div-icon i {
  position: absolute;
  width: 22px;
  font-size: 22px;
  left: 0;
  right: 0;
  margin: 0 auto;
  text-align: center;
}

.icon-scaled {
  transform: translate(0, 15px) scale(0.6);
}
</style>
