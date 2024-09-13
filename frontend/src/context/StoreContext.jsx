import { createContext, useEffect, useState } from "react";
import axios from "axios";
export const StoreContext=createContext(null);

const StoreContextProvider=(props)=>{
    const [cartItems,setCartItems]=useState({});
    const url="https://fooddelivery-backend-gxvo.onrender.com";

    const [token,setToken]=useState("");
    const [food_list,setFoodList]=useState([]);
    const addToCart=async (itemId)=>{
        if(!cartItems[itemId])//First entry of the item
        {
            setCartItems((prev)=>({...prev,[itemId]:1}))
        }
        else 
        {
          setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        }
        if(token){//It will add the cart data to the database whenever we are logged in and we have a token
            await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
        }
    }
    const removeFromCart=async (itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
        if(token){
            await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
        }
    }
    const getTotalCartAmount=()=>{
        let totalAmount=0;
        for(const item in cartItems)//for in will iterate the cartItem object
        {
            if(cartItems[item]>0)
            {
                let itemInfro=food_list.find((product)=>product._id === item);
                totalAmount +=itemInfro.price*cartItems[item];
            }
        }
        return totalAmount;
    }
    const fetchFoodList=async ()=>{
        const response=await axios.get(url+"/api/food/list");
        setFoodList(response.data.data);
    }
   const loadCartData=async (token)=>{
    const response=await axios.post(url+"/api/cart/get",{},{headers:{token}})
    setCartItems(response.data.cartData);
   }
    useEffect(()=>{
        async function loadData() {
            await fetchFoodList();
            if(localStorage.getItem("token"))
                {
                   setToken(localStorage.getItem("token"));//It helps to the user to keep logged in even if the refresh button is clicked
                   await loadCartData(localStorage.getItem("token"))
                }
        }
        loadData();
    },[])
    const contextValue={
       food_list,
       cartItems,
       setCartItems,
       addToCart,
       removeFromCart,
       getTotalCartAmount,
       url,
       token,
       setToken
    }
    return(
        <StoreContext.Provider value={contextValue}>
           {props.children}
        </StoreContext.Provider>
    )
}
export default StoreContextProvider;
