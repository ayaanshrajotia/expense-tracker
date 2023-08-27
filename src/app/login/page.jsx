"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, reset } from "../../redux/features/auth-slice";

const Login = () => {
    const router = useRouter();
    const [userData, setUserData] = useState({
        email: "",
        password: "",
    });

    // redux states
    const dispatch = useDispatch();
    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        if (isError) toast.error(message);
        if (isSuccess || user) router.push("/dashboard");
        dispatch(reset());
    }, [user, isError, isSuccess, message, dispatch]);

    const doLogin = async (e) => {
        e.preventDefault();

        try {
            dispatch(registerUser(userData));
            // setUserData({
            //     email: "",
            //     password: "",
            // });
        } catch (error) {
            console.log(error.response.data.message);
            toast.error(error.response.data.error);
        }
    };

    return (
        <div className="login w-[400px] p-8 rounded-md border">
            <form className="flex flex-col items-center" onSubmit={doLogin}>
                <div className="relative z-0 w-full mb-7 group">
                    <input
                        data-lpignore
                        type="email"
                        name="floating_email"
                        id="floating_email"
                        className="block py-2.5 px-0  w-full text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-gray-600 peer"
                        placeholder=" "
                        required
                        value={userData.email}
                        onChange={(e) =>
                            setUserData({ ...userData, email: e.target.value })
                        }
                    />
                    <label
                        htmlFor="floating_email"
                        className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-300 peer-focus:dark:text-gray-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
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
                        className="block py-2.5 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-gray-900 peer"
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
                        className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-900 peer-focus:dark:text-gray-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Password
                    </label>
                </div>
                <span className="text-sm">
                    Doesn't have an account?{" "}
                    <Link href={"/signup"} className="text-sm font-bold">
                        Signup
                    </Link>
                </span>
                <button
                    type="submit"
                    className="text-white bg-gray-700 mt-4 font-medium rounded-lg text-base w-full sm:w-auto px-5 py-2 text-center"
                >
                    {isLoading ? "loading..." : "Log In"}
                </button>
            </form>
        </div>
    );
};

export default Login;
