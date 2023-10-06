import { useEffect } from "react";
import Header from "./components/Header";
import ShoppingForm from "./components/ShoppingForm";
import ShoppingList from "./components/ShoppingList";
import { useShoppingList } from "./context/ShoppingListContext";
import "./index.css";
import EditMode from "./components/EditMode";

function App() {
  const { getLocalStorageList, editing } = useShoppingList();

  useEffect(() => {
    getLocalStorageList();
  }, [getLocalStorageList]);

  return (
    <div className="h-screen font-primary scroll-m-1">
      <Header />
      {editing ? (
        <EditMode />
      ) : (
        <>
          <ShoppingForm />
          <ShoppingList />
        </>
      )}
    </div>
  );
}

export default App;
