import { useEffect, useRef, useState } from "react";
import { TextField, Button, Checkbox } from "@mui/material";
import { FormData } from "../types";
import { useShoppingList } from "../context/ShoppingListContext";

export default function EditMode() {
  const { listItemId, shoppingList, editItem, editingMode } = useShoppingList();
  const [itemToEdit, setItemToEdit] = useState<FormData | null>(null);

  const updateItemToEdit = () => {
    const updatedItem = shoppingList.find(
      (product) => product.id === listItemId
    );
    if (updatedItem) {
      setItemToEdit(updatedItem);
    }
  };

  if (listItemId !== itemToEdit?.id) {
    updateItemToEdit();
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setItemToEdit((prevItem: FormData | null) => {
      return {
        ...prevItem!,
        [name]: value,
      };
    });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (itemToEdit) {
      editItem(itemToEdit);
    }
    editingMode("");
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 justify-center">
      <TextField
        autoFocus={true}
        required={true}
        variant="outlined"
        placeholder="What you need to buy ?"
        name="name"
        value={itemToEdit?.name}
        onChange={handleChange}
      />
      <TextField
        required={true}
        variant="outlined"
        placeholder="How many ?"
        name="value"
        value={itemToEdit?.value}
        onChange={handleChange}
        className="hover:border-lime-500"
      />
      <Checkbox
        checked={itemToEdit?.isBuyed}
        onChange={() => {
          setItemToEdit((prevItem) => {
            if (prevItem) {
              return { ...prevItem, isBuyed: !prevItem.isBuyed };
            }
            return prevItem;
          });
        }}
      />
      <Button
        type="submit"
        className="border rounded text-lime-500 p-2 border-lime-500 focus:border-lime-600 hover:bg-lime-200"
      >
        EDIT
      </Button>
    </form>
  );
}
