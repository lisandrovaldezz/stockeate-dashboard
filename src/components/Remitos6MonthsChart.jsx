import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { getRemitosStatsLast6Months } from "../api.js";
import { ChartSkeleton } from "../components/skeletons/ChartSkeleton.jsx";
import { useCharts } from "../hooks/useCharts.js";

export function Remitos6MonthsChart() {
  const { data, loading } = useCharts(
    getRemitosStatsLast6Months,
    "Error al obtener estadísticas de remitos:"
  );

  if (loading) return <ChartSkeleton />;
  if (!data || !data.length) return <p>No hay datos de los últimos meses.</p>;

  return (
    <div style={{ width: "100%", height: "300px" }}>
      <h3 style={{ textAlign: "center", marginBottom: "10px" }}>
        Remitos ingresados y egresados por mes
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="month" tick={{ fill: "#555", fontSize: 13 }} />
          <YAxis tick={{ fill: "#555", fontSize: 13 }} />
          <Tooltip
            cursor={{ fill: "rgba(57, 62, 129, 0.1)" }}
            contentStyle={{
              backgroundColor: "#ffffffff",
              borderRadius: "8px",
              border: "1px solid #ddd",
              boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
            }}
            labelStyle={{ color: "#393e81", fontWeight: "bold" }}
          />
          <Legend
            wrapperStyle={{
              paddingTop: "5px",
              fontSize: "16px",
              color: "#393e81",
            }}
          />
          <Bar
            dataKey="ingresos"
            fill="#393e81"
            radius={[6, 6, 0, 0]}
            name="Ingresos"
            animationDuration={800}
          />
          <Bar
            dataKey="egresos"
            fill="#ff7b00"
            radius={[6, 6, 0, 0]}
            name="Egresos"
            animationDuration={800}
            animationBegin={300}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
