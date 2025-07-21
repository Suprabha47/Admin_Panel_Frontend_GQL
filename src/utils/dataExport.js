import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export const handleOrderExport = (orders) => {
  if (!orders || orders.length === 0) return;
  const exportData = orders.map((order) => ({
    "Order ID": `#${order.id}`,
    Date: new Date(parseInt(order.createdAt)).toLocaleDateString(),
    Customer: order?.customer?.customerName || "",
    "Order Status": order.status,
    Total: `$${order.totalAmount.toFixed(2)}`,
  }));

  const worksheet = XLSX.utils.json_to_sheet(exportData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");
  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });
  const dataBlob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheet.sheet",
  });
  saveAs(dataBlob, "orders.xlsx");
};

export const handleCustomersExport = (customers) => {
  if (!customers || customers.length === 0) return;
  const exportData = customers.map((customer) => ({
    "Customer ID": `#${customer.id}`,
    "Customer Name": customer?.customerName || "",
    Location: customer?.location || "",
    Spent:
      customer?.orders?.reduce(
        (total, order) => total + order.totalAmount,
        0
      ) || 0,
  }));

  const worksheet = XLSX.utils.json_to_sheet(exportData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Customers");
  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });
  const dataBlob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheet.sheet",
  });
  saveAs(dataBlob, "customers.xlsx");
};

export const handleProductsExport = (products) => {
  if (!products || products.length === 0) {
    return;
  }
  const exportData = products.map((product) => ({
    "Product ID": `#${product.id}`,
    "Product Name": product?.productName || "",
    Pride: product?.price || 0,
    Category: product?.category || "",
  }));

  const worksheet = XLSX.utils.json_to_sheet(exportData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Products");
  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });
  const dataBlob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheet.sheet",
  });
  saveAs(dataBlob, "products.xlsx");
};
