import { jsPDF } from "jspdf";
import { autoTable } from "jspdf-autotable";
import { InOutBadge } from "../components/InOutBadge.jsx";

export function RemitoDetalleModal({ remito, onClose }) {
  const calcularTotal = (item) =>
    parseFloat(item.unitPrice) * parseFloat(item.qty);

  const totalGeneral = remito.items.reduce(
    (acc, item) => acc + calcularTotal(item),
    0
  );

  const fecha = new Date(remito.createdAt).toLocaleString();

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");

    doc.text(
      `${remito.type === "IN" ? "Remito de entrada" : "Remito de salida"}`,
      14,
      20
    );
    doc.setFontSize(12);
    const startX = 14;
    const spacing = 2;

    // --- N° temporal ---
    const label1 = "N° temporal:";
    const value1 = `${remito.tmpNumber}`;
    doc.setFont("helvetica", "bold");
    doc.text(label1, startX, 28);

    const label1Width = doc.getTextWidth(label1);
    doc.setFont("helvetica", "normal");
    doc.text(value1, startX + label1Width + spacing, 28);

    // --- Sucursal ---
    const label2 = "Sucursal:";
    const value2 = `${remito.branch.name}`;
    doc.setFont("helvetica", "bold");
    doc.text(label2, startX, 36);

    const label2Width = doc.getTextWidth(label2);
    doc.setFont("helvetica", "normal");
    doc.text(value2, startX + label2Width + spacing, 36);

    // --- Fecha ---
    const label3 = "Fecha:";
    const value3 = `${fecha}`;
    doc.setFont("helvetica", "bold");
    doc.text(label3, startX, 44);

    const label3Width = doc.getTextWidth(label3);
    doc.setFont("helvetica", "normal");
    doc.text(value3, startX + label3Width + spacing, 44);

    const rows = remito.items.map((item) => [
      item.product.name,
      item.product.code,
      item.qty,
      `$${parseFloat(item.unitPrice).toFixed(2)}`,
      `$${(item.qty * parseFloat(item.unitPrice)).toFixed(2)}`,
    ]);

    autoTable(doc, {
      startY: 50,
      head: [["Producto", "Código", "Cantidad", "Precio Unitario", "Importe"]],
      body: rows,
    });

    const finalY = doc.lastAutoTable.finalY + 10;
    doc.text(`Importe total: $${totalGeneral.toFixed(2)}`, 14, finalY);

    doc.save(`${remito.tmpNumber}.pdf`);
  };

  return (
    <div className="remito-modal-overlay" onClick={onClose}>
      <div
        className="remito-modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="remito-modal-header">
          <div className="remito-modal-header-title">
            <h2>{remito.tmpNumber}</h2>
            <InOutBadge type={remito.type} />
          </div>
          <p>
            <strong>Fecha:</strong> {fecha}
          </p>
        </div>

        <div className="remito-modal-table-wrapper">
          <table className="remito-modal-table">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Código</th>
                <th>Cantidad</th>
                <th>Precio Unitario</th>
                <th>Importe Total</th>
              </tr>
            </thead>
            <tbody>
              {remito.items.map((item) => (
                <tr key={item.id}>
                  <td>{item.product.name}</td>
                  <td>{item.product.code}</td>
                  <td>{item.qty}</td>
                  <td>${parseFloat(item.unitPrice).toFixed(2)}</td>
                  <td>${calcularTotal(item).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td
                  colSpan="4"
                  style={{ textAlign: "right", fontWeight: "bold" }}
                >
                  Total general:
                </td>
                <td>${totalGeneral.toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div className="remito-modal-actions">
          <button className="remito-pdf-button" onClick={handleExportPDF}>
            Exportar PDF
          </button>
          <button className="remito-close-button" onClick={onClose}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
