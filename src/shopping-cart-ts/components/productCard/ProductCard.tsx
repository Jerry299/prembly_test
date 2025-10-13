import { useDispatch, useSelector } from "react-redux";
import AppButton from "../button/ButtonComponent";
import {
  addToCart,
  calculateTotal,
} from "../../../globalRedux/slices/cartSlice";
import { useNavigate } from "react-router";
import { toast } from "sonner";

interface ProductCardProps {
  imgSrc: string;
  productName: string;
  productPrice: number;
  addToCartSvc?: () => void;
  qtyInStock: number;
  id: string;
}

const ProductCard = ({
  imgSrc,
  productName,
  productPrice,
  qtyInStock,
  id,
}: ProductCardProps) => {
  const dispatch = useDispatch();
  const cart = useSelector((state: any) => state.cart.cartItems);
  const qtyCountInCart = cart.filter((item: any) => item.id === id)[0]
    ?.productQtyInCart;

  const data = {
    productName,
    productPrice,
    productQuantity: qtyInStock,
    productImageUrl: imgSrc,
    id,
    productQtyInCart: qtyCountInCart > 0 ? qtyCountInCart + 1 : 1,
  };
  const navigate = useNavigate();

  const handleAddToCart = () => {
    dispatch(addToCart(data));
    dispatch(
      calculateTotal({
        productName,
        total: data.productPrice * data.productQtyInCart,
      })
    );
    toast.success(
      "Item added to cart, click the product image to view/add more items"
    );
  };

  return (
    <div className=" p-4 rounded shadow">
      <div
        className="rounded shadow mb-4 overflow-hidden flex justify-center items-center h-auto bg-[#F2F7FF] cursor-pointer"
        onClick={() => navigate(`/product/${id}`)}
      >
        <img src={imgSrc} alt="image source of product" />
      </div>
      <div className="pl-7 pr-7 pb-3.5">
        <p className="flex justify-between items-center pt-1.5 pb-1.5">
          <span className="font-bold">Product Name: </span>
          <span className="font-light">{productName}</span>
        </p>
        <p className="flex justify-between items-center pt-1.5 pb-1.5">
          <span className="font-bold">Product Price: </span>
          <span className="font-light">${productPrice}</span>
        </p>
        <p className="flex justify-between items-center pt-1.5 pb-1.5">
          <span className="font-bold">Qty In Stock</span>
          <span className="font-light">{qtyInStock}</span>
        </p>
      </div>

      {qtyCountInCart ? (
        <AppButton
          name="Product In Cart."
          backgroundColor="#F3000B"
          className="w-full text-white px-4 py-2"
          isActive={false}
        />
      ) : (
        <AppButton
          name="Add To Cart"
          backgroundColor="#F3000B"
          className="w-full text-white px-4 py-2"
          isActive={true}
          onClick={() => handleAddToCart()}
        />
      )}
    </div>
  );
};

export default ProductCard;
