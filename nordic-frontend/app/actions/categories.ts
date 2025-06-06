"use server"

const WEB_API_URL = "http://webapi:5000"; // process.env.WEB_API_URL;

export async function getCategories() {
    const response = await fetch(`${WEB_API_URL}/categories`);
    const data = await response.json();
    return data;
}