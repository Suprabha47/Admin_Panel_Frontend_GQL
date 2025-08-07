import { useQuery } from "@apollo/client";
import { GET_PRODUCT_COUNT } from "../../apollo/products/productQuery";
import { GET_CUSTOMER_COUNT } from "../../apollo/customers/customerQuery";
import { GET_USER_COUNT } from "../../apollo/userAuthentication/userQuery";
import {
  GET_ORDER_COUNT,
  GET_ORDER_TOTAL,
} from "../../apollo/orders/orderQuery";

const StatsSection = () => {
  const { data: productD, loading: productL } = useQuery(GET_PRODUCT_COUNT);
  const { data: orderD, loading: orderL } = useQuery(GET_ORDER_COUNT);
  const { data: customerD, loading: customerL } = useQuery(GET_CUSTOMER_COUNT);
  const { data: userD, loading: userL } = useQuery(GET_USER_COUNT);
  const { data: revenueD, loading: revenueL } = useQuery(GET_ORDER_TOTAL);

  const loading = productL || orderL || customerL || userL || revenueL;

  const statsData = [
    {
      title: "Revenue",
      value: `$ ${revenueD?.getOrderTotal.toFixed(2) || 0}`,
      icon: " bi-cash-stack",
    },
    {
      title: "Orders",
      value: orderD?.getOrderCount || 0,
      icon: "bi-box",
    },
    {
      title: "Customers",
      value: customerD?.getCustomerCount || 0,
      icon: "bi-people",
    },
    {
      title: "Products",
      value: productD?.getProductCount || 0,
      icon: "bi-tag",
    },
    {
      title: "Users",
      value: userD?.getUserCount || 0,
      icon: "bi-person-circle",
    },
  ];
  if (loading)
    return (
      <div className="mb-4">
        <span class="placeholder col-6"></span>
        <span class="placeholder w-75"></span>
        <span class="placeholder" style={{ width: "25%" }}></span>
      </div>
    );
  return (
    <div className="row mb-4">
      {statsData.map((stat, index) => (
        <div key={index} className="col-md-2 col-sm-6 mb-3">
          <div
            className="card card-stat h-100 border-0 shadow-sm stat-card"
            style={{
              transition: "transform 0.2s, box-shadow 0.2s",
              backgroundColor: "#00175b30",
            }}
          >
            <div className="card-body p-3">
              <div className="d-flex justify-content-between align-items-start mb-2 ">
                <div>
                  <div>
                    <i class={`bi ${stat.icon} fs-4`} style={{}}></i>
                  </div>
                  <h5 className="card-title mb-2 ">{stat.value}</h5>
                  <p className="card-subtitle mb-1  text-muted  small">
                    {stat.title}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsSection;
