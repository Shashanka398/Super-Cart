import { useDispatch, useSelector } from "react-redux";
import {toast} from "react-hot-toast"
import { remove,add } from './../redux/Slices/CartSlice'; 

const Product = ({post}) => {
  const {cart}=useSelector((state)=>state);
  const dispatch=useDispatch();

  const addTOCart = () => {
    dispatch(add(post)); 
    toast.success("Item added to Cart");
  }
  
  const removeFromCart = () => {
    dispatch(remove(post.id)); 
    toast.error("Item removed from Cart");
  }
  return(
    <div className="flex flex-col items-center justify-between  hover:scale-110 hover:shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)] transition duration-300 ease-in gap-3 p-4 mt-10 ml-5 rounded-xl  shadow-[0_8px_30px_rgb(0,0,0,0.12)] h-[22rem]">
      <div> 
        <p className="w-40 mt-1 text-lg font-semibold text-left truncate text-grey-700">{post.title}</p>
      </div>
      <div>
        <p className="w-40 text-gray-400 font-normal text-[10px] text-left">{post.description.split(" ").slice(0,10).join(" ")+"..."}</p>
      </div>
      <div className="h-[180px] ">
        <img src={post.image} alt="product_image" className="w-full h-full"/>
      </div>
      <div className="flex flex-row justify-between w-full gap-10 item-center">
        <div>
        <p className="font-semibold text-green-600 ">${post.price}</p>
        </div>
      {
         cart &&  cart.some((p)=> p.id===post.id) ?
        (
          <button
          onClick={removeFromCart} 
          className="text-gray-700 border-2 border-gray-700 rounded-full font-semibold text-[10px] p-1 px-3 uppercase
          hover:bg-gray-700 hover:text-white transition duration-300">
            Remove Item
          </button>
        ):
        (
        <button
        onClick={addTOCart}
        className="text-gray-700 border-2 border-gray-700 rounded-full font-semibold text-[10px] p-1 px-3 uppercase
          hover:bg-gray-700 hover:text-white transition duration-300">
          Add to cart
        </button>
          )
      }
       </div>
      
    </div>
  )
};

export default Product;
