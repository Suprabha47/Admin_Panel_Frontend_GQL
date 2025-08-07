import { useMutation } from "@apollo/client";
import { useState } from "react";
import { DELETE_COUPON } from "../../apollo/coupons/couponMutation";

const CouponTable = ({ couponData, refetch }) => {
  const [tab, setTab] = useState("All");
  const [deleteCoupon] = useMutation(DELETE_COUPON);

  const getExpiryDate = (createdAt, duration) => {
    const days = parseInt(duration.match(/(\d+)/)) || 0;
    const date = new Date(parseInt(createdAt));
    date.setDate(date.getDate() + days);
    return date;
  };

  const filteredData = () =>
    tab === "All"
      ? couponData
      : couponData.filter((item) =>
          tab
            .toLowerCase()
            .replace(/[ _]/g, "")
            .includes(item.couponType.toLowerCase().replace(/[ _]/g, ""))
        );

  const handleDelete = async (id) => {
    try {
      const { data } = await deleteCoupon({
        variables: {
          id,
        },
      });
      console.log("delete? ", data?.deleteCoupon);
      await refetch();
    } catch (err) {
      console.log("error deleting coupon..., ", err);
    }
  };
  const getStatus = (createdAt, duration) => {
    const expDate = getExpiryDate(createdAt, duration);
    if (expDate > new Date()) return "Active";
    else return "Expired";
  };

  return (
    <div>
      <ul className="nav nav-tabs px-2 mb-4">
        {[
          "All",
          "Percentage",
          "Fixed Amount",
          "Free Shipping",
          "Price Discount",
        ].map((t) => (
          <li className="nav-item" key={t}>
            <button
              className={`nav-link  ${
                tab === t ? "active bg-secondary border" : ""
              }`}
              onClick={() => {
                setTab(t);
                filteredData();
              }}
            >
              {t} Coupons
            </button>
          </li>
        ))}
      </ul>
      <table
        className="table table-hover align-middle"
        style={{ borderCollapse: "separate", borderSpacing: "0 4px" }}
      >
        <thead>
          <tr className="table-header">
            <th className="rounded-start">
              <i class="bi bi-tags-fill pe-2"></i>Coupon Name
            </th>

            <th>
              <i class="bi bi-hourglass-split pe-2"></i>Status
            </th>
            <th>
              <i class="bi bi-calendar-event-fill pe-2"></i>Created At
            </th>
            <th>
              <i class="bi bi-calendar-x-fill pe-2"></i>Expiry Date
            </th>
            <th className="rounded-end">
              <i class="bi bi-trash-fill pe-2"></i>Delete
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredData().map((coupon) => (
            <tr key={coupon.id} className="">
              <td className="rounded-start align-middle">
                <p className="fs-6 fw-bold m-0">
                  <i className="bi bi-tag-fill text-primary me-2"></i>
                  {coupon.couponName}
                </p>
                <p className=" m-0 text-muted small">{coupon.couponCode}</p>
              </td>
              <td className="align-middle">
                {getStatus(coupon.createdAt, coupon.duration) === "Active" ? (
                  <span className="text-success">Active</span>
                ) : (
                  <span className="text-danger">Expired</span>
                )}
              </td>
              <td className="align-middle">
                {new Date(parseInt(coupon.createdAt)).toLocaleDateString(
                  "en-GB",
                  {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  }
                )}{" "}
              </td>
              <td className="align-middle">
                {getExpiryDate(
                  coupon.createdAt,
                  coupon.duration
                )?.toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </td>
              <td className="rounded-start align-middle">
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => handleDelete(coupon.id)}
                >
                  <i className="bi bi-trash3"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default CouponTable;
