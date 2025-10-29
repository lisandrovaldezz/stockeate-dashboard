import { useState, useEffect, useRef } from "react";
import { useProducts } from "../hooks/useProducts.js";
import { TableSkeleton } from "../components/skeletons/TableSkeleton.jsx";
import edit from "../assets/edit.svg";
import cancel from "../assets/cancel.svg";
import save from "../assets/save.svg";
import add from "../assets/add.svg";
import sort from "../assets/sort-alphabetically.svg";
import refresh from "../assets/refresh.svg";
import { updateProduct, toggleProductActive } from "../api.js";
import toast from "react-hot-toast";
import { ToggleSwitch } from "../components/ToggleSwitch.jsx";
import { ModalAddProduct } from "../components/ModalAddProduct.jsx";
import { useSearchParams } from "react-router-dom";
import { BackAndTitle } from "../components/BackAndTitle.jsx";

export function Products() {
  const { products, loading, fetchProducts } = useProducts();
  const [searchTerm, setSearchTerm] = useState("");
  const [editingCode, setEditingCode] = useState(null);
  const [editedProduct, setEditedProduct] = useState({});
  const [showAddModal, setShowAddModal] = useState(false);
  const [showInactive, setShowInactive] = useState(false);
  const [updating, setUpdating] = useState(null);
  const [localStates, setLocalStates] = useState({});
  const [searchParams] = useSearchParams();
  const [sortAscending, setSortAscending] = useState(true);
  const openModal = searchParams.get("openModal");

  const branchId = localStorage.getItem("branch_id");

  const editRef = useRef(null);

  const filteredProducts = products
    .filter(
      (p) =>
        (showInactive ? !p.isActive : p.isActive) &&
        (p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.code.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      if (a.name.toLowerCase() < b.name.toLowerCase())
        return sortAscending ? -1 : 1;
      if (a.name.toLowerCase() > b.name.toLowerCase())
        return sortAscending ? 1 : -1;
      return 0;
    });

  const toggleSortOrder = () => setSortAscending((prev) => !prev);

  useEffect(() => {
    if (openModal === "true") {
      setShowAddModal(true);
    }
  }, [openModal]);

  const handleRefresh = () => fetchProducts();

  const handleEditClick = (product) => {
    setEditingCode(product.code);
    setEditedProduct({ ...product });
  };

  const handleCancelEdit = () => {
    setEditingCode(null);
    setEditedProduct({});
  };

  const handleInputChange = (field, value) => {
    setEditedProduct((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveEdit = async () => {
    try {
      await updateProduct(editingCode, branchId, {
        code: editedProduct.code,
        name: editedProduct.name,
        price: Number(editedProduct.price),
        stock: Number(editedProduct.stock),
      });
      toast.success("Producto actualizado correctamente ✅");
      setEditingCode(null);
      fetchProducts();
    } catch (err) {
      let message = err.response?.data?.message;
      if (err.response?.status === 500) {
        message = "Error al actualizar el producto ❌";
      }
      toast.error(message);
    }
  };

  const handleToggleActive = async (p) => {
    const newState = !p.isActive;

    setLocalStates((prev) => ({ ...prev, [p.code]: newState }));
    setUpdating(p.code);

    try {
      await toggleProductActive(p.code, branchId);
      toast.success(
        `Producto ${newState ? "activado" : "desactivado"} correctamente ✅`
      );
      await fetchProducts();
    } catch (err) {
      console.error(err);
      toast.error("Error al cambiar el estado del producto ❌");

      setLocalStates((prev) => ({ ...prev, [p.code]: p.isActive }));
    } finally {
      setUpdating(null);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (editRef.current && !editRef.current.contains(e.target)) {
        handleCancelEdit();
      }
    };
    if (editingCode) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [editingCode]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSaveEdit();
    }
  };

  return (
    <div className="products-container">
      <BackAndTitle title="Lista de productos" href="/" />
      <div className="products-filters">
        <input
          type="text"
          placeholder="Buscar por nombre o código..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="products-search"
        />
        <button className="products-sort-button" onClick={toggleSortOrder}>
          <img src={sort} alt="Ordenar" title="Ordenar" />
          Ordenar por nombre
        </button>
        <button
          className="add-product-button"
          onClick={() => setShowAddModal(true)}
        >
          <img src={add} alt="Agregar" title="Agregar" />
          Agregar producto
        </button>
        <button className="refresh-products-button" onClick={handleRefresh}>
          <img src={refresh} alt="Actualizar" title="Actualizar" />
          Actualizar
        </button>
        <button
          className={`toggle-inactive-button ${showInactive ? "active" : ""}`}
          onClick={() => setShowInactive((prev) => !prev)}
        >
          {showInactive ? "Ver activos" : "Ver inactivos"}
        </button>
      </div>

      <table className="products-table">
        <thead className="products-table-head">
          <tr className="products-table-row">
            <th className="products-table-row-head products-table-code">
              Código
            </th>
            <th className="products-table-row-head products-table-name">
              Nombre
            </th>
            <th className="products-table-row-head products-table-price">
              Precio
            </th>
            <th className="products-table-row-head products-table-stock">
              Stock
            </th>
            <th className="products-table-row-head products-table-actions"></th>
          </tr>
        </thead>
        {loading ? (
          <TableSkeleton rows={10} />
        ) : (
          <tbody className="products-table-body">
            {filteredProducts.map((p) => (
              <tr
                key={p.id}
                ref={editingCode === p.code ? editRef : null}
                className={`${editingCode === p.code ? "editing-row" : ""} ${
                  p.isActive ? "" : "inactive-row"
                }`}
              >
                <td className="products-table-cell products-table-code">
                  {editingCode === p.code ? (
                    <input
                      type="text"
                      value={editedProduct.code}
                      onChange={(e) =>
                        handleInputChange("code", e.target.value)
                      }
                      onKeyDown={handleKeyDown}
                    />
                  ) : (
                    p.code
                  )}
                </td>
                <td className="products-table-cell products-table-name">
                  {editingCode === p.code ? (
                    <input
                      type="text"
                      value={editedProduct.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      onKeyDown={handleKeyDown}
                    />
                  ) : (
                    p.name
                  )}
                </td>
                <td className="products-table-cell products-table-price">
                  {editingCode === p.code ? (
                    <input
                      type="number"
                      value={editedProduct.price}
                      onChange={(e) =>
                        handleInputChange("price", e.target.value)
                      }
                      onKeyDown={handleKeyDown}
                    />
                  ) : (
                    p.price
                  )}
                </td>
                <td className="products-table-cell products-table-stock">
                  {editingCode === p.code ? (
                    <input
                      type="number"
                      value={editedProduct.stock}
                      onChange={(e) =>
                        handleInputChange("stock", e.target.value)
                      }
                      onKeyDown={handleKeyDown}
                    />
                  ) : (
                    p.stock
                  )}
                </td>
                <td className="products-table-cell products-table-actions">
                  {editingCode === p.code ? (
                    <>
                      <button onClick={handleSaveEdit}>
                        <img
                          src={save}
                          alt="Guardar"
                          title="Guardar"
                          className="products-save-button"
                        />
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="products-cancel-button"
                      >
                        <img src={cancel} alt="Cancelar" title="Cancelar" />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="products-edit-button"
                        onClick={() => handleEditClick(p)}
                      >
                        <img src={edit} alt="Editar" title="Editar" />
                      </button>
                      <ToggleSwitch
                        checked={
                          localStates[p.code] !== undefined
                            ? localStates[p.code]
                            : p.isActive
                        }
                        onChange={() => handleToggleActive(p)}
                        disabled={updating === p.code}
                      />
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
      {showAddModal && (
        <ModalAddProduct
          onClose={() => setShowAddModal(false)}
          fetchProducts={fetchProducts}
        />
      )}
    </div>
  );
}
