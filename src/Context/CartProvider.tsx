import React, {createContext, useEffect ,useState} from 'react';
import { app } from '../config/firebase';

interface Props { 
    children : React.ReactNode
}

interface IContext {
    cartItems : object[]
}

const CartContext = createContext({} as IContext);

const CartProvider: React.SFC<Props> = ({children}) => {

    const [cartItems, setCartItems] = useState<object[]>([]);
    
    useEffect(() => {
        const document = app.firestore();
        return document.collection('Cart').onSnapshot((onsnapshot) => {
            const productData : object[] = []
            onsnapshot.docs.forEach((item : any) => {
                productData.push({...item.data(), id : item.id});
            })
            setCartItems(productData);
        });
    },[])

    return(
        <CartContext.Provider value={{cartItems}}>
            {children}
        </CartContext.Provider>
    )
}

export {CartProvider, CartContext};