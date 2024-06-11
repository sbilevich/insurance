import { FC } from "react";
import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";
import { SaleData } from "types/SaleData";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];

interface SalesChartProps {
  sales: SaleData[];
}

const SalesChart: FC<SalesChartProps> = ({ sales }) => {
  const productSalesCount = sales.reduce((acc, sale) => {
    if (sale.product) {
      acc[sale.product.label] = (acc[sale.product.label] || 0) + 1;
    }
    return acc;
  }, {} as { [key: string]: number });

  const data = Object.keys(productSalesCount).map((label) => ({
    name: label,
    value: productSalesCount[label],
  }));

  return (
    <PieChart width={400} height={400}>
      <Pie
        data={data}
        cx={200}
        cy={200}
        labelLine={false}
        outerRadius={150}
        fill="#8884d8"
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default SalesChart;
