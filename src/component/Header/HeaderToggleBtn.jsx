const HeaderToggleBtn = () => {
  return (
    <>
      <div className="d-flex">
        <button
          type="button"
          className="btn btn-link d-none d-xl-block sidebar-mini-btn p-0 text-primary"
        >
          <span className="hamburger-icon">
            <span className="line" />
            <span className="line" />
            <span className="line" />
          </span>
        </button>
        <button
          type="button"
          className="btn btn-link d-block d-xl-none menu-toggle p-0 text-primary"
        >
          <span className="hamburger-icon">
            <span className="line" />
            <span className="line" />
            <span className="line" />
          </span>
        </button>
      </div>
    </>
  );
};
export default HeaderToggleBtn;
