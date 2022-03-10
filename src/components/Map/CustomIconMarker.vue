<script>
import { divIcon } from "leaflet";

export default {
  props: {
    color: {
      type: String,
      default: "black"
    },
    iconClass: {
      type: String,
      default: "mdi-bell"
    },
    iconColor: {
      type: String,
      default: "black"
    }
  },
  computed: {
    icon() {
      return divIcon({
        className: "custom-div-icon",
        html: `<div style='background-color:${this.color};' class='marker-pin'></div>
        <i class='mdi ${this.iconClass}' style='color: ${this.iconColor}'></i>`,
        iconSize: [30, 42],
        iconAnchor: [15, 42]
      });
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
.marker-pin {
  width: 30px;
  height: 30px;
  border-radius: 50% 50% 50% 0;
  position: absolute;
  transform: rotate(-45deg);
  left: 50%;
  top: 50%;
  margin: -15px 0 0 -15px;
}

.marker-pin::after {
  content: "";
  width: 24px;
  height: 24px;
  margin: 3px 0 0 -12px;
  background: #fff;
  position: absolute;
  border-radius: 50%;
  opacity: 0.9;
}

.custom-div-icon i {
  position: absolute;
  width: 22px;
  font-size: 22px;
  left: 0;
  right: 0;
  margin: 4px auto;
  text-align: center;
}
</style>
