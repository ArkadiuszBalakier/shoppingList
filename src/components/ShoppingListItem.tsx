import Checkbox from "@mui/material/Checkbox";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { FormData } from "../types";
import { useShoppingList } from "../context/ShoppingListContext";

export default function ShoppingListItem({
  id,
  name,
  value,
  isBuyed,
}: FormData) {
  const linethrough = isBuyed ? " line-through" : "";
  const { isBuyedCheck, deleteProduct, editingMode } = useShoppingList();
  return (
    <li className="flex w-full justify-between text-xl mb-5 border-b">
      <div className={`flex flex-1${linethrough}`}>
        <p className="mr-5">{name}</p>
        <p>{value}</p>
      </div>
      <div className="flex justify-end">
        <Checkbox
          checked={isBuyed}
          onChange={() => {
            isBuyedCheck(id);
          }}
        />
      </div>
      <div>
        <IconButton
          onClick={() => {
            deleteProduct(id);
          }}
        >
          <DeleteIcon />
        </IconButton>
        <IconButton
          onClick={() => {
            editingMode(id);
          }}
        >
          <EditIcon />
        </IconButton>
      </div>
    </li>
  );
}
