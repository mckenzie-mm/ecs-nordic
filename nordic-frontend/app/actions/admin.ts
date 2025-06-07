"use server"

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { IFormDTO } from "../DTO/formDTO";
import { API_ENDPOINT } from "../config";


export async function postProduct(req: FormData) {
    await fetch(`${API_ENDPOINT}/admin/form`, {
        method: "POST",
        body: req
    });
    revalidatePath('/admin');
    redirect('/admin');
}

export async function putProduct( id: number, req: FormData ) {
    await fetch(`${API_ENDPOINT}/admin/form/${id}`, {
        method: "PUT",
        body: req
    });
    revalidatePath('/admin');
    redirect('/admin');
}

export async function getForm(productSlug: string) {
    const response = await fetch(`${API_ENDPOINT}/admin/form/${productSlug}`);
    const formDTO: IFormDTO = await response.json();
    return formDTO;
}

export async function deleteProduct(id: number) {
    await fetch(`${API_ENDPOINT}/admin/${id}`, {
        method: "DELETE"
    });
    revalidatePath('/admin');
    redirect('/admin');
}

export async function getCount(ITEMS_PER_PAGE: number) {
    try {
        const response = await fetch(`${API_ENDPOINT}/admin/count`);
        const count = await response.json();
        return  Math.ceil(Number(count) / ITEMS_PER_PAGE);
    } catch (error) {
        console.log(error)
        return 0;
    }
    
}

export async function reset() {
    await fetch(`${API_ENDPOINT}/seed`);
    revalidatePath('/admin');
    revalidatePath('/');
    redirect('/admin');
}

