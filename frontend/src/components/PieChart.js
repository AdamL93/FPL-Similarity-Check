import { PieChart, Pie, Cell} from "recharts";

function PieChartComponent({ similarityPrcentage }) {
  const remainingPercentage = 100 - similarityPrcentage;

  const data = [
    { name: "Percentage", value: similarityPrcentage },
    { name: "Remaining", value: remainingPercentage }
  ];

  // Custom colors for the Pie sections
  const colors = ["#0088FE", "#FFBB28"];
  return (
    <div style={{ textAlign: "center" }}>
      <PieChart width={300} height={300}>
        <Pie
          data={data}
          dataKey="value"
          cx={150}
          cy={150}
          outerRadius={80}
          fill="#8884d8"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index]} />
          ))}

        </Pie>
      </PieChart>
    </div>
  );
}

export default PieChartComponent;