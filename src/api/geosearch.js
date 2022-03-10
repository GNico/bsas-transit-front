import axios from "axios";

const baseDomain = "https://servicios.usig.buenosaires.gob.ar/normalizar";
const baseURL = baseDomain + "";

const repository = axios.create({
  baseURL
});

export default {
  getSuggestions(name) {
    return repository.get(`/?geocodificar=true&direccion=${name}`);
  },
  getDirection(lat, lng) {
    return repository.get(`?lng=${lng}&lat=${lat}`);
  }
};
