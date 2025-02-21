import {type RouteConfig, index, route, layout} from "@react-router/dev/routes";

export default [
    route("/", "./routes/layout.tsx", [
        index("routes/home.tsx"),
        route("about", "routes/about.tsx"),
        route("logement/:id", "routes/housing.tsx"),
        // route("logement-non-trouve", "routes/notfound.tsx"),
        route("*", "routes/notfound.tsx")
    ])

] satisfies RouteConfig;
