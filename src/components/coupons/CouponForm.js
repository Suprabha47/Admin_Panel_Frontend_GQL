import { useMutation } from "@apollo/client";
import { useState } from "react";
import { Link } from "react-router-dom";
import { CREATE_COUPON } from "../../apollo/coupons/couponMutation";
import { Toaster, toast } from "react-hot-toast";

const CouponForm = () => {
  const [formData, setFormData] = useState({
    couponCode: "",
    couponName: "",
    couponType: "",
    discountValue: null,
    appliesTo: "",
    duration: "",
    noDuration: false,
    usageLimit: null,
    noUsageLimit: false,
  });
  const [createCoupon] = useMutation(CREATE_COUPON);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCouponType = (type) => {
    setFormData((prev) => ({ ...prev, couponType: type }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await createCoupon({
        variables: {
          input: {
            ...formData,
            discountValue: parseFloat(formData.discountValue),
            usageLimit: formData.noUsageLimit
              ? null
              : parseInt(formData.usageLimit),
          },
        },
      });
      console.log("coupon code : ", data?.createCoupon);
      toast.success(
        `Coupon with code ${data?.createCoupon.couponCode} created!`
      );
      setFormData({
        couponCode: "",
        couponName: "",
        couponType: "",
        discountValue: null,
        appliesTo: "",
        duration: "",
        noDuration: false,
        usageLimit: null,
        noUsageLimit: false,
      });
    } catch (err) {
      toast.error(err.message);
      console.log("error while creating coupon: ", err);
    }
  };

  return (
    <div className="container m-0 p-4">
      <Toaster />
      <form onSubmit={handleSubmit}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4>Create Coupon</h4>
          <div>
            <button type="button" className="btn btn-outline-secondary me-2">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </div>
        </div>

        <div className="mb-3">
          <Link to="/coupons" className="text-blue text-decoration-none">
            <i className="bi bi-arrow-left-circle pe-2"></i>Back
          </Link>
        </div>

        <div className="bg-white p-3">
          <p className="fw-bold m-0">Coupon Information</p>
          <p className="small">
            Code will be used by customers during checkout
          </p>
          <div className="row mb-4">
            <div className="col-md-6 mb-3">
              <label className="form-label">Coupon Code</label>
              <input
                type="text"
                className="form-control"
                placeholder="SHIPFREE12"
                name="couponCode"
                value={formData.couponCode}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Coupon Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Summer Sales"
                name="couponName"
                value={formData.couponName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <p className="fw-bold m-0">Coupon Type</p>
          <p className="small">Type of coupon you want to create</p>
          <div className="d-flex flex-wrap gap-2 mb-4">
            {[
              { label: "Fixed Discount", value: "FIXED", icon: "cash" },
              {
                label: "Percentage Discount",
                value: "PERCENTAGE",
                icon: "bag",
              },
              { label: "Free Shipping", value: "FREE_SHIPPING", icon: "truck" },
              { label: "Price Discount", value: "PRICE_DISCOUNT", icon: "tag" },
            ].map((type) => (
              <button
                key={type.label}
                type="button"
                className={`btn btn-outline-dark btn-lg ${
                  formData.couponType === type.value ? "active" : ""
                }`}
                onClick={() => handleCouponType(type.value)}
              >
                <span className="fs-6">
                  <i className={`bi bi-${type.icon} pe-2`}></i>
                  {type.label}
                </span>
              </button>
            ))}
          </div>

          <div className="row text-muted">
            <div className="col-md-6 mb-3">
              <label className="form-label">Discount Value</label>
              <input
                type="number"
                className="form-control"
                placeholder="Amount"
                name="discountValue"
                value={formData.discountValue}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Applies to</label>
              <select
                className="form-select"
                name="appliesTo"
                value={formData.appliesTo}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Choose
                </option>
                <option value="all">All Products</option>
                <option value="category">Specific Category</option>
                <option value="product">Specific Product</option>
              </select>
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Duration</label>
              <input
                type="date"
                className="form-control"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                disabled={formData.noDuration}
              />
              <div className="form-check mt-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="noDuration"
                  name="noDuration"
                  checked={formData.noDuration}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="noDuration">
                  Don't set duration
                </label>
              </div>
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Usage Limits</label>
              <input
                type="number"
                className="form-control"
                placeholder="Amount of uses"
                name="usageLimit"
                value={formData.usageLimit}
                onChange={handleChange}
                disabled={formData.noUsageLimit}
              />
              <div className="form-check mt-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="noUsageLimit"
                  name="noUsageLimit"
                  checked={formData.noUsageLimit}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="noUsageLimit">
                  Don't limit amount of uses
                </label>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CouponForm;
