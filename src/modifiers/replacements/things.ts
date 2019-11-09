import { events } from "./events";
import { people } from "./people";
import { places } from "./places";

export const things = [
    "Egg",
    ...events,
    ...places,
    ...people,
];
