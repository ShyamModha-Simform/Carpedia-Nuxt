import axios from "axios";
import { defineStore } from "pinia";

const actions = {
    async fetchAllCars() {
        try {
            this.isLoaderStarted = true;
            let responseData = await axios.get(
                `${import.meta.env.VITE_BASE_URL}/cardata`
            );
            if (responseData.status === 200) {
                // Updating global state
                this.carsData = [...responseData.data.data];
            }
            this.isLoaderStarted = false;
            return responseData;
        } catch (e) {
            this.isLoaderStarted = false;
            alert("Couldn't able to get Car Details");
        }
    },
    async addCar(newCar) {
        try {
            let responseData = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/cardata`,
                {
                    ...newCar,
                }
            );
            if (responseData?.status === 201) {
                // After deleting fetch all car details again
                await this.fetchAllCars();
            }
            return responseData;
        } catch (e) {
            alert("Couldn't able to post Data..");
        }
    },
    async deleteCar(carId) {
        try {
            let responseData = await axios.delete(
                `${import.meta.env.VITE_BASE_URL}/cardata/${carId}`
            );
            return responseData;
        } catch (e) {
            alert("Couldn't able to delete Data..");
        }
        // After deleting fetch all car details again
    },
    async updateCar(editedCar) {
        try {
            let responseData = await axios.put(
                `${import.meta.env.VITE_BASE_URL}/cardata/${editedCar.id}`,
                {
                    ...editedCar,
                }
            );
            if (responseData?.status === 200) {
                // After updating fetch all car details again
                await this.fetchAllCars();
            }
            return responseData;
        } catch (e) {
            alert("Couldn't able to Update Data..");
        }
    },
    async fetchCarDetailsById(id) {
        try {
            this.isLoaderStarted = true;
            let responseData = await axios.get(`	
        ${import.meta.env.VITE_BASE_URL}/cardata/${id}`);
            this.detailsOfSelectedCar = responseData.data;
            this.isLoaderStarted = false;
            return responseData;
        } catch (e) {
            this.isLoaderStarted = false;
            return { status: "404" };
        }
    },
};

const getters = {
    getCarDetails() {
        return this.carsData;
    },
    getIsLoaderStarted() {
        return this.isLoaderStarted;
    },
    getDetailsOfSelectedCar() {
        return this.detailsOfSelectedCar;
    },
};

const useCarDataStore = defineStore("carData", {
    state: () => {
        return {
            carsData: [],
            detailsOfSelectedCar: null,
            isLoaderStarted: false,
        };
    },
    getters,
    actions,
});

export default useCarDataStore;
