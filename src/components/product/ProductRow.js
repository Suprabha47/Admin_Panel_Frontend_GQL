import { Link } from "react-router-dom";

const ProductRow = ({ p, index, handleDel }) => {
  return (
    <tr key={p.id}>
      <td className="rounded-start align-middle">{index + 1}</td>
      <td className=" align-middle">
        <div className="d-flex align-items-center ">
          <img
            src={p.image}
            alt={p.productName}
            className="me-2 rounded"
            style={{
              width: 40,
              maxHeight: 40,
              objectFit: "contain",
            }}
          />

          <div>
            <div>{p.productName}</div>
            <small className="text-muted"></small>
          </div>
        </div>
      </td>
      <td className="align-middle">{p.category}</td>
      <td className="align-middle">$ {p.price}</td>
      <td className=" align-middle">
        <Link to={`update-product/${p.id}`} state={p}>
          <button className="btn btn-outline-secondary me-2">
            <i className="bi bi-pencil-square"></i>
          </button>
        </Link>
      </td>
      <td className="rounded-end align-middle">
        <button className="btn btn-outline-danger">
          <i className="bi bi-trash" onClick={() => handleDel(p.id)}></i>
        </button>
      </td>
    </tr>
  );
};

export default ProductRow;
