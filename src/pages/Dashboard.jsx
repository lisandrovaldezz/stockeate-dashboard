import { useAuth } from "../hooks/useAuth.js";
import toast from "react-hot-toast";
import { Square } from "../components/Square.jsx";
import { DashboardButton } from "../components/DashboardButton.jsx";
import alertIcon from "../assets/alert-icon.svg";
import { useProducts } from "../hooks/useProducts.js";
import { SquareSkeleton } from "../components/skeletons/SquareSkeleton.jsx";
import product from "../assets/product.svg";
import fileUp from "../assets/file-up.svg";
import fileDown from "../assets/file-down.svg";
import logoutIcon from "../assets/logout.svg";
import productPlus from "../assets/product-plus.svg";
import productMinus from "../assets/product-minus.svg";
import { BackAndTitle } from "../components/BackAndTitle.jsx";
import { useNavigate } from "react-router-dom";
import { useModalNavigation } from "../hooks/useModalNavigation.js";
import { useRemitos } from "../hooks/useRemitos.js";
import { LowStockSkeleton } from "../components/skeletons/LowStockSkeleton.jsx";
import { LastRemitos } from "../components/LastRemitos.jsx";
import { Last6MonthsBarChart } from "../components/Last6MonthsChart.jsx";
import {
  getRemitosStatsLast6Months,
  getProductsStatsLast6Months,
} from "../api.js";

export function Dashboard() {
  const { logout } = useAuth();
  const { products, loading } = useProducts();
  const { stats } = useRemitos();
  const navigate = useNavigate();

  const goToProductsModal = useModalNavigation();
  const goToRemitosModal = useModalNavigation();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Sesión cerrada exitosamente");
      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 700);
    } catch (e) {
      toast.error(e.message);
    }
  };

  const lowStockCount = products.filter((p) => p.stock <= 10).length;
  const totalProducts = products.length;

  return (
    <div className="dashboard-container">
      <aside className="dashboard-aside">
        <BackAndTitle title="STOCKEATE" href="/branches" />
        <DashboardButton
          text="Agregar productos"
          onClick={() => goToProductsModal("/products")}
          color="#393e81ff"
        />
        <DashboardButton
          text="Ver productos"
          onClick={() => {
            navigate("/products");
          }}
          color="#393e81ff"
        />
        <DashboardButton
          text="Crear nuevo remito"
          onClick={() => goToRemitosModal("/remitos")}
          color="#393e81ff"
        />
        <DashboardButton
          text="Historial de remitos"
          onClick={() => navigate("/remitos")}
          color="#393e81ff"
        />

        <button onClick={handleLogout} className="logout-button" type="button">
          <img src={logoutIcon} alt="Cerrar sesión" />
          Cerrar sesión
        </button>
      </aside>
      <main className="dashboard-main">
        <div className="dashboard-squares">
          {!totalProducts ? (
            <SquareSkeleton />
          ) : (
            <Square
              img={product}
              number={totalProducts}
              text="Productos por variedad"
            />
          )}
          {!stats.year ? (
            <SquareSkeleton />
          ) : (
            <Square
              img={productPlus}
              number={stats.totalInQty}
              text="Productos entrada mensuales"
            />
          )}
          {!stats.year ? (
            <SquareSkeleton />
          ) : (
            <Square
              img={productMinus}
              number={stats.totalOutQty}
              text="Productos salida mensuales"
            />
          )}
          {!stats.year ? (
            <SquareSkeleton />
          ) : (
            <Square
              img={fileDown}
              number={stats.inCount}
              text="Remitos entrada mensuales"
            />
          )}
          {!stats.year ? (
            <SquareSkeleton />
          ) : (
            <Square
              img={fileUp}
              number={stats.outCount}
              text="Remitos salida mensuales"
            />
          )}
        </div>
        <section className="dashboard-section">
          <div className="dashboard-ultimos-remitos">
            <h3>Últimos remitos (10)</h3>
            <div className="dashboard-list">
              <LastRemitos />
            </div>
          </div>
          {loading ? (
            <LowStockSkeleton />
          ) : (
            <button
              className="dashboard-low-stock"
              onClick={() => navigate("/products?filterLowStock=true")}
            >
              <div className="dashboard-low-stock-title">
                <img src={alertIcon} alt="alert-icon" />
                <h3>
                  PRODUCTOS
                  <br />
                  STOCK BAJO
                </h3>
              </div>
              <h1>{lowStockCount}</h1>
            </button>
          )}
        </section>
        <section className="dashboard-charts">
          <Last6MonthsBarChart
            apiFunction={getRemitosStatsLast6Months}
            chartTitle="Últimos Remitos"
            bar1Name="Ingresos"
            bar2Name="Egresos"
          />
          <Last6MonthsBarChart
            apiFunction={getProductsStatsLast6Months}
            chartTitle="Últimos Productos"
            bar1Name="Ingresos"
            bar2Name="Egresos"
          />
        </section>
      </main>
    </div>
  );
}
