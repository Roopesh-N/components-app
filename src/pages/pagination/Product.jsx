
export const Product = ({ productDetails }) => {
  var { title, thumbnail, price, category, brand } = productDetails;
  return (
    <div className="product-card">
      <div className="product-img">
        <img src={thumbnail} alt="product-img" />
      </div>
      <div className="product-details">
        <p>{title}</p>
        <p>{(price / 100).toFixed(2)} $</p>
      </div>
    </div>
  );
};
