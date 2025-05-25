import { createRouter, defineRoute } from "type-route";

const routeDefs = {
    "home": defineRoute("/"),
    "mui": defineRoute("/mui"),
    "picto": defineRoute("/picto"),
};

export const { RouteProvider, useRoute, routes } = createRouter(routeDefs);
