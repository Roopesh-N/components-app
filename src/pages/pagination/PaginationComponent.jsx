import { Product } from "./Product";
import "./paginationComponent.css"
import { usePagination } from "./usePagination";


var pageSizeOptions = [
  { value: 10, label: "Size of 10" },
  { value: 15, label: "Size of 15" },
  { value: 20, label: "Size of 20" },
];

export const PaginationComponent = () => {

    var {products, pageSize, currentPage, setPageSize, totalPages, setCurrentPage} = usePagination();

  if (products.length == 0) {
    return <div>No Products</div>;
  }
  return (
    <div className="pagination-component">
      <div className="pagination">
        <select value={pageSize} onChange={(e) => setPageSize(e.target.value)}>
          {pageSizeOptions.map(({ label, value }, index) => {
            return (
              <option value={value} key={index}>
                {label}
              </option>
            );
          })}
        </select>{" "}
        <button
          className="prevBtn"
          onClick={() => setCurrentPage((prev) => prev - 1)}
          disabled={currentPage == 0}
        >
          Prev
        </button>
        <span>
          {" "}
          {currentPage + 1} of {totalPages}
        </span>{" "}
        <button
          className="nxtBtn"
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage == totalPages - 1}
        >
          Next
        </button>
      </div>
      <div className="product-list">
        {products.map((product, index) => {
          return <Product key={product.id} productDetails={product} />;
        })}
      </div>
    </div>
  );
};


