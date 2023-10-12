import { fireEvent, render, screen } from "@testing-library/react";
import ShoppingListItem from "./ShoppingListItem";
import { ShoppingListProvider } from "../context/ShoppingListContext";

test("renders ShoppingListItem with name, value, and checkboxes", () => {
  const product = {
    id: "1",
    name: "Test Product",
    value: "5",
    isBuyed: false,
  };

  render(
    <ShoppingListProvider>
      <ShoppingListItem {...product} />
    </ShoppingListProvider>
  );

  const nameElement = screen.getByText(product.name);
  const valueElement = screen.getByText(product.value);
  const checkboxElement = screen.getByRole("checkbox");

  expect(nameElement).toBeInTheDocument();
  expect(nameElement).toHaveTextContent("Test Product");
  expect(valueElement).toBeInTheDocument();
  expect(valueElement).toHaveTextContent("5");
  expect(checkboxElement).toBeInTheDocument();
  expect(checkboxElement).not.toBeChecked();
});

test("toggle line-thrue class on checkbox", async () => {
  const product = {
    id: "2",
    name: "Test Prduct",
    value: "5",
    isBuyed: false,
  };

  render(
    <ShoppingListProvider>
      <ShoppingListItem {...product} />
    </ShoppingListProvider>
  );

  const checkboxElement = screen.getByRole("checkbox");
  const listItemElement = screen.getByText(product.name);

  expect(listItemElement).not.toHaveClass("line-through");
  fireEvent.click(checkboxElement);
  expect(listItemElement).toHaveClass("line-through");
});
