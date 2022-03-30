import axios from "axios";

const baseDomain = "https://nominatim.openstreetmap.org";
const baseURL = baseDomain + "";

const repository = axios.create({
  baseURL,
  timeout: 4000
});

export default {
  reverseGeosearch(lat, lng) {
    return repository.get(
      `/reverse?lat=${lat}&lon=${lng}&format=json&accept-language=es`
    );
  }
};
