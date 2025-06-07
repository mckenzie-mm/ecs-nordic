"use server"

import { API_ENDPOINT } from "../config";

export const findAll = async (currentPage: number, ITEMS_PER_PAGE: number) => {

    try {
        const response = await fetch(`${API_ENDPOINT}/products/list/${currentPage}/${ITEMS_PER_PAGE}`);
        const data = await response.json();
        // await new Promise((resolve) => setTimeout(resolve, 3000));
        return data;
    } catch (error) {
        console.log(error)
        return [];
    }
}

export const findByCategory = async (category: string, currentPage: number, ITEMS_PER_PAGE: number) => {
    const response = await fetch(`${API_ENDPOINT}/products/list/${category}/${currentPage}/${ITEMS_PER_PAGE}`);
    const data = await response.json();
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    return data;
}

export const getProductPageData = async (slug : string) => {
    const response = await fetch(`${API_ENDPOINT}/products/page/${slug}`);
    const data = await response.json();
    return data;
}

   

