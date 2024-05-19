import { useLineChartData } from "../../context/LineChartDataContext";

const Savings = () => {
  const { dataLineChart } = useLineChartData();
  console.log(dataLineChart);
  return <div>Hello</div>;
};

export default Savings;
