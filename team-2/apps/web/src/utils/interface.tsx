interface Review {
  reviewId: number;
  name: string;
  rating: number;
  comment: string;
}

export interface Product {
  productId: number;
  name: string;
  price: number;
  image: string;
  reviews?: Review[];
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Transaction {
  id: number;
  userId: number;
  productId: number;
  quantity: number;
  total_price: number;
  traansactionStatus: string;
  createdAt: string;
  user?: {
    email: string;
  };
  product?: {
    name: string;
    image: string;
  };
}

