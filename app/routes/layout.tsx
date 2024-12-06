import Header from "~/components/molecules/Header";
import Footer from "~/components/molecules/Footer";
import {Outlet} from "react-router";

export default function Layout() {
    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    )
}