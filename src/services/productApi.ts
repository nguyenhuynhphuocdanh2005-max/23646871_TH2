import { apiClient } from './apiClient';
import { PRICE_MULTIPLIER } from '@constants/student';

export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
}

export const KTX_ITEMS = [
  { id: 1, title: 'Cơm nắm', price: 28500 / PRICE_MULTIPLIER, description: 'Cơm nắm tam giác rong biển nhân cá ngừ sốt mayo thơm ngon, tiện lợi cho sinh viên ký túc xá.' },
  { id: 2, title: 'Trà sữa', price: 35000 / PRICE_MULTIPLIER, description: 'Trà sữa trân châu đường đen truyền thống ngọt thanh mát lạnh, giao tận phòng.' },
  { id: 3, title: 'Bút bi', price: 12000 / PRICE_MULTIPLIER, description: 'Bút bi ngòi 0.5mm êm trơn nét đều chuẩn cho học tập, thi cử.' },
  { id: 4, title: 'Mì ly', price: 18000 / PRICE_MULTIPLIER, description: 'Mì ly ăn liền nóng hổi hương vị tôm chua cay, cứu đói nhanh cho cú đêm.' },
  { id: 5, title: 'Bánh mì', price: 25000 / PRICE_MULTIPLIER, description: 'Bánh mì kẹp chả lụa pate thơm lừng giòn rụm cho bữa sáng đủ chất.' },
  { id: 6, title: 'Cà phê sữa', price: 20000 / PRICE_MULTIPLIER, description: 'Cà phê sữa đá đậm đà sảng khoái giúp tỉnh táo học bài.' },
  { id: 7, title: 'Vở kẻ ngang', price: 15000 / PRICE_MULTIPLIER, description: 'Vở ô ly 96 trang giấy chống lóa chất lượng cao cho sinh viên.' },
  { id: 8, title: 'Snack khoai tây', price: 16000 / PRICE_MULTIPLIER, description: 'Snack khoai tây chiên giòn tan hương vị phô mai hấp dẫn.' },
  { id: 9, title: 'Nước suối', price: 10000 / PRICE_MULTIPLIER, description: 'Nước khoáng thiên nhiên đóng chai 500ml thanh khiết.' },
  { id: 10, title: 'Xúc xích', price: 12000 / PRICE_MULTIPLIER, description: 'Xúc xích tiệt trùng ăn liền dinh dưỡng tiện lợi.' },
  { id: 11, title: 'Sữa tươi', price: 14000 / PRICE_MULTIPLIER, description: 'Sữa tươi tiệt trùng có đường 180ml bổ sung canxi và năng lượng.' },
  { id: 12, title: 'Bánh quy', price: 15000 / PRICE_MULTIPLIER, description: 'Bánh quy bơ xốp thơm ngậy ngọt ngào.' },
];

// Yêu cầu lấy 12 sản phẩm từ fakestoreapi và map tên món đơn giản theo đúng mockup
export const fetchProducts = async (): Promise<Product[]> => {
  const res = await apiClient.get('/products?limit=12');
  return res.data.map((item: any, index: number) => {
    const ktx = KTX_ITEMS[index % KTX_ITEMS.length];
    return {
      ...item,
      title: ktx.title,
      price: ktx.price,
      description: ktx.description,
    };
  });
};

export const fetchProductById = async (id: string | number): Promise<Product> => {
  const res = await apiClient.get(`/products/${id}`);
  const numId = Number(id) || 1;
  const ktx = KTX_ITEMS[(numId - 1) % KTX_ITEMS.length] || KTX_ITEMS[0];
  return {
    ...res.data,
    title: ktx.title,
    price: ktx.price,
    description: ktx.description,
  };
};
