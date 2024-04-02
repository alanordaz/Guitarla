import { useEffect,useState,useMemo } from "react"
import {db} from '../data/db'

export const useCart =  () =>{

    const initialCart = () => {
        const localStorageCart = localStorage.getItem('cart')
        return localStorageCart ? JSON.parse(localStorageCart) : []
      }
    
      const [data] = useState(db)
      const [cart,setCart] = useState(initialCart)
    
      const MAX_ITEMS = 5
      const MIN_ITEMS = 1
    
      useEffect (() =>{
        localStorage.setItem('cart', JSON.stringify(cart))
      }, [cart])
    
    
      function addToCart(item){
        const itemExist = cart.findIndex(guitar => guitar.id === item.id)
        if(itemExist >= 0) {
          //if(cart([itemExist].quiantity >= MAX_ITEMS) return
          const updateCart = [...cart]
          updateCart[itemExist].quiantity++
          setCart(updateCart)
        } else {
          item.quiantity = 1
          setCart([...cart,item])
        }
      
      }
    
    
      function removeFromCart(id){
        setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
      }
    
      function increaseQuantity(id){
        const updateCart = cart.map( item => {
          if(item.id === id && item.quiantity < MAX_ITEMS){
            return{
              ...item,
              quiantity: item.quiantity + 1
            }
          }
          return item
        })
        setCart(updateCart)
      }
    
      function decrementQuantity(id){
        const updateCart = cart.map(item => {
          if(item.id === id && item.quiantity > MIN_ITEMS){
            return{
              ...item,
              quiantity: item.quiantity - 1 
            }
          }
          return item
        })
        setCart(updateCart)
      }
    
      function clearCart() {
        setCart([])
      }

      const isEmpty = useMemo( () => cart.length === 0, [cart] )
      const cartTotal = useMemo( () => cart.reduce( (total, item) => total + (item.quiantity * item.price), 0),[cart])

    
    
    return {
        data,
        cart,
        addToCart,
        removeFromCart,
        decrementQuantity,
        increaseQuantity,
        clearCart,
        isEmpty,
        cartTotal
        
    }
}