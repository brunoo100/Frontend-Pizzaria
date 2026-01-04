export interface UserProps{
id:string,
name:string,
email:string,
role: 'ADMIN' | "STAFF"
createAt:string
}

export interface AuthResponse{
    id:string,
    nome:string,
    email:string,
    role: 'ADMIN' | "STAFF"
    createAt:string
    token:string
    }

export interface CategoryProps{
    id:string,
    name:string,
    // description:string,
    createAt:string
}

export interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    banner: string;
    disabled: boolean;
    category_id: string;
    createdAt: string;
    updatedAt: string;
    category?: {
      id: string;
      name: string;
    };
  }