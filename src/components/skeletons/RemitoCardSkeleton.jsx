export function RemitoCardSkeleton() {
  return (
    <div className="remito-card remito-skeleton-card">
      <div className="remito-card-header">
        <div className="remito-skeleton remito-skeleton-remito-title"></div>
        <div className="remito-skeleton remito-skeleton-badge"></div>
      </div>
      <div className="remito-skeleton remito-skeleton-text"></div>
      <div className="remito-skeleton remito-skeleton-text-short"></div>
      <div className="remito-skeleton remito-skeleton-button"></div>
    </div>
  );
}
