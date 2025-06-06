"use server"

const WEB_API_URL = "http://webapi:5000"; // process.env.WEB_API_URL;

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { IFormDTO } from "../DTO/formDTO";

export async function postProduct(req: FormData) {
    await fetch(`${WEB_API_URL}/admin/form`, {
        method: "POST",
        body: req
    });
    revalidatePath('/admin');
    redirect('/admin');
}

export async function putProduct( id: number, req: FormData ) {
    await fetch(`${WEB_API_URL}/admin/form/${id}`, {
        method: "PUT",
        body: req
    });
    revalidatePath('/admin');
    redirect('/admin');
}

export async function getForm(productSlug: string) {
    const response = await fetch(`${WEB_API_URL}/admin/form/${productSlug}`);
    const formDTO: IFormDTO = await response.json();
    return formDTO;
}

export async function deleteProduct(id: number) {
    await fetch(`${WEB_API_URL}/admin/${id}`, {
        method: "DELETE"
    });
    revalidatePath('/admin');
    redirect('/admin');
}

export async function getCount(ITEMS_PER_PAGE: number) {
    const response = await fetch(`${WEB_API_URL}/admin/count`);
    const count = await response.json();
    return  Math.ceil(Number(count) / ITEMS_PER_PAGE);
}

export async function reset() {
    await fetch(`${WEB_API_URL}/seed`);
    revalidatePath('/admin');
    redirect('/admin');
}

