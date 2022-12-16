package com.ecommerce.Controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.Entity.Product;
import com.ecommerce.Service.AdminService;
@RestController
@RequestMapping("/admin")
public class AdminController {
    
	@Autowired
	AdminService service;
	
/*Adding Products to Portal.......................*/
	
	@PostMapping("/addProducts")
	 public Product postProductAdd(@RequestBody Product product){
		return service.addProduct(product);
	 }	

/*Getting all the products.......................*/
	
	@GetMapping("/getAll")
	 public List<Product> getProduct(){
		 return service.getAllProduct();
	 }
	
/*Deleting the product by product id..............*/
	
	 @DeleteMapping("/deleteProduct/{product_id}")
	 public String deleteProduct(@PathVariable String product_id){
			return service.deleteProduct(product_id);
		}

/*Updating the product details by product id..............*/
	 
	 @PutMapping("/updateProducts/{product_id}")
	 public Product updateCategory(@RequestBody Product product){
		 return service.updateProduct(product);
		 }
	 
//	 @GetMapping("/findAllProduct/{product_category}")
//		public Product getProduct(@PathVariable String product_category)
//		{
//			return serve.getProductByCategory(product_category);
//		}
//	 

     }
