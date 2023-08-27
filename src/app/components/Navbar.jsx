"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, logOut, reset } from "../../redux/features/auth-slice";
import { getUserLogout } from "../../services/authUser";
import { useEffect } from "react";

const Navbar = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const onLogout = async () => {
        try {
            await getUserLogout();
            router.push("/login");
            dispatch(logOut());
            dispatch(reset());
            toast.success("Logout Successful");
        } catch (error) {
            console.log(error.message);
            toast.error("Failed to log out");
        }
    };

    useEffect(() => {
        dispatch(fetchUser());
    }, []);

    const { user } = useSelector((state) => state.auth);

    return (
        <nav className="sticky top-0 border-b">
            <div className="flex h-16 items-center justify-between py-4 px-20 mx-auto w-full">
                <div className="flex gap-6 items-center">
                    <Link href={"/"} className="font-bold text-lg">
                        Expense Tracker
                    </Link>
                    {user ? (
                        <div className="flex gap-6">
                            <Link href={"/transactions"}>Transactions</Link>
                            <Link href={"/categories"}>Categories</Link>
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
                {user ? (
                    <div className="flex gap-4 items-center">
                        <button className="relative h-9 w-9" type="button">
                            <Link href={"/dashboard"}>
                                <Image
                                    src={"/images/ayaansh.jpg"}
                                    alt="profile-pic"
                                    fill
                                    priority
                                    className="aspect-square absolute object-cover rounded-full"
                                />
                            </Link>
                        </button>
                        <button
                            onClick={onLogout}
                            className="block px-4 py-2 hover:bg-gray-500"
                        >
                            Log out
                        </button>
                    </div>
                ) : (
                    <></>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
