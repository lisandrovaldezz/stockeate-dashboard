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
import { Remitos6MonthsChart } from "../components/Remitos6MonthsChart.jsx";
import { Products6MonthsChart } from "../components/Products6MonthsChart.jsx";

export function Dashboard() {
  const { logout } = useAuth();
  const { products } = useProducts();
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

  const lowStockCount = products.filter((p) => p.stock < 10).length;
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
          {stats.total === 0 ? (
            <SquareSkeleton />
          ) : (
            <Square
              img={productPlus}
              number={stats.totalInQty}
              text="Productos entrada mensuales"
            />
          )}
          {stats.total === 0 ? (
            <SquareSkeleton />
          ) : (
            <Square
              img={productMinus}
              number={stats.totalOutQty}
              text="Productos salida mensuales"
            />
          )}
          {stats.total === 0 ? (
            <SquareSkeleton />
          ) : (
            <Square
              img={fileDown}
              number={stats.inCount}
              text="Remitos entrada mensuales"
            />
          )}
          {stats.total === 0 ? (
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
          {lowStockCount > 0 ? (
            <div className="dashboard-low-stock">
              <div className="dashboard-low-stock-title">
                <img src={alertIcon} alt="alert-icon" />
                <h3>
                  PRODUCTOS
                  <br />
                  STOCK BAJO
                </h3>
              </div>
              <h1>{lowStockCount}</h1>
            </div>
          ) : (
            <LowStockSkeleton />
          )}
        </section>
        <section className="dashboard-charts">
          <Remitos6MonthsChart />
          <Products6MonthsChart />
        </section>
      </main>
    </div>
  );
}
