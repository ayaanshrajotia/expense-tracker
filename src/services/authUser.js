import axios from "axios";

export async function getCurrentUser() {
    const response = await axios.get("/api/user/current");
    return response.data;
}

export async function getAllCategories() {
    const response = await axios.get("/api/categories");
}

export async function getUserLogout() {
    const response = await axios.get("/api/user/logout");
    return response.data;
}
