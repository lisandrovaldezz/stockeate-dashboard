export function BranchSelectSkeleton({ count = 3 }) {
  return (
    <>
      <div className="branch-select-list">
        {[...Array(count)].map((_, i) => (
          <div key={i} className="branch-select-item branch-skeleton-branch">
            <div className="branch-skeleton-branch-text"></div>
          </div>
        ))}
      </div>

      <button
        className="branch-select-continue branch-skeleton-button"
        disabled
      >
        <div className="branch-skeleton-button-text"></div>
      </button>
    </>
  );
}
