import Button from "@mui/material/Button";
import ShoppingListItem from "./ShoppingListItem";
import { useShoppingList } from "../context/ShoppingListContext";

export default function ShoppingList() {
  const { shoppingList, clearList } = useShoppingList();

  return (
    <>
      <ul className="flex lg:w-1/3 m-auto justify-center mt-10 flex-col items-center">
        {shoppingList.length > 0
          ? shoppingList?.map((product) => (
              <ShoppingListItem
                key={product.id}
                id={product.id}
                name={product.name}
                value={product.value}
                isBuyed={product.isBuyed}
              />
            ))
          : []}
      </ul>
      {shoppingList.length > 0 && (
        <div className="lg:w-1/3 m-auto flex justify-end">
          <Button
            variant="outlined"
            size="small"
            color="error"
            onClick={() => {
              clearList();
            }}
          >
            Clear List
          </Button>
        </div>
      )}
    </>
  );
}
