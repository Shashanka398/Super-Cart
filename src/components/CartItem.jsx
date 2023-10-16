import { AiFillDelete} from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { remove } from '../redux/Slices/CartSlice';
import toast from 'react-hot-toast';


const CartItem = ({item,itemIndex}) => {

  const dispatch =useDispatch();
  const removeFromCart=()=>{
    dispatch(remove(item.id));
    toast.error("Item removed");
  
  }
  return (
    <div className='flex flex-row justify-items-end mt-10 ml-10 border  border-b-black mr-5 p-2 hover:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] hover:scale-[115%] rounded-sm transiion duration-300'>
      <div className="h-[10rem] w-[8rem]">
        <img src={item.image} alt="product_image" className="w-full h-full"/>
      </div>
      <div className='flex flex-col justify-between ml-14 '>
        <h1 className="w-40 mt-1 text-sm font-semibold text-left truncate text-grey-700">{item.title}</h1>
        <h1 className='w-40 text-gray-400 font-normal text-[15px] text-left'>{item.description.split(" ").splice(0,10).join(" ")+".."}</h1>
        <div className='flex flex-row justify-between'>
          <p className='text-green-600 text-md'>${item.price}</p>
          <div onClick={removeFromCart}>
              <AiFillDelete className='text-red-500 font-bold text-[1.3rem] hover:scale-140 transition duration-500' />
          </div>
        </div>

      </div>


    </div>
  );
};

export default CartItem;
