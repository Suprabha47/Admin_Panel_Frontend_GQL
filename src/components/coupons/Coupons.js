import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { COUPONS_LISTING } from "../../apollo/coupons/couponQuery";
import CouponTable from "./CouponTable.js";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const CouponHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="d-flex justify-content-between align-items-center mb-3">
      <h4>Coupons</h4>
      <button
        className="btn btn-primary"
        onClick={() => navigate("add-coupon")}
      >
        <i className="bi bi-plus-lg me-1"></i>Create
      </button>
    </div>
  );
};

const Coupons = () => {
  const [couponData, setCouponData] = useState([]);

  const { data, loading, refetch } = useQuery(COUPONS_LISTING, {
    fetchPolicy: "no-cache",
  });

  useEffect(() => {
    if (!loading && data?.getAllCoupons) {
      setCouponData(data?.getAllCoupons);
    }
  }, [data, loading]);

  if (loading) {
    return (
      <div className="container mt-4">
        <CouponHeader />
        <div className="d-flex justify-content-center my-4">
          <div className="spinner-border  text-primary" role="status"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <CouponHeader />
      <CouponTable couponData={couponData} refetch={refetch} />
      <ToastContainer />
    </div>
  );
};

export default Coupons;
