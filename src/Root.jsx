import { Outlet } from "react-router";
import NavBar from "./Components/Navigation/NavBar";
import Footer from "./Components/Footer/Footer";


const Root = () => {
    return (
        <div className='bg-gray-800'>
            <div className="sticky">
                <NavBar />
            </div>
            <div className="max-w-[1240px]  mx-auto mt-4 mb-10">
                <Outlet />
            </div>
            <div>
                <Footer/>
            </div>
        </div>
    );
};

export default Root;