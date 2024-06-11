import { fireEvent, render, screen, within } from "@testing-library/react";
import SaleForm from "./SaleForm";

describe("SaleForm", () => {
  test("validates required fields", () => {
    const addSale = jest.fn();
    const updateSale = jest.fn();

    render(
      <SaleForm
        products={[]}
        addSale={addSale}
        updateSale={updateSale}
        currentSale={null}
      />
    );

    fireEvent.click(screen.getByText(/submit/i));

    expect(screen.getByText(/first name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/last name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    expect(screen.getByText(/product is required/i)).toBeInTheDocument();
  });

  test("validates email format", () => {
    const addSale = jest.fn();
    const updateSale = jest.fn();

    render(
      <SaleForm
        products={[]}
        addSale={addSale}
        updateSale={updateSale}
        currentSale={null}
      />
    );

    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: "invalid" },
    });
    fireEvent.click(screen.getByText(/submit/i));

    expect(screen.getByText(/email address is invalid/i)).toBeInTheDocument();
  });

  test("validates age", () => {
    const addSale = jest.fn();
    const updateSale = jest.fn();

    render(
      <SaleForm
        products={[]}
        addSale={addSale}
        updateSale={updateSale}
        currentSale={null}
      />
    );

    fireEvent.change(screen.getByLabelText(/age/i), {
      target: { value: "17" },
    });
    fireEvent.click(screen.getByText(/submit/i));

    expect(screen.getByText(/age must be at least 18/i)).toBeInTheDocument();
  });

  test("submits valid form", () => {
    const updateSale = jest.fn();
    const addSale = jest.fn();
    render(
      <SaleForm
        products={[{ id: "1", label: "Product 1", value: "product_1" }]}
        addSale={addSale}
        updateSale={updateSale}
        currentSale={null}
      />
    );

    fireEvent.change(screen.getByLabelText(/first name/i), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByLabelText(/last name/i), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: "john.doe@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/age/i), {
      target: { value: "25" },
    });

    fireEvent.mouseDown(screen.getByLabelText(/product to insure/i));
    const listbox = within(screen.getByRole("listbox"));
    fireEvent.click(listbox.getByText(/Product 1/i));

    fireEvent.click(screen.getByText(/submit/i));

    expect(addSale).toHaveBeenCalledWith({
      id: expect.any(String),
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      age: "25",
      product: {
        id: "1",
        label: "Product 1",
        value: "product_1",
      },
    });
  });

  test("prepopulates form values", async () => {
    const updateSale = jest.fn();
    const addSale = jest.fn();
    const currentSale = {
      id: "1",
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      age: 25,
      product: { id: "1", label: "Product 1", value: "product_1" },
    };
    render(
      <SaleForm
        products={[{ id: "1", label: "Product 1", value: "product_1" }]}
        addSale={addSale}
        updateSale={updateSale}
        currentSale={currentSale}
      />
    );

    expect(screen.getByLabelText(/first name/i)).toHaveValue("John");
    expect(screen.getByLabelText(/last name/i)).toHaveValue("Doe");
    expect(screen.getByLabelText(/email address/i)).toHaveValue(
      "john.doe@example.com"
    );
    expect(screen.getByLabelText(/age/i)).toHaveValue(25);
    expect(screen.getByLabelText(/product to insure/i)).toHaveTextContent(
      "Product 1"
    );
  });
});
