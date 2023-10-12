import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import ShoppingForm from "./ShoppingForm";
import { ShoppingListProvider } from "../context/ShoppingListContext";

test('the "value" field only accepts numbers', () => {
  render(
    <ShoppingListProvider>
      <ShoppingForm />
    </ShoppingListProvider>
  );
  const valueInput = screen.getByPlaceholderText(
    "How many ?"
  ) as HTMLInputElement;

  // Simulate typing a non-numeric value
  fireEvent.change(valueInput, { target: { value: "abc" } });

  // Check if the input value is 'abc' (it should not have changed)
  expect(valueInput.value).toBe("");
  // Check if the input field has the 'Mui-error' class
  expect(valueInput).toHaveAttribute("aria-invalid", "true");

  // Simulate typing a numeric value
  fireEvent.change(valueInput, { target: { value: "123" } });

  // Check if the input value is '123' (it should have accepted the numeric input)
  expect(valueInput.value).toBe("123");
});
