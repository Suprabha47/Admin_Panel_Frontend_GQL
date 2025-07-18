import { useQuery, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CUSTOMER_BY_ID } from "../../apollo/customers/customerQuery";
import CustInfoCard from "./CustInfoCard";
import { PrimeReactProvider } from "primereact/api";
import logo from "../../utils/back.png";
import { DELETE_CUSTOMER } from "../../apollo/customers/customerMutation";

const CustomerProfile = () => {
  const [customer, setCustomer] = useState([]);
  const [address, setAddress] = useState("");
  const { id } = useParams();
  const [deleteCustomer] = useMutation(DELETE_CUSTOMER);
  const { data, loading, error } = useQuery(CUSTOMER_BY_ID, {
    variables: {
      id,
    },
  });

  useEffect(() => {
    if (!loading && data?.getCustomer) {
      console.log("datattat:", data?.getCustomer);
      setCustomer(data?.getCustomer);
      const tempAdd = data?.getCustomer?.orders[0];
      const completeAddress = `${tempAdd?.shippingAddress?.address}, ${tempAdd?.shippingAddress?.city}, 
      ${tempAdd?.shippingAddress?.pinCode}, ${tempAdd?.shippingAddress?.country}`;
      setAddress(completeAddress);
    }
  }, [loading, error]);

  const handleDel = async () => {
    const { data } = await deleteCustomer({
      variables: { id },
    });
    console.log("deleteeed:", data.deleteCustomer);
  };

  if (loading)
    return (
      <>
        <hr></hr>
        <div class="d-flex justify-content-center">
          <div class="spinner-border  text-primary" role="status"></div>
        </div>
      </>
    );

  return (
    <PrimeReactProvider>
      <Link to="/customers" className="text-decoration-none py-1 m-3">
        <img src={logo} alt="back-logo" style={{ width: "20px" }} />
        back
      </Link>
      <div className="container my-4">
        <CustInfoCard
          customer={customer}
          address={address}
          handleDel={handleDel}
        />
      </div>
    </PrimeReactProvider>
  );
};

export default CustomerProfile;
