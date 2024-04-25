import Axios from "axios";

var axios = Axios.create({
  withCredentials: true,
});

import { utilService } from "./util.service.js";

const BASE_URL = "http://localhost:3030/api/bug/";

export const bugService = {
  query,
  getById,
  save,
  remove,
};

async function query(filterBy = {}) {
  let { data: bugs } = await axios.get(BASE_URL);
  if (filterBy) {
    bugs = _filters(bugs, filterBy);
  }
  return bugs;
}

async function getById(bugId) {
  const { data: bug } = await axios.get(BASE_URL + bugId);
  return bug;
}

async function save(bug) {
  const queryParams = `?_id=${bug._id || ""}&title=${bug.title}&description=${
    bug.description
  }&severity=${bug.severity}&status=${bug.status}`;
  const { data: savedBug } = await axios.get(BASE_URL + "save" + queryParams);
  return savedBug;
}

async function remove(bugId) {
  return axios.get(BASE_URL + bugId + "/remove");
}

function _filters(bugs, filterBy) {
  const { txt, severity } = filterBy;
  if (txt) {
    const regExp = new RegExp(txt, "i");
    bugs = bugs.filter((bug) => regExp.test(bug.title));
  }
  if (severity) {
    bugs = bugs.filter((bug) => bug.severity >= severity);
  }
  return bugs;
}

// import Axios from "axios";

// var axios = Axios.create({
//   withCredentials: true,
// });

// import { utilService } from "./util.service.js";

// const BASE_URL = "http://localhost:3030/api/car/";

// _createCars();

// export const carService = {
//   query,
//   get,
//   remove,
//   save,
//   getEmptyCar,
//   getDefaultFilter,
// };

// async function query(filterBy = {}) {
//   let { data: cars } = await axios.get(BASE_URL);

//   if (filterBy.txt) {
//     const regExp = new RegExp(filterBy.txt, "i");
//     cars = cars.filter((car) => regExp.test(car.vendor));
//   }

//   if (filterBy.minSpeed) {
//     cars = cars.filter((car) => car.speed >= filterBy.minSpeed);
//   }
//   return cars;
// }

// async function get(carId) {
//   const { data: car } = await axios.get(BASE_URL + carId);
//   return car;
// }

// async function remove(carId) {
//   return axios.get(BASE_URL + carId + "/remove");
// }

// async function save(car) {
//   const queryParams = `?_id=${car._id || ""}&vendor=${car.vendor}&speed=${
//     car.speed
//   }`;
//   const { data: savedCar } = await axios.get(BASE_URL + "save" + queryParams);
//   return savedCar;
// }

// function getEmptyCar(vendor = "", speed = "") {
//   return { vendor, speed };
// }

// function getDefaultFilter() {
//   return { txt: "", minSpeed: "" };
// }
