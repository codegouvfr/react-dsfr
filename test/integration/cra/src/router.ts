import { createRouter, defineRoute } from "type-route";

const routeDefs = {
    "home": defineRoute("/"),
    "mui": defineRoute("/mui"),
};

export const { RouteProvider, useRoute, routes } = createRouter(routeDefs);
