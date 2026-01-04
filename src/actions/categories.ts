"use server";

import { apiClient } from "@/lib/api";
import { getToken } from "@/lib/auth";
import { CategoryProps } from "@/types/types";
import { revalidatePath } from "next/cache";


export async function createCategoryAction(formData: FormData) {
try {
  const token = await getToken();
  const name = formData.get("name");
  const data = {
    nome: name as string,
  }
  const result = await apiClient<CategoryProps>('/category', {
    token: token!,
    method: 'POST',
      body: JSON.stringify(data),
  });
  
  revalidatePath('/dashboard/categories');



  return { success: true, error: '' };
} catch (error) {
  if (error instanceof Error) {
    return { success: false, error: error.message };
  }
  return { success: false, error: 'Erro ao criar categoria' };
}
}
