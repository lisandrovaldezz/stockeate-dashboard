import { useState, useEffect, useRef } from "react";
import { createRemito } from "../api";
import { useRemitos } from "../hooks/useRemitos.js";
import { useProducts } from "../hooks/useProducts.js";
import toast from "react-hot-toast";
import cancel from "../assets/cancel.svg";

export function ModalAddRemito({ onClose }) {
  const modalRef = useRef(null);
  const { fetchRemitos } = useRemitos();
  const { products, fetchProducts } = useProducts();

  const [formData, setFormData] = useState({
    tmpNumber: "",
    officialNumber: "",
    customer: "",
    notes: "",
    type: "IN",
    items: [],
  });

  const [selectedProduct, setSelectedProduct] = useState("");
  const [qty, setQty] = useState("");
  const [unitPrice, setUnitPrice] = useState("");

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProductSelect = (e) => {
    const id = e.target.value;
    setSelectedProduct(id);
    const product = products.find((p) => p.id === id);
    if (product) {
      setUnitPrice(product.price);
    }
  };

  const handleAddItem = () => {
    if (!selectedProduct || !qty || !unitPrice) return;
    const product = products.find((p) => p.id === selectedProduct);

    setFormData((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          productId: product.id,
          productCode: product.code,
          qty: Number(qty),
          unitPrice: Number(unitPrice),
          product,
        },
      ],
    }));

    setSelectedProduct("");
    setQty("");
    setUnitPrice("");
  };

  const handleRemoveItem = (index) => {
    setFormData((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const branchId = localStorage.getItem("branch_id");

    if (!branchId) {
      toast.error("Falta seleccionar sucursal");
      return;
    }

    if (!formData.items.length) {
      toast.error("Debe agregar al menos un producto al remito");
      return;
    }

    const newRemito = {
      ...formData,
      branchId,
    };

    try {
      await createRemito(newRemito);
      toast.success("Remito creado correctamente ✅");
      await fetchRemitos();
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || "Error al crear remito");
    }
  };

  return (
    <div className="remito-add-modal-overlay">
      <div ref={modalRef} className="remito-add-modal-content">
        <button className="modal-add-remito-close" onClick={onClose}>
          <img src={cancel} alt="Cerrar" />
        </button>
        <h2>Crear Remito</h2>
        <form onSubmit={handleSubmit} className="remito-add-form">
          <div className="remito-add-form-group">
            <label>Número Temporal</label>
            <input
              name="tmpNumber"
              value={formData.tmpNumber}
              onChange={handleChange}
              placeholder="TMP-001"
              required
            />
          </div>

          <div className="remito-add-form-group">
            <label>Número Oficial</label>
            <input
              name="officialNumber"
              value={formData.officialNumber}
              placeholder="A-0001-00000123"
              onChange={handleChange}
            />
          </div>

          <div className="remito-add-form-group">
            <label>Cliente / Proveedor</label>
            <input
              name="customer"
              value={formData.customer}
              onChange={handleChange}
              placeholder="Nombre del cliente o proveedor"
              required
            />
          </div>

          <div className="remito-add-form-group">
            <label>Notas</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Notas adicionales..."
            />
          </div>

          <div className="remito-add-form-group">
            <label>Tipo</label>
            <select name="type" value={formData.type} onChange={handleChange}>
              <option value="IN">Entrada</option>
              <option value="OUT">Salida</option>
            </select>
          </div>

          <hr />

          <h3>Agregar Productos</h3>
          <div className="remito-add-product-selector">
            <select value={selectedProduct} onChange={handleProductSelect}>
              <option value="">Seleccionar producto</option>
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} (Stock: {p.stock})
                </option>
              ))}
            </select>

            <input
              type="number"
              placeholder="Cantidad"
              value={qty}
              onChange={(e) => setQty(e.target.value)}
            />
            <input
              type="number"
              placeholder="Precio unitario"
              value={unitPrice}
              onChange={(e) => setUnitPrice(e.target.value)}
            />
            <button type="button" onClick={handleAddItem}>
              Agregar
            </button>
          </div>

          <ul className="remito-add-item-list">
            {formData.items.map((item, index) => (
              <li key={index}>
                {item.product.name} - Cant: {item.qty} - Precio: $
                {item.unitPrice}{" "}
                <button
                  type="button"
                  className="remito-add-remove-btn"
                  onClick={() => handleRemoveItem(index)}
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>

          <div className="remito-add-modal-actions">
            <button type="submit">Guardar</button>
            <button type="button" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
