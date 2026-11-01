import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DashboardCharts = ({ prendas }) => {
  const cantidades = {};

  prendas.forEach((prenda) => {
    const tipo = prenda.tipo || "Sin categoría";

    cantidades[tipo] = (cantidades[tipo] || 0) + 1;
  });

  const data = {
    labels: Object.keys(cantidades),
    datasets: [
      {
        label: "Cantidad de prendas",
        data: Object.values(cantidades),
        backgroundColor: "#557A64",
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <section className="dashboard-charts">
      <h2>Tu armario por categoría</h2>
      <p>Distribución de las prendas que guardaste.</p>

      {prendas.length > 0 ? (
        <div className="chart-container">
          <Bar data={data} options={options} />
        </div>
      ) : (
        <p>Todavía no hay prendas para mostrar.</p>
      )}
    </section>
  );
};

export default DashboardCharts;
