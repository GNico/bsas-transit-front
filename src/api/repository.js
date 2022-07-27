import axios from "axios";

const baseURL = process.env.VUE_APP_BACKEND_URL;

const repository = axios.create({
  baseURL
});

export default {
  getLines() {
    return repository.get("/lines");
  },
  getLinesCloseTo(lat, lon) {
    return repository.get(`/lines?lat=${lat}&lon=${lon}`);
  },
  getBusRoutesForLine(line) {
    return repository.get("/bus/routes/" + line);
  },
  getSubwayRoutesForLine(line) {
    return repository.get("/subway/routes/" + line);
  },
  getTrainRoutesForLine(line) {
    return repository.get("/train/routes/" + line);
  },
  getItineraries(startLat, startLon, endLat, endLon, distance) {
    return repository.get(`/itinerary?startLat=${startLat}&startLon=${startLon}&endLat=${endLat}
      &endLon=${endLon}&distance=${distance}`);
  }
};
