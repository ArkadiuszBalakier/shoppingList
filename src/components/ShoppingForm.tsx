import { v4 as uuidv4 } from "uuid";

import { Button } from "@mui/base";
import { TextField } from "@mui/material";
import { ChangeEvent, FormEvent, useState } from "react";
import { useShoppingList } from "../context/ShoppingListContext";
import { FormData } from "../types";

export default function ShoppingForm() {
  const { addToList } = useShoppingList();
  const [formData, setFormData] = useState<FormData>({
    id: "",
    name: "",
    value: "",
    isBuyed: false,
  });
  const [error, setError] = useState(false);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    const id = uuidv4();

    if (name === "name") {
      if (/^[A-Za-z\s]{0,20}$/.test(value)) {
        // Allow letters and spaces up to 20 characters
        setFormData({ ...formData, id, [name]: value });
        setError(false);
      } else {
        setError(true);
      }
    } else if (name === "value") {
      if (/^\d{0,5}$/.test(value)) {
        // Allow up to 5 digits
        setFormData({ ...formData, id, [name]: value });
        setError(false);
      } else {
        setError(true);
      }
    }
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    addToList(formData);
    setFormData({ id: "", name: "", value: "", isBuyed: false });
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 justify-center">
      <TextField
        data-testid="nameField"
        error={error}
        helperText="max 20 chars"
        autoFocus={true}
        required={true}
        variant="outlined"
        placeholder="What you need to buy ?"
        name="name"
        value={formData.name}
        onChange={handleChange}
      />
      <TextField
        data-testid="valueField"
        error={error}
        helperText="Only numbers and max lenght 5"
        required={true}
        variant="outlined"
        placeholder="How many ?"
        name="value"
        value={formData.value}
        onChange={handleChange}
        className="hover:border-lime-500"
      />
      <Button
        type="submit"
        className="border rounded text-lime-500 p-2 border-lime-500 focus:border-lime-600 hover:bg-lime-200"
      >
        Add to List
      </Button>
    </form>
  );
}
