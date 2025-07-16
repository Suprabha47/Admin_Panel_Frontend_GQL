import { Link } from "react-router-dom";

const ProductRow = ({ p, index, handleDel }) => {
  return (
    <tr key={p.id}>
      <td>{index + 1}</td>
      <td>
        <div className="d-flex align-items-center ">
          {/* <img
            //src={`${process.env.REACT_APP_BACKEND_URL}/productImages/${p.image}`}
            alt={p.productName}
            className="me-2 rounded"
            style={{
              width: 40,
              maxHeight: 40,
              objectFit: "contain",
            }}
          /> */}

          <div>
            <div>{p.productName}</div>
            <small className="text-muted"></small>
          </div>
        </div>
      </td>
      <td>{p.category}</td>
      <td>₹{p.price}</td>
      <td>
        <Link to={`update-product/${p.id}`} state={p}>
          <button className="btn btn-outline-secondary me-2">
            <i className="bi bi-pencil-square"></i>
          </button>
        </Link>
      </td>
      <td>
        <button className="btn btn-outline-danger">
          <i className="bi bi-trash" onClick={() => handleDel(p.id)}></i>
        </button>
      </td>
    </tr>
  );
};

export default ProductRow;
