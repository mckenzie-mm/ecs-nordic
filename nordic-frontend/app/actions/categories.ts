"use server"

import { API_ENDPOINT } from "../config";


export async function getCategories() {
    try {
         const response = await fetch(`${API_ENDPOINT}/categories`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error)
        return [];
    }
   
}