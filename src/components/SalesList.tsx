import DeleteIcon from "@mui/icons-material/Delete";
import {
  Button,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from "@mui/material";
import { FC } from "react";
import { SaleData } from "types/SaleData";

interface SalesListProps {
  sales: SaleData[];
  editSale: (sale: SaleData) => void;
  deleteSale: (id: string) => void;
}

const SalesList: FC<SalesListProps> = ({ sales, editSale, deleteSale }) => {
  return (
    <List>
      {sales.map((sale) => (
        <ListItem key={sale.id}>
          <ListItemText
            primary={`${sale.firstName} ${sale.lastName}`}
            secondary={`Age: ${sale.age}, Product: ${sale.product?.label}`}
          />
          <ListItemSecondaryAction>
            <Button onClick={() => editSale(sale)}>Edit</Button>
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={() => deleteSale(sale.id)}
            >
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
};

export default SalesList;
