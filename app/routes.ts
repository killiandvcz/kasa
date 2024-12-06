import {type RouteConfig, index, route, layout} from "@react-router/dev/routes";

export default [
    route("/", "./routes/layout.tsx", [
        index("routes/home.tsx"),
        route("about", "routes/about.tsx"),
        route("housing", "routes/housing.tsx"),
    ])

] satisfies RouteConfig;
