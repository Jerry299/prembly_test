import { FaLongArrowAltLeft } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { Spacer } from "../components/spacer";
import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import Loader from "../components/loadingComponent/loader";
import { CiSquarePlus, CiSquareMinus } from "react-icons/ci";
import AppButton from "../components/button/ButtonComponent";
import {
  increaseItemInCart,
  addToCart,
  decreaseItemInCart,
  calculateTotal,
} from "../../globalRedux/slices/cartSlice";
interface ProductCardProps {
  productName: string;
  productPrice: number;
  productQuantity: number;
  productImageUrl: string;
  id: string;
  productQtyInCart?: number;
}
const ProductDetails = () => {
  const params = useParams()?.id;
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState<ProductCardProps>(
    {} as ProductCardProps
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state: any) => state.cart.cartItems);
  const qtyCountInCart = cart.filter((item: any) => item.id === params)[0]
    ?.productQtyInCart;

  const data = {
    productName: product.productName,
    productPrice: product.productPrice,
    productQuantity: product.productQuantity,
    productImageUrl: product.productImageUrl,
    id: product.id,
    productQtyInCart: qtyCountInCart > 0 ? qtyCountInCart + 1 : 1,
  };
  const dataDecrease = {
    ...data,
    productQtyInCart: qtyCountInCart > 0 ? qtyCountInCart - 1 : 0,
  };

  useEffect(() => {
    setLoading(true);
    const fetchProducts = async () => {
      try {
        const response = await fetch("../../../mockData.json");
        const data = await response.json();
        const product = data.filter(
          (item: any) => item.id === (params as string)
        );
        setProduct(product?.[0]);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleMinus = () => {
    dispatch(decreaseItemInCart(dataDecrease));
    dispatch(
      calculateTotal({
        productName: data.productName,
        total: data.productPrice * dataDecrease.productQtyInCart,
      })
    );
  };
  const handleAdd = () => {
    dispatch(increaseItemInCart(product));
    dispatch(
      calculateTotal({
        productName: data.productName,
        total: data.productPrice * data.productQtyInCart,
      })
    );
  };

  return (
    <div className="">
      {loading && <Loader />}
      <div
        className="flex items-center cursor-pointer"
        onClick={() => navigate(-1)}
      >
        <FaLongArrowAltLeft />
        <Spacer width={10} /> <span>Back to Products</span>
      </div>
      <div className="flex justify-center items-center pt-10">
        <div className="rounded">
          <img
            src={product.productImageUrl}
            alt="product image"
            className="rounded w-[500px] h-[400px] object-contain"
          />
        </div>
        <Spacer width={50} />
        <div className="self-start">
          <>
            <p className="text-[#636366] text-2xl font-medium">
              {product.productName}
            </p>
            <p className="text-[#1C1C1E] text-3xl font-bold">
              ${product.productPrice}
            </p>
            <p>Qty In Stock: {product.productQuantity}</p>
            <Spacer height={20} />
            <p className=" text-[14px]">
              Current Total Price of {qtyCountInCart} {product.productName}:{" "}
              <span className="text-[#1C1C1E] font-bold">
                ${qtyCountInCart * product.productPrice || 0}
              </span>
            </p>
            <p className="text-red-500 text-[14px]">Quantity in Cart</p>
            <div className="flex items-center">
              <CiSquareMinus
                size={35}
                color="#F3000B"
                className="cursor-pointer"
                onClick={() => handleMinus()}
              />
              <Spacer width={10} />
              <span>{qtyCountInCart || 0}</span>
              <Spacer width={10} />
              <CiSquarePlus
                size={35}
                color="#F3000B"
                className="cursor-pointer"
                onClick={() => handleAdd()}
              />
            </div>
          </>
          <Spacer height={20} />
          {qtyCountInCart ? (
            <AppButton
              name="Product In Cart."
              className="text-white px-4 py-2"
              isActive={false}
              backgroundColor="#F3000B"
            />
          ) : (
            <AppButton
              name="Add To Cart"
              className="text-white px-4 py-2"
              isActive={true}
              backgroundColor="#F3000B"
              onClick={() => dispatch(addToCart(data))}
            />
          )}

          <Spacer height={20} />
          <p className="w-[20%] pt-3.5 text-[#636366]">
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
            sint. Velit officia consequat duis enim velit mollit. Exercitation
            veniam consequat sunt nostrud amet. Amet minim mollit non deserunt
            ullamco est sit aliqua dolor do amet sint. Velit officia consequat
            duis enim velit mollit. Exercitation veniam{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
