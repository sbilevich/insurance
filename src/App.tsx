import {
  AppBar,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Toolbar,
} from "@mui/material";
import SalesChart from "components/SalesChart";
import SalesList from "components/SalesList";
import SaleForm from "components/sale-form/SaleForm";
import { useProducts } from "hooks/useProducts";
import { FC, useState } from "react";
import { SaleData } from "types/SaleData";

const App: FC = () => {
  const products = useProducts();
  const [sales, setSales] = useState<SaleData[]>([]);

  const [currentSale, setCurrentSale] = useState<SaleData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addSale = (sale: SaleData) => {
    setSales([...sales, sale]);
    setIsModalOpen(false);
  };

  const updateSale = (updatedSale: SaleData) => {
    setSales(
      sales.map((sale) => (sale.id === updatedSale.id ? updatedSale : sale))
    );
    setCurrentSale(null);
    setIsModalOpen(false);
  };

  const deleteSale = (id: string) => {
    setSales(sales.filter((sale) => sale.id !== id));
  };

  const editSale = (sale: SaleData) => {
    setCurrentSale(sale);
    setIsModalOpen(true);
  };

  const handleAddNewSale = () => {
    setCurrentSale(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentSale(null);
  };

  return (
    <div>
      <AppBar position="static" color="transparent">
        <Toolbar>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddNewSale}
          >
            Add Sale
          </Button>
        </Toolbar>
      </AppBar>
      <Dialog
        open={isModalOpen}
        onClose={handleCloseModal}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>{currentSale ? "Edit Sale" : "Add Sale"}</DialogTitle>
        <DialogContent>
          <SaleForm
            products={products}
            addSale={addSale}
            updateSale={updateSale}
            currentSale={currentSale}
            id="sales"
            hideSubmit
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Cancel
          </Button>
          <Button
            form="sales"
            type="submit"
            variant="contained"
            color="primary"
          >
            {currentSale ? "Update" : "Submit"}
          </Button>
        </DialogActions>
      </Dialog>
      <Stack alignItems="center">
        <Container maxWidth="sm">
          <SalesList
            sales={sales}
            editSale={editSale}
            deleteSale={deleteSale}
          />
        </Container>
        <SalesChart sales={sales} />
      </Stack>
    </div>
  );
};

export default App;
