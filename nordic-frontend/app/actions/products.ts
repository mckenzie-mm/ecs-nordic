"use server"

const WEB_API_URL = "http://webapi:5000"; //process.env.WEB_API_URL;

export const findAll = async (currentPage: number, ITEMS_PER_PAGE: number) => {
    const response = await fetch(`${WEB_API_URL}/products/list/${currentPage}/${ITEMS_PER_PAGE}`);
    const data = await response.json();

    // await new Promise((resolve) => setTimeout(resolve, 3000));
    
    return data;
}


export const findByCategory = async (category: string, currentPage: number, ITEMS_PER_PAGE: number) => {
    const response = await fetch(`${WEB_API_URL}/products/list/${category}/${currentPage}/${ITEMS_PER_PAGE}`);
    const data = await response.json();

    // await new Promise((resolve) => setTimeout(resolve, 3000));

    return data;
}

export const getProductPageData = async (slug : string) => {
    const response = await fetch(`${WEB_API_URL}/products/page/${slug}`);
    const data = await response.json();
    return data;
}

   

