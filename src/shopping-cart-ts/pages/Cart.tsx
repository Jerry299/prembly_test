import { FaLongArrowAltLeft } from "react-icons/fa";
import { Spacer } from "../components/spacer";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import CartCard, { DisplayTotalAmount } from "../components/cartCard/CartCard";

interface CartItem {
  productName: string;
  productPrice: number;
  productQuantity: number;
  productImageUrl: string;
  id: string;
  productQtyInCart: number;
}
const Cart = () => {
  const navigate = useNavigate();
  const cart = useSelector((state: any) => state.cart.cartItems);

  const totalAmount = cart.reduce(
    (accumulator: number, item: any) => item.currentTotal + accumulator,
    0
  );

  return (
    <div>
      <div
        className="flex items-center cursor-pointer"
        onClick={() => navigate("/products")}
      >
        <FaLongArrowAltLeft />
        <Spacer width={10} /> <span>Back to Products</span>
      </div>
      <h1 className="text-2xl font-medium mt-4 mb-4">
        Your Shopping Cart Summary:
      </h1>
      <div className="flex">
        {cart.length === 0 ? (
          <div>Your cart is empty</div>
        ) : (
          <div className="w-full pl-9 pr-9 border-t border-gray-300">
            {cart.map((item: CartItem) => (
              <CartCard
                imageSrc={item.productImageUrl}
                productName={item.productName}
                productPrice={item.productPrice}
                productQtyInCart={item.productQtyInCart}
                id={item.id}
              />
            ))}
            <DisplayTotalAmount totalAmount={totalAmount} />
          </div>
        )}
      </div>
    </div>
  );
};
export default Cart;
