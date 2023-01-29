package com.ecommerce.Controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.Entity.Product;
import com.ecommerce.Entity.Seller;
import com.ecommerce.Entity.ShoppingCart;
import com.ecommerce.Entity.User;
import com.ecommerce.Repository.SellerProductRepository;
import com.ecommerce.Repository.UserProductRepository;
import com.ecommerce.Service.SellerProductService;
import com.ecommerce.jwt.SellerTokenValidator;

@RestController
@RequestMapping("/api/seller")
public class SellerProductController {

	@Autowired
	SellerTokenValidator token;
	@Autowired
	SellerProductService service;
	@Autowired
	UserProductRepository repo;
	
	@PostMapping("/addProduct")
	 public ResponseEntity<?> postProductAdd(@RequestBody Product product,@RequestHeader(value="authorization",defaultValue="")String auth) throws Exception{
		 Seller seller=token.validate(auth);
	    	if(seller==null)
			     return new ResponseEntity("Not verified",HttpStatus.UNAUTHORIZED);
	    	else
	    		//product.setSeller(seller);
    	        product.setSeller_id(seller.getId());
    	        double discountRate = 0.0;
    	        double a = product.getProduct_price();
    	        double b = product.getProduct_discount();
    	        discountRate = b / 100;
    	        double c = a - (a * discountRate);
    	        product.setDiscountPrice(c);
		        repo.save(product);
		        return new ResponseEntity(product,HttpStatus.OK);
	 }	
	
	
	 @DeleteMapping("/deleteProduct/{product_id}")
	 public String deleteProduct(@PathVariable String product_id,@RequestHeader(value="authorization",defaultValue="")String auth)throws Exception{
		 Seller seller=token.validate(auth);
	    	if(seller==null)
		          return ("Not verified");
	    	else 
			   return service.deleteProduct(product_id);
	    	    
		}
	 
	 @GetMapping("/getAll")
	 public List<Product> getProduct(@RequestHeader(value="authorization",defaultValue="")String auth)throws Exception{
		 Seller seller=token.validate(auth);
		 String id= seller.getId();
		 if(seller!=null) {
	            return service.getAllProduct(id);}
	     else {
	    		return null;}
	    	
	 }
	 
	 
	 @PutMapping("/updateProducts")
	 public Product updateCategory(@RequestBody Product product, @RequestHeader(value="authorization",defaultValue="")String auth)throws Exception{
		 Seller seller=token.validate(auth);
		 String id= seller.getId();
		 if(seller!=null) {
		     return service.updateProduct(id,product);}
		 else 
	         return null;
		 }
	
	



    

}

