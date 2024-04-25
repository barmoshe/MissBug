import Axios from "axios";

var axios = Axios.create({
  withCredentials: true,
});

import { utilService } from "./util.service.js";

const BASE_URL = "http://localhost:3030/api/car/";

_createCars();

export const carService = {
  query,
  get,
  remove,
  save,
  getEmptyCar,
  getDefaultFilter,
};

async function query(filterBy = {}) {
  let { data: cars } = await axios.get(BASE_URL);

  if (filterBy.txt) {
    const regExp = new RegExp(filterBy.txt, "i");
    cars = cars.filter((car) => regExp.test(car.vendor));
  }

  if (filterBy.minSpeed) {
    cars = cars.filter((car) => car.speed >= filterBy.minSpeed);
  }
  return cars;
}

async function get(carId) {
  const { data: car } = await axios.get(BASE_URL + carId);
  return car;
}

async function remove(carId) {
  return axios.get(BASE_URL + carId + "/remove");
}

async function save(car) {
  const queryParams = `?_id=${car._id || ""}&vendor=${car.vendor}&speed=${
    car.speed
  }`;
  const { data: savedCar } = await axios.get(BASE_URL + "save" + queryParams);
  return savedCar;
}

function getEmptyCar(vendor = "", speed = "") {
  return { vendor, speed };
}

function getDefaultFilter() {
  return { txt: "", minSpeed: "" };
}
