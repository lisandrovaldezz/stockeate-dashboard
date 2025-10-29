export function TableSkeleton({ rows = 5 }) {
  return (
    <tbody className="products-table-body skeleton-products-table-body">
      {[...Array(rows)].map((_, i) => (
        <tr key={i} className="products-table-row skeleton-products-table-row">
          <td className="products-table-cell products-table-code">
            <div className="table-skeleton-cell table-skeleton-code"></div>
          </td>
          <td className="products-table-cell products-table-name">
            <div className="table-skeleton-cell table-skeleton-name"></div>
          </td>
          <td className="products-table-cell products-table-price">
            <div className="table-skeleton-cell table-skeleton-price"></div>
          </td>
          <td className="products-table-cell products-table-stock">
            <div className="table-skeleton-cell table-skeleton-stock"></div>
          </td>
        </tr>
      ))}
    </tbody>
  );
}
