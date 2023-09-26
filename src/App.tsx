import { useEffect } from "react";
import Header from "./components/Header";
import ShoppingForm from "./components/ShoppingForm";
import ShoppingList from "./components/ShoppingList";
import { useShoppingList } from "./context/ShoppingListContext";
import "./index.css";

function App() {
  const { getLocalStorageList } = useShoppingList();

  useEffect(() => {
    getLocalStorageList();
  }, [getLocalStorageList]);

  return (
    <div className="h-screen font-primary">
      <Header />
      <ShoppingForm />
      <ShoppingList />
    </div>
  );
}

export default App;
