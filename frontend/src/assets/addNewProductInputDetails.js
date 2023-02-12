export default function getAddNewProductInputDetails({
  name = "",
  company = "",
  mrp = "",
  discountPrice = "",
  quantity = "",
}) {
  return [
    {
      value: name,
      name: "name",
      label: "Product Name",
      type: "text",
      order: 0,
    },
    {
      value: company,
      name: "company",
      label: "Company",
      type: "text",
      order: 0,
    },
    {
      value: mrp,
      name: "mrp",
      label: "MRP",
      type: "number",
      order: 7,
    },
    {
      value: discountPrice,
      name: "discountPrice",
      label: "Discount Price",
      type: "number",
      order: 7,
    },
    {
      value: quantity,
      name: "quantity",
      label: "Quantity",
      type: "number",
      order: 7,
    },
  ];
}
