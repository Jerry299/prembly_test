import { useEffect, useState } from "react";
import Loader from "../components/loadingComponent/loader";
import ProductCard from "../components/productCard/ProductCard";

type Product = {
  id: string;
  productName: string;
  productPrice: number;
  productQuantity: number;
  productImageUrl: string;
};

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("../../../mockData.json");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
  return (
    <div>
      {loading && products.length < 1 && <Loader />}
      {products.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product: Product) => (
            <ProductCard
              key={product.id}
              imgSrc={product.productImageUrl}
              productName={product.productName}
              productPrice={product.productPrice}
              qtyInStock={product.productQuantity}
              id={product.id}
            />
          ))}
        </div>
      )}
    </div>
  );
};
export default ProductList;
