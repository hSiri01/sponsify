import React from 'react'
import { CartItem } from '../sponsor/molecule/CartItem/App'

type Props = {
    children: React.ReactNode
}

type CartContext = {
    addToCart: (item: CartItem) => void
    removeFromCart: (id: string) => void
    cart: CartItem[]
}

const CartContext = React.createContext({} as CartContext)

export const useCart = () => React.useContext(CartContext)

const CartProvider = ({ children }: Props) => {
    const [cart, setCart] = React.useState<CartItem[]>([])

    const addToCart = (item: CartItem) => {
        console.log(cart.filter(e => e.id !== item.id).concat([item]))
        setCart(existingCart => existingCart.filter(e => e.id !== item.id).concat([item]))
    }

    const removeFromCart = (id: string) => setCart(existingCart => existingCart.filter(e => e.id !== id))

    React.useEffect(() => console.log("CartContext", cart), [cart, setCart])

    return (
        <CartContext.Provider value={{
            addToCart,
            removeFromCart,
            cart
        }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider