import { HoseLay } from "./types";

export const STANDARD_HOSE_LAYS: HoseLay[] = [
    {
        name: "Front Jumpline",
        length: 75,
        diameter: 2,
        nozzlePressure: 100,
        gpm: 100,
        displayColor: 'orange'
    },
    {
        name: 'Front 1.75" Crosslay',
        length: 150,
        diameter: 1.75,
        nozzlePressure: 100,
        gpm: 100,
        displayColor: 'silver'
    },
    {
        name: 'Middle 1.75" Crosslay',
        length: 150,
        diameter: 1.75,
        nozzlePressure: 100,
        gpm: 100,
        displayColor: 'red'
    },
    {
        name: 'Rear 2.5" Crosslay',
        length: 150,
        diameter: 2.5,
        nozzlePressure: 100,
        gpm: 100,
        displayColor: 'blue'
    },
    {
        name: "Deck Gun",
        length: 0,
        diameter: 1,
        nozzlePressure: 125,
        gpm: 100,
        displayColor: 'silver'
    },
];