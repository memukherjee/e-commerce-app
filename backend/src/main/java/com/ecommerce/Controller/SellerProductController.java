package com.ecommerce.Controller;

import java.io.IOException;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.apache.catalina.mapper.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ecommerce.Entity.Category;
import com.ecommerce.Entity.Product;
import com.ecommerce.Entity.Seller;
import com.ecommerce.Entity.ShoppingCart;
import com.ecommerce.Entity.User;
import com.ecommerce.Repository.SellerProductRepository;
import com.ecommerce.Repository.UserProductRepository;
import com.ecommerce.Service.SellerProductService;
import com.ecommerce.jwt.SellerTokenValidator;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.introspect.TypeResolutionContext.Empty;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/seller")
public class SellerProductController {

	@Autowired
	SellerTokenValidator token;
	@Autowired
	SellerProductService service;
	@Autowired
	UserProductRepository repo;
	@Autowired
	CloudinaryController cloudinaryController;
	@PostMapping(value = "/addProduct",consumes= { org.springframework.http.MediaType.APPLICATION_JSON_VALUE, org.springframework.http.MediaType.MULTIPART_FORM_DATA_VALUE })
	 public ResponseEntity<Product> productJson(@RequestPart(required = true) Product product,@RequestPart MultipartFile file,@RequestHeader(value="authorization",defaultValue="")String auth) throws Exception{
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
	        Product productJson= new Product();
	    	try {
	    		ObjectMapper objectMapper= new ObjectMapper();
	    		String jsonString=objectMapper.writeValueAsString(productJson);
	    	} catch(IOException err)
	    	{
	    		System.out.printf("Error",err.toString());
	    	}
        String image_url=cloudinaryController.upload(file);
	    	product.setProduct_imageUrl(image_url);
	    	repo.save(product);
    	    return new ResponseEntity<Product>(product,  new HttpHeaders(), HttpStatus.OK);
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
	 public List<Product> getProduct(@RequestHeader(value="authorization",defaultValue="")String auth) throws Exception{
		 Seller seller=token.validate(auth);
		 String id= seller.getId();
		 if(seller==null) {
			 return null;}
	     else {
	    	 return service.getAllProduct(id);		 
	    	   }
	    	
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

