import axios from "axios";

const baseDomain = "http://192.168.0.120:8888";
//const baseDomain = "http://0.0.0.0:8888";
const baseURL = baseDomain + "";

const repository = axios.create({
  baseURL
});

export default {
  getLines() {
    return repository.get("/lines");
  },
  getBusRoutesForLine(line) {
    return repository.get("/bus/routes?line=" + line);
  },
  getSubwayRoutesForLine(line) {
    return repository.get("/subway/routes?line=" + line);
  },
  getTrainRoutesForLine(line) {
    return repository.get("/train/routes?line=" + line);
  },
  getItineraries(startLat, startLon, endLat, endLon, distance) {
    return repository.get(`/itinerary?startLat=${startLat}&startLon=${startLon}&endLat=${endLat}
      &endLon=${endLon}&distance=${distance}`);
  }
};
