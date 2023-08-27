"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../redux/features/auth-slice";
import axios from "axios";

const Categories = () => {
    const dispatch = useDispatch();
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        const getCategories = async () => {
            const response = await axios.get("/api/categories");
            setCategories(response.data.category);
        };

        getCategories();
    }, []);

    const { user } = useSelector((state) => state.auth);

    return (
        <div>
            {categories?.map((category) => (
                <div key={category._id} className="flex my-4 ml-4 gap-4">
                    <h1 className="text-xl">{category.name}</h1>
                    <h2 className="text-lg">{category.spent}</h2>
                </div>
            ))}
            {/* {categories} */}
        </div>
    );
};

export default Categories;
