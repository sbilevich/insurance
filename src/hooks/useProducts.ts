import { useEffect, useState } from "react";
import { Product } from "types/SaleData";

export const useProducts = (): Product[] => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch(process.env.PUBLIC_URL + "/data/devices.json")
      .then((response) => response.json())
      .then((data) => setProducts(data.devices));
  }, []);

  return products;
};
