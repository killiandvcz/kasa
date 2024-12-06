import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Housing" },
        { name: "description", content: "Housing" },
    ];
}

export default function Housing() {
    return (
        <div>
            <h1>Housing</h1>
            <p>
                Find the perfect place to stay for your trip!
            </p>
        </div>
    );
}