import config from "../config/config.json";

import Station from "../interfaces/station";

const trains = {
    getStations: async function getStations() {
        const response = await fetch(`${config.base_url}/stations`);
        const result = await response.json();

        return result.data;
    },
    getDelays: async function getdelays() {
        const response = await fetch(`${config.base_url}/delayed`);
        const result = await response.json();

        return result.data;
    },

    // getStations: async function getStations(): Promise<Station[]> {
    //     const response = await fetch
    //         (`${config.base_url}/stations`);
    //     const result = await response.json();

    //     return result.data;
    // },
};

export default trains;
