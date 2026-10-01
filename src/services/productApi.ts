import { apiClient } from './apiClient';

export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
}

// Yêu cầu lấy 12 sản phẩm
export const fetchProducts = async (): Promise<Product[]> => {
  const res = await apiClient.get('/products?limit=12');
  return res.data;
};
