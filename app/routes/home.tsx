import type { Route } from "./+types/home";
import Header from "~/components/molecules/Header";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Home" },
    { name: "description", content: "Welcome to Kasa" },
  ];
}

export default function Home() {
  return (
      <>

      </>
  )
}


export function ErrorBoundary({error}) {
    return (
        <div>
            <h1>Oops!</h1>
            <p>An unexpected error occurred.</p>
            {error && <pre>{error.message}</pre>}
        </div>
    )
}