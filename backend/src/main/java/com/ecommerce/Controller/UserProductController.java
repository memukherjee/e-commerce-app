
package com.ecommerce.Controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.Entity.Product;
import com.ecommerce.Service.UserProductService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/products")
public class UserProductController {
	@Autowired
	  UserProductService service;
 

	 
/*Searching the product based on product id.........................*/
	 
	 @GetMapping("/getProduct/{product_id}")
		public Product getProduct(@PathVariable String product_id){
			return service.getProductById(product_id);
		}
	
/*Getting all the trending products.........................*/
	 
	 @GetMapping("/trending")
	 public List<Product> TrendingProducts(){
		 return service.findTrending();
	 }
	 
/*Searching product by category....................*/	 
	 @GetMapping("/product_category/{product_category}")
	 public ResponseEntity<List<Product>> getProductByCategory(@PathVariable String product_category,@RequestParam(defaultValue = "0") Integer pageNo,
				@RequestParam(defaultValue = "5") Integer pageSize){
			List<Product> list=service.getProductByCategory(product_category,pageNo,pageSize);
			return new ResponseEntity<List<Product>>(list,new HttpHeaders(),HttpStatus.OK);}
		
/*Searching product by product name............................*/
	 
		@GetMapping("/product_name/{product_name}")
		 public List<Product> getProductByName(@PathVariable String product_name){
				return service.getProductByName(product_name);
				
		}
		
		@GetMapping("/getAllProduct")
		public ResponseEntity<List<Product>> getProduct(@RequestParam(defaultValue = "0") Integer pageNo,
				@RequestParam(defaultValue = "5") Integer pageSize){
			List<Product> list=service.getAllProduct(pageNo,pageSize);
			return new ResponseEntity<List<Product>>(list,new HttpHeaders(),HttpStatus.OK);
		}
}

