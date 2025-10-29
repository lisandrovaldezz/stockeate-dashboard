export function ChartSkeleton() {
  return (
    <div className="chart-skeleton-container">
      <div className="chart-skeleton skeleton-chart-title"></div>
      <div className="chart-skeleton-content">
        <div className="chart-skeleton-y-axis">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="chart-skeleton chart-skeleton-y-label"
            ></div>
          ))}
        </div>
        <div className="chart-skeleton-bars">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="chart-skeleton-bar-group">
              <div className="chart-skeleton-bar-pair">
                <div
                  className="chart-skeleton chart-skeleton-bar chart-skeleton-bar-1"
                  style={{ height: `${Math.random() * 60 + 30}%` }}
                ></div>
                <div
                  className="chart-skeleton chart-skeleton-bar chart-skeleton-bar-2"
                  style={{ height: `${Math.random() * 60 + 30}%` }}
                ></div>
              </div>
              <div className="chart-skeleton chart-skeleton-x-label"></div>
            </div>
          ))}
        </div>
      </div>
      <div className="chart-skeleton-legend">
        <div className="chart-skeleton-legend-item">
          <div className="chart-skeleton chart-skeleton-legend-color chart-skeleton-legend-color-1"></div>
          <div className="chart-skeleton chart-skeleton-legend-text"></div>
        </div>
        <div className="chart-skeleton-legend-item">
          <div className="chart-skeleton chart-skeleton-legend-color chart-skeleton-legend-color-2"></div>
          <div className="chart-skeleton chart-skeleton-legend-text"></div>
        </div>
      </div>
    </div>
  );
}
