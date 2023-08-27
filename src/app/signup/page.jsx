"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

const Signup = () => {
    const router = useRouter();
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const doSignup = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("/api/user/signup", userData);
            console.log(response);
            toast.success("Signup successful");
            setUserData({
                name: "",
                email: "",
                password: "",
            });
            router.push("/login");
        } catch (error) {
            console.log(error.message);
            toast.error(error.message);
        }
    };
    return (
        <div className="login w-[400px] p-8 rounded-md border">
            <form className="flex flex-col items-center" onSubmit={doSignup}>
                <div className="relative z-0 w-full mb-7 group">
                    <input
                        data-lpignore
                        type="text"
                        name="floating_name"
                        id="floating_name"
                        className="block py-2.5 px-0  w-full text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-gray-900 focus:outline-none focus:ring-0 focus:border-gray-600 peer"
                        placeholder=" "
                        required
                        value={userData.name}
                        onChange={(e) =>
                            setUserData({ ...userData, name: e.target.value })
                        }
                    />
                    <label
                        htmlFor="floating_name"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-300 peer-focus:dark:text-gray-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Name
                    </label>
                </div>
                <div className="relative z-0 w-full mb-7 group">
                    <input
                        data-lpignore
                        type="email"
                        name="floating_email"
                        id="floating_email"
                        className="block py-2.5 px-0  w-full text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-gray-900 focus:outline-none focus:ring-0 focus:border-gray-600 peer"
                        placeholder=" "
                        required
                        value={userData.email}
                        onChange={(e) =>
                            setUserData({ ...userData, email: e.target.value })
                        }
                    />
                    <label
                        htmlFor="floating_email"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-300 peer-focus:dark:text-gray-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Email address
                    </label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input
                        data-lpignore
                        type="password"
                        name="floating_password"
                        id="floating_password"
                        className="block py-2.5 px-0  w-full text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-gray-900 focus:outline-none focus:ring-0 focus:border-gray-600 peer"
                        placeholder=" "
                        required
                        value={userData.password}
                        onChange={(e) =>
                            setUserData({
                                ...userData,
                                password: e.target.value,
                            })
                        }
                    />
                    <label
                        htmlFor="floating_password"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-900 peer-focus:dark:text-gray-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Password
                    </label>
                </div>
                <span className="text-sm">
                    Already have an account?{" "}
                    <Link href={"/login"} className="text-sm font-bold">
                        Login
                    </Link>
                </span>
                <button
                    type="submit"
                    className="text-white bg-gray-700 mt-4 font-medium rounded-lg text-base w-full sm:w-auto px-5 py-2 text-center"
                >
                    Sign up
                </button>
            </form>
        </div>
    );
};

export default Signup;
