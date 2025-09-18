import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router";

const Register = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        image: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const handleChange = e =>
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await axios.post("https://event-manager-server-eta.vercel.app/api/users/register", form);
            // alert("Registration successful!");
            console.log(res.data);
            navigate("/signin");
        } catch (err) {
            console.log(err)
            setError(err.response?.data?.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-[400px] bg-white p-8"
            >
                <h2 className="text-2xl text-center font-bold text-black">REGISTER</h2>
                <p className="mb-8 text-center">Create your account to start managing events.</p>

                <input
                    className="mb-3 w-full font-semibold outline-0 rounded-xl bg-[#5e45ba1e] px-4 p-2"
                    type="text"
                    name="name"
                    placeholder="Name"
                    required
                    value={form.name}
                    onChange={handleChange}
                />

                <input
                    className="mb-3 w-full font-semibold outline-0 rounded-xl bg-[#5e45ba1e] px-4 p-2"
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    value={form.email}
                    onChange={handleChange}
                />

                <input
                    className="mb-3 w-full font-semibold outline-0 rounded-xl bg-[#5e45ba1e] px-4 p-2"
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                    value={form.password}
                    onChange={handleChange}
                />

                <input
                    className="mb-3 w-full font-semibold outline-0 rounded-xl bg-[#5e45ba1e] px-4 p-2"
                    type="url"
                    name="image"
                    placeholder="Photo URL (https://...)"
                    required
                    value={form.image}
                    onChange={handleChange}
                />

                {error && <p className="mb-3 ml-4 text-sm text-red-600">{error}</p>}

                <div className="flex mt-5 justify-center">
                    <button
                        type="submit"
                        disabled={loading}
                        className="cursor-pointer font-semibold shadow-xl bg-[#5f45ba] px-4 rounded-xl py-2 text-white hover:bg-[#5f45ba]"
                    >
                        {loading ? "Registering..." : "Register"}
                    </button>
                </div>

                <div className="text-center mt-5">
                    Already a user? <span><Link to="/signin" className="text-[#5f45ba] hover:underline">Login here</Link></span>
                </div>
            </form>


        </div>
    );
};

export default Register;
