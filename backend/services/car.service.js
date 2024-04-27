import fs from 'fs'
import { utilService } from "./util.service.js"

const cars = utilService.readJsonFile('data/car.json')

export const carService = {
    query,
    getById,
    remove,
    save
}

async function query() {
    try {
        return cars
    } catch (error) {
        throw error
    }
}

async function getById(carId) {
    try {
        const car = cars.find(car => car._id === carId)
        return car
    } catch (error) {
        throw error
    }
}


async function remove(carId) {
    try {
        const carIdx = cars.findIndex(car => car._id === carId)
        cars.splice(carIdx, 1)
        _saveCarsToFile()
    } catch (error) {
        throw error
    }
}


async function save(carToSave) {
    try {
        if (carToSave._id) {
            const idx = cars.findIndex(car => car._id === carToSave._id)
            if (idx < 0) throw `Cant find car with _id ${carToSave._id}`
            cars[idx] = carToSave
        } else {
            carToSave._id = utilService.makeId()
            cars.push(carToSave)
        }
        await _saveCarsToFile()
        return carToSave
    } catch (error) {
        throw error
    }
}


function _saveCarsToFile(path = './data/car.json') {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify(cars, null, 4)
        fs.writeFile(path, data, (err) => {
            if (err) return reject(err)
            resolve()
        })
    })
}