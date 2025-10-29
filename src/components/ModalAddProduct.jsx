import { useEffect, useRef, useState, useCallback } from "react";
import { addProduct } from "../api.js";
import toast from "react-hot-toast";
import cancel from "../assets/cancel.svg";

export function ModalAddProduct({ onClose, fetchProducts }) {
  const [form, setForm] = useState({
    code: "",
    name: "",
    price: "",
    stock: "",
  });

  const [visible, setVisible] = useState(false);
  const modalRef = useRef(null);
  const branchId = localStorage.getItem("branch_id");

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(timeout);
  }, []);

  const handleClose = useCallback(() => {
    setVisible(false);
    setTimeout(onClose, 300);
  }, [onClose]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        handleClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClose]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.code || !form.name || !form.price || !form.stock) {
      toast.error("Completa todos los campos ❌");
      return;
    }

    try {
      await addProduct(branchId, {
        code: form.code,
        name: form.name,
        price: Number(form.price),
        stock: Number(form.stock),
      });

      toast.success("Producto agregado correctamente ✅");
      fetchProducts();
      handleClose();
    } catch (err) {
      let message = err.response?.data?.message;
      if (err.response?.status === 500) {
        message = "Error al crear el producto ❌";
      }
      toast.error(message);
    }
  };

  return (
    <div className={`modal-product-overlay ${visible ? "show" : ""}`}>
      <div
        className={`modal-product-container ${visible ? "show" : ""}`}
        ref={modalRef}
      >
        <button className="modal-product-close" onClick={handleClose}>
          <img src={cancel} alt="Cerrar" />
        </button>
        <h2>Agregar nuevo producto</h2>
        <form className="modal-product-form" onSubmit={handleSubmit}>
          <label>
            Código:
            <input
              type="text"
              name="code"
              value={form.code}
              placeholder="Código del producto"
              onChange={handleChange}
            />
          </label>
          <label>
            Nombre:
            <input
              type="text"
              name="name"
              value={form.name}
              placeholder="Nombre del producto"
              onChange={handleChange}
            />
          </label>
          <label>
            Precio:
            <input
              type="number"
              name="price"
              value={form.price}
              placeholder="100.00"
              onChange={handleChange}
            />
          </label>
          <label>
            Stock:
            <input
              type="number"
              name="stock"
              value={form.stock}
              placeholder="50"
              onChange={handleChange}
            />
          </label>

          <button type="submit" className="modal-product-add-btn">
            Agregar producto
          </button>
        </form>
      </div>
    </div>
  );
}
