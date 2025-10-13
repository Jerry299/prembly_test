import { AiOutlineDelete } from "react-icons/ai";
import { Spacer } from "../spacer";
import { formatMoney } from "../../utils/utils";

interface CartCardProps {
  imageSrc: string;
  productName: string;
  productPrice: number;
  productQtyInCart: number;
  id: string;
}

const CartCard = ({
  imageSrc,
  productName,
  productQtyInCart,
  productPrice,
  id,
}: CartCardProps) => {
  return (
    <div>
      <div
        key={id}
        className="flex justify-between items-center border-b border-gray-300 pb-4 mb-4"
      >
        <div className="flex items-center">
          <img
            src={imageSrc}
            alt={productName}
            className="w-20 h-20 object-cover mr-4"
          />
          <div>
            <h2 className="text-lg font-semibold">{productName}</h2>
            <p className="text-gray-600">Price: ${productPrice}</p>
            <p className="text-gray-600">Quantity: {productQtyInCart}</p>
          </div>
        </div>
        <div className="flex items-center">
          <p className="text-lg font-semibold">
            ${productPrice * productQtyInCart}
          </p>
          <Spacer width={20} />
          <div className="cursor-pointer">
            <AiOutlineDelete size={34} color="#8E8E93" />
          </div>
        </div>
      </div>
    </div>
  );
};

export const DisplayTotalAmount = ({
  totalAmount,
}: {
  totalAmount: number;
}) => {
  return (
    <div className="justify-self-end shadow-lg p-4 w-full  md:w-[300px]">
      <p className="flex justify-between pb-1.5 font-bold">
        Subtotal: <span>${formatMoney(totalAmount)}</span>
      </p>
      <p className="flex justify-between pb-1.5">No Delivery fee included</p>
      <p className="flex justify-between pb-1.5 font-bold text-lg">
        Total: <span>${formatMoney(totalAmount)}</span>
      </p>
    </div>
  );
};

export default CartCard;
