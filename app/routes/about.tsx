import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "About" },
        { name: "description", content: "About Kasa" },
    ];
}

export default function About() {
    return (
        <div>
            <h1>About Kasa</h1>
            <p>
                Kasa is a platform that connects travelers and hosts. Our mission is to create authentic travel experiences.
            </p>
        </div>
    );
}