import React from 'react'
import { CartItemType } from '../sponsor/molecule/CartItem/App'

type Props = {
    children: React.ReactNode
}

type CartContextType = {
    addToCart: (item: CartItemType) => void
    removeFromCart: (id: string) => void
    clearCart: () => void
    cart: CartItemType[]
}

const CartContext = React.createContext({} as CartContextType)

export const useCart = () => React.useContext(CartContext)
const localStorageCart = JSON.parse(localStorage.getItem('cart') || "[]")

const CartProvider = ({ children }: Props) => {
    console.log("Getting local storage ",JSON.parse(localStorage.getItem('cart') || "[]"))
    const [cart, setCart] = React.useState<CartItemType[]>(localStorageCart)

    const addToCart = (item: CartItemType) => {
        console.log(cart.filter(e => e.id !== item.id).concat([item]))
        setCart(existingCart => existingCart.filter(e => e.id !== item.id).concat([item]))
        
    }

    const removeFromCart = (id: string) => setCart(existingCart => existingCart.filter(e => e.id !== id))

    const clearCart = () => setCart([])

    React.useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
        console.log("CartContext", cart)
    }, [cart, setCart])

    return (
        <CartContext.Provider value={{
            addToCart,
            removeFromCart,
            clearCart,
            cart,
        }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider