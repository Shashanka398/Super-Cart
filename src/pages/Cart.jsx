import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CardItem from "../components/CartItem"
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Cart = () => {
  const {cart}=useSelector((state)=>state);
  console.log(cart);
  const [totalAmount,setTotalAmount]=useState(0);
  useEffect(()=>{
    if(cart)
    {
      setTotalAmount(cart.reduce((acc,curr)=>acc+curr.price,0));
    }
    
  },[cart])
  const placedOrder=()=>{
    toast.success("Order placed successfully")
  }
  return(
      <div>
        {
          cart && cart.length > 0 ?
          (
            <div className="cart flex sm:flex-col sm:w-[8/12] md:flex-row lg:flex-row w-full justify-evenly  mb-8  ">

              <div className="w-[32rem] h-[50rem] overflow-y-scroll scrollbar-none scrollbar-thumb-black scrollbar-track-gray-100  ">
                {
                  cart.map((item,index)=>(
                   <CardItem key={item.id} item={item} itemIndex={index}/>
                  ))
                }
              </div>
              <div className="flex flex-col justify-between gap-10 p-2 mt-7 ">
              <div className="flex flex-col justify-items-center p-6 gap-3 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] rounder-sm">
                <div  className="text-lg font-semibold text-center text-green-500 underline">Your Cart</div>
                <div className="text-green-500 text-center  text-[28px] font-bold">Summary</div>
                <p className="font-semibold text-center text-green-500">
                  <span>Total items: {cart.length}</span>
                </p>
              </div>
              <div className="flex  flex-col p-4 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] rounder-sm gap-4 ">
                <p className="text-lg font-semibold text-green-500">Total Amount : ${totalAmount.toPrecision(4)}</p>
                <button className="p-1 ml-4 font-semibold text-center text-white transition duration-500 bg-green-600 border border-gray-500 rounded-md hover:bg-white hover:text-gray-500 animate-pulse" onClick={placedOrder}>Check Out Now</button>
              </div>
            </div>
              </div>
           
            
          ):
          (<div className="flex flex-col gap-11 text-center w-full mt-[15%]">
            <h1 className="text-lg font-semibold ">Card empty !!</h1>
            <Link to="/">
              <button className="w-32 p-1 ml-4 font-semibold text-center text-white transition duration-500 bg-green-600 border border-gray-500 rounded-md hover:bg-white hover:text-gray-500">
                Shop Now
              </button>
            </Link>
            </div>)
        }

      </div>
  )
};

export default Cart;
