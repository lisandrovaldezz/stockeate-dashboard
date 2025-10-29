export function RemitoMiniCardSkeleton() {
  return (
    <div className="remito-mini-card skeleton-mini-card">
      <div className="remito-mini-card-left">
        <div className="remito-mini-card-skeleton skeleton-remito-mini-title"></div>
        <div className="remito-mini-card-info">
          <div className="remito-mini-card-skeleton skeleton-remito-mini-text"></div>
          <div className="remito-mini-card-skeleton skeleton-remito-mini-text"></div>
          <div className="remito-mini-card-skeleton skeleton-remito-mini-text"></div>
        </div>
      </div>
      <div className="remito-mini-card-right">
        <div className="remito-mini-card-skeleton skeleton-remito-mini-badge"></div>
        <div className="remito-mini-card-skeleton skeleton-remito-mini-button"></div>
      </div>
    </div>
  );
}
