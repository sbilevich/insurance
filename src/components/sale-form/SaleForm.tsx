import { Box, Button, MenuItem, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Product, SaleData } from "types/SaleData";

interface SaleFormProps {
  products: Product[];
  addSale: (sale: SaleData) => void;
  updateSale: (sale: SaleData) => void;
  currentSale: SaleData | null;
  id?: string;
  hideSubmit?: boolean;
}

const SaleForm: React.FC<SaleFormProps> = ({
  products,
  addSale,
  updateSale,
  currentSale,
  id,
  hideSubmit,
}) => {
  const [formData, setFormData] = useState<Omit<SaleData, "id">>({
    firstName: "",
    lastName: "",
    email: "",
    age: 18,
    product: null,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (currentSale) {
      setFormData({
        firstName: currentSale.firstName,
        lastName: currentSale.lastName,
        email: currentSale.email,
        age: currentSale.age,
        product: currentSale.product,
      });
    }
  }, [currentSale]);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.firstName) newErrors.firstName = "First Name is required";
    if (!formData.lastName) newErrors.lastName = "Last Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email address is invalid";
    if (!formData.age) newErrors.age = "Age is required";
    else if (formData.age < 18) newErrors.age = "Age must be at least 18";
    if (!formData.product) newErrors.product = "Product is required";
    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleProductSelectChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: products.find(
        (product) => product.id === e.target.value
      ),
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      if (currentSale) {
        updateSale({ ...currentSale, ...formData });
      } else {
        addSale({ ...formData, id: Date.now().toString() });
      }
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        age: 18,
        product: null,
      });
      setErrors({});
    }
  };
  return (
    <form onSubmit={handleSubmit} id={id}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 1 }}>
        <TextField
          fullWidth
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          error={!!errors.firstName}
          helperText={errors.firstName}
          required
        />
        <TextField
          fullWidth
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          error={!!errors.lastName}
          helperText={errors.lastName}
          required
        />
        <TextField
          fullWidth
          label="Email Address"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
          required
        />
        <TextField
          fullWidth
          label="Age"
          name="age"
          type="number"
          value={formData.age}
          onChange={handleChange}
          error={!!errors.age}
          helperText={errors.age}
          required
        />
        <TextField
          select
          fullWidth
          label="Product to Insure"
          name="product"
          value={formData.product?.id ?? ""}
          onChange={handleProductSelectChange}
          error={!!errors.product}
          helperText={errors.product}
          required
        >
          {products.map((product) => (
            <MenuItem key={product.id} value={product.id}>
              {product.label}
            </MenuItem>
          ))}
        </TextField>
        {!hideSubmit && (
          <Button type="submit" variant="contained" color="primary">
            {currentSale ? "Update" : "Submit"}
          </Button>
        )}
      </Box>
    </form>
  );
};

export default SaleForm;
