import React, { createContext, useContext, useState } from "react";
import { FormData } from "../types";

type ShoppingListData = {
  shoppingList: FormData[];
  addToList: (formData: FormData) => void;
  getLocalStorageList: () => void;
  isBuyedCheck: (id: string) => void;
  deleteProduct: (id: string) => void;
  editing: boolean;
  editingMode: () => void;
  clearList: () => void;
};

const ShoppingListContext = createContext<ShoppingListData | undefined>(
  undefined
);

export function useShoppingList() {
  const context = useContext(ShoppingListContext);
  if (!context) {
    throw new Error(
      "useShoppingList must be used whitin a ShopingListProvider "
    );
  }
  return context;
}

export function ShoppingListProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [shoppingList, setShoppingList] = useState<FormData[]>([]);
  const [editing, setEditing] = useState(false);

  const getLocalStorageList = () => {
    const shoppingData = localStorage.getItem("ShoppingList");
    const shoppingArray: FormData[] = shoppingData
      ? JSON.parse(shoppingData)
      : [];
    setShoppingList(shoppingArray);
  };

  const addToList = (formData: FormData) => {
    const existingShoppingListArray = localStorage.getItem("ShoppingList");
    const shoppingListArray = existingShoppingListArray
      ? JSON.parse(existingShoppingListArray)
      : [];

    shoppingListArray.push(formData);
    localStorage.setItem("ShoppingList", JSON.stringify(shoppingListArray));
    setShoppingList(shoppingListArray);
    console.log(shoppingList);
  };

  const isBuyedCheck = (id: string) => {
    const buyedProductIndex = shoppingList.findIndex(
      (product) => product.id === id
    );
    if (buyedProductIndex !== -1) {
      const updatedShoppingList = [...shoppingList];
      updatedShoppingList[buyedProductIndex].isBuyed = true;
      setShoppingList(updatedShoppingList);
      localStorage.setItem("ShoppingList", JSON.stringify(updatedShoppingList));
    }
  };

  const deleteProduct = (id: string) => {
    const updatedShoppingList = shoppingList.filter(
      (product) => product.id !== id
    );
    setShoppingList(updatedShoppingList);
    localStorage.setItem("ShoppingList", JSON.stringify(updatedShoppingList));
  };

  const clearList = () => {
    setShoppingList([]);
    localStorage.removeItem("ShoppingList");
  };

  const editingMode = () => {
    setEditing(!editing);
  };

  const value: ShoppingListData = {
    shoppingList,
    addToList,
    getLocalStorageList,
    isBuyedCheck,
    deleteProduct,
    editing,
    editingMode,
    clearList,
  };

  return (
    <ShoppingListContext.Provider value={value}>
      {children}
    </ShoppingListContext.Provider>
  );
}
