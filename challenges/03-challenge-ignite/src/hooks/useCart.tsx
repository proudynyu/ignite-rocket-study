import { createContext, ReactNode, useContext, useState } from "react";
import { toast } from "react-toastify";
import { api } from "../services/api";
import { Product, Stock } from "../types";

interface CartProviderProps {
  children: ReactNode;
}

interface UpdateProductAmount {
  productId: number;
  amount: number;
}

interface CartContextData {
  cart: Product[];
  addProduct: (productId: number) => Promise<void>;
  removeProduct: (productId: number) => void;
  updateProductAmount: ({ productId, amount }: UpdateProductAmount) => void;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: CartProviderProps): JSX.Element {
  const storageName = "@RocketShoes:cart";
  const [cart, setCart] = useState<Product[]>(() => {
    const storagedCart = localStorage.getItem(storageName);

    if (storagedCart) {
      return JSON.parse(storagedCart);
    }

    return [];
  });

  const updateLocalStorage = (data: Product[]) => {
    localStorage.setItem(storageName, JSON.stringify(data));
  };

  const addProduct = async (productId: number) => {
    try {
      const { data: hasStock, status } = await api.get<Stock>(
        `/stock/${productId}`
      );

      if (!hasStock.amount || status !== 200) {
        toast.error("Quantidade solicitada fora de estoque");
        return;
      }

      const alreadyHasProduct = cart.find(
        (product) => product.id === productId
      );

      if (!alreadyHasProduct) {
        const { data: product } = await api.get<Product>(
          `/products/${productId}`
        );

        updateLocalStorage([...cart, { ...product, amount: 1 }]);
        setCart([...cart, { ...product, amount: 1 }]);
        toast.success("Produto adicionado com sucesso");
        return;
      }

      const amount = alreadyHasProduct.amount + 1;

      if (amount > hasStock.amount) {
        toast.error("Quantidade solicitada fora de estoque");
        return;
      }

      const updatedCart = cart.map((product) => {
        if (product.id === productId) {
          product.amount += 1;
        }
        return product;
      });

      updateLocalStorage(updatedCart);
      setCart(updatedCart);
    } catch {
      toast.error("Erro na adição do produto");
    }
  };

  const removeProduct = (productId: number) => {
    try {
      const productExistOnCart = cart.some(
        (product) => product.id === productId
      );
      if (!productExistOnCart) throw new Error();

      const updatedCart = cart.filter((product) => product.id !== productId);
      updateLocalStorage(updatedCart);
      setCart(updatedCart);
      toast.success("Produto removido com sucesso");
    } catch {
      toast.error("Erro na remoção do produto");
    }
  };

  const updateProductAmount = async ({
    productId,
    amount,
  }: UpdateProductAmount) => {
    try {
      if (amount <= 0) return;

      const { data: stock } = await api.get<Stock>(`/stock/${productId}`);

      if (amount > stock.amount) {
        toast.error("Quantidade solicitada fora de estoque");
        return;
      }

      const findableProduct = cart.find(product => product.id === productId)

      if (!findableProduct) {
        toast.error("Erro na alteração de quantidade do produto");
        return;
      }

      const updatedCart = cart.map((product) => {
        if (product.id === productId) {
          return {
            ...product,
            amount,
          };
        }
        return product;
      });

      setCart(updatedCart);
      updateLocalStorage(updatedCart);
    } catch {
      toast.error("Erro na alteração de quantidade do produto");
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, addProduct, removeProduct, updateProductAmount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextData {
  const context = useContext(CartContext);

  return context;
}
