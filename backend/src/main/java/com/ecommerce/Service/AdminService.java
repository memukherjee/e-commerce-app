package com.ecommerce.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecommerce.Entity.Product;
import com.ecommerce.Repository.AdminRepository;
@Service
public class AdminService {
@Autowired
AdminRepository repo;
	 public Product addProduct(Product product)
	  {
		  Double discountRate=0.0;
		  Double a=product.getProduct_price();
		  Double b=product.getProduct_discount();
		  discountRate=b/100;
		  Double c=a-(a*discountRate);
		  product.setDiscountPrice(c);
		  return repo.save(product);
	  }
	 
	 public List<Product> getAllProduct()
	  {
		  return repo.findAll();
	  }
	 
	 public String deleteProduct(String product_id)
	  {
		  repo.deleteById(product_id);
		  return "Product Deleted";
	  }
	 
	 public Product updateProduct(Product product)
	  {
		  Product existingProduct=repo.findById(product.getProduct_id()).get();
		  existingProduct.setProduct_name(product.getProduct_name());
		  existingProduct.setProduct_category(product.getProduct_category());
		  existingProduct.setProduct_description(product.getProduct_description());
		  existingProduct.setProduct_company(product.getProduct_company());
		  existingProduct.setProduct_price(product.getProduct_price());
		  existingProduct.setProduct_discount(product.getProduct_discount());
		  existingProduct.setProduct_quantity(product.getProduct_quantity());
		  
		  
		  return repo.save(existingProduct);
	  }

//	public Product getProductByCategory(String product_category) {
//		return repo.findByCategory(product_category);
//		
//	}
}
