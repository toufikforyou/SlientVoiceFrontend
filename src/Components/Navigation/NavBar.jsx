import { useContext, useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { GlobalContext } from "../../Context/Global_Provider";

const NavBar = () => {
    // const {user} = useContext(GlobalContext);
    const user = JSON.parse(sessionStorage.getItem("user"));
    const [open, setOpen] = useState(false)
    const dropdownRef = useRef(null);
    const navigate = useNavigate();
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        sessionStorage.setItem("user", null);
        setOpen(false);
        window.location.reload();
        navigate("/");

    }
    console.log(user)
    return (
        <nav className="shadow ">
            <div className="max-w-[1240px]  mx-auto py-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <img
                        className="w-16"
                        src="https://st4.depositphotos.com/14953852/25441/v/450/depositphotos_254411184-stock-illustration-head-talk-speaking-icon-vector.jpg" alt="" />
                    <p className="text-3xl font-bold text-blue-500">Silent Voices</p>
                </div>
                <div className=" flex font-semibold items-center justify-between gap-5">
                    <div className="flex flex-wrap items-center justify-center gap-2 py-2">
                        {
                            !user &&
                            <NavLink
                                to="/"
                                className="text-gray-700 hover:text-blue-500"
                            >
                                Home
                            </NavLink>
                        }
                        {user && (
                            <>
                                <NavLink
                                    to="/"
                                    className={({ isActive }) =>
                                        `px-3 py-1 font-semibold rounded-xl transition-colors
                                    ${isActive
                                            ? 'bg-[#5f45ba] text-white'
                                            : 'text-gray-700 hover:text-blue-500 hover:bg-[#5e45ba1e]'}`
                                    }
                                >
                                    Home
                                </NavLink>
                            </>
                        )}
                    </div>

                    {
                        user &&
                        <div>
                            <img src="https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Free-Image.png" onClick={() => { setOpen(!open) }} className="w-10 rounded-full border border-gray-300 h-10 cursor-pointer" alt={user?.name} />
                            {
                                open &&
                                <div ref={dropdownRef} className="relative">

                                    <div className="absolute right-0 top-2 z-50 w-48 overflow-hidden rounded-xl bg-white shadow-lg ring-1 ring-gray-100">

                                        <div className="px-4 py-3 text-center font-semibold text-black">
                                            {user?.name}
                                        </div>

                                        <hr className="border-gray-200" />

                                        <button
                                            onClick={handleLogout}
                                            className="block w-full px-4 py-2 text-center font-semibold text-blue-500 cursor-pointer transition-colors hover:text-[#4b45ba] focus:outline-none"
                                        >
                                            Log out
                                        </button>
                                    </div>
                                </div>
                            }
                        </div>
                    }

                    {
                        !user &&
                        <div>
                            <Link to="/auth" className="bg-[#5f45ba] font-semibold text-white rounded-xl px-4 py-2 hover:bg-[#5845ba]">Sign in</Link>
                        </div>
                    }
                </div>
            </div>
        </nav>
    );
};

export default NavBar;