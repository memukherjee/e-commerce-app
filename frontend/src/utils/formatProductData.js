export default function formatProductData(product) {
  const {
    product_id,
    discountPrice,
    product_category: category,
    product_company: company,
    product_description: description,
    product_name: name,
    product_price: mrp,
    product_quantity: quantity,
    product_imageUrl:imageUrl,
    clothingType,
    size,
  } = product;

  const productSizes = {};
  if (size) {
    size.forEach((size, index) => {
      productSizes[index] = size;
    });
  }

  return {
    product_id,
    discountPrice,
    category,
    clothingType,
    company,
    description,
    name,
    mrp,
    quantity,
    productSizes,
    imageUrl,
  };
}
