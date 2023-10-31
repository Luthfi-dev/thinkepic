import React from "react";

function CustomLoadingSpinner({ loading }) {
  return (
    <div className="custom-loading-spinner">
      {loading ? <img src="/path/to/your/loading.gif" alt="Loading" /> : null}
    </div>
  );
}

export default CustomLoadingSpinner;
