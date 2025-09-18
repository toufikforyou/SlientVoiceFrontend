import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { GlobalContext } from "../../../Context/Global_Provider";

const Login = () => {
    const [form, setForm] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    // const navigate = useNavigate();

    const {connect_google, log_out } = useContext(GlobalContext);


    const handleGoogleLogin =()=>{
        connect_google().then(res=>{
            console.log(res)
        })
    } 
    
    const handleChange = e =>
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true);
        setError("");
        // try {
        //     const res = await axios.post("https://event-manager-server-eta.vercel.app/api/users/login", form);
        //     console.log(res.data.user);
        //     localStorage.setItem("user", JSON.stringify(res.data.user));
        //     navigate("/");
        // } catch (err) {
        //     console.log(err.data);
        //     setError(err.response?.data?.message || "Login failed");
        // } finally {
        //     setLoading(false);
        // }
    };

    return (
        <div className="flex min-h-screen items-center justify-center">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-[400px] bg-white p-8"
            >
                <h2 className=" text-2xl text-center font-bold text-black">LOGIN</h2>
                <p className="mb-8 text-center">Log in to manage your events.</p>

                <input
                    className="mb-3 w-full font-semibold outline-0  rounded-xl bg-[#5e45ba1e] px-4 p-2"
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    value={form.email}
                    onChange={handleChange}
                />

                <input
                    className="mb-3 w-full rounded-xl outline-0 bg-[#5e45ba1e] font-semibold   px-4 p-2"
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                    value={form.password}
                    onChange={handleChange}
                />

                {error && <p className="mb-3 ml-4 text-sm text-red-600">{error}</p>}

                <div className="flex mt-5 justify-center">
                    <button
                        type="submit"
                        disabled={loading}
                        className="cursor-pointer font-semibold shadow-xl bg-[#5f45ba] px-4 rounded-xl py-2 text-white hover:bg-[#5f45ba]"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </div>
                {/* <hr className="mt-5 border-gray-400 " /> */}
                <p onClick={()=>{handleGoogleLogin()}}>Google login</p>
                <p onClick={()=>{log_out()}}> Log out</p>

                <div className="text-center mt-5">
                    New Here ? <span><Link to="/signup" className="text-[#5f45ba] hover:underline">Create an account</Link></span>
                </div>
            </form>
        </div>
    );
};

export default Login;
