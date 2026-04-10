import { useEffect, useState } from "react";
import * as productService from "../services/product.service";
import { IProduct } from "../types/products-types";

export const useProducts = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string|null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null)
    try {
      const data = await productService.getProducts();
      setProducts(data);
    }catch(err:any){
      setError(err)
    } finally {
      setLoading(false);
    }
  };

  const removeProduct = async (id: string) => {
    await productService.deleteProduct(id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    loading,
    fetchProducts,
    removeProduct,
  };
};