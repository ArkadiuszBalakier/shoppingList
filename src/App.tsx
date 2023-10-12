import { useEffect } from "react";
import Header from "./components/Header";
import ShoppingForm from "./components/ShoppingForm";
import ShoppingList from "./components/ShoppingList";
import { useShoppingList } from "./context/ShoppingListContext";
import EditMode from "./components/EditMode";
import { ShoppingListProvider } from "./context/ShoppingListContext";
import "./index.css";

function App() {
  const { getLocalStorageList } = useShoppingList();

  useEffect(() => {
    getLocalStorageList();
  }, [getLocalStorageList]);

  return (
    <ShoppingListProvider>
      <div className="h-screen font-primary scroll-m-1 m-1">
        <Header />
        <Content />
      </div>
    </ShoppingListProvider>
  );
}

function Content() {
  const { getLocalStorageList, editing } = useShoppingList();

  useEffect(() => {
    getLocalStorageList();
  }, [getLocalStorageList]);

  return editing ? (
    <EditMode />
  ) : (
    <div>
      <ShoppingForm />
      <ShoppingList />
    </div>
  );
}

export default App;
