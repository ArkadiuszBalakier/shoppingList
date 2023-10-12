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

test('the "name field only accepts 20 chars or less', () => {
  render(
    <ShoppingListProvider>
      <ShoppingForm />
    </ShoppingListProvider>
  );

  const nameInput = screen.getByPlaceholderText(
    "What you need to buy ?"
  ) as HTMLInputElement;

  fireEvent.change(nameInput, {
    target: { value: "This is Valid string" },
  });
  expect(nameInput.value).toBe("This is Valid string");

  fireEvent.change(nameInput, {
    target: { value: "This is NOT valid string" },
  });
  expect(nameInput).toHaveAttribute("aria-invalid", "true");
});
