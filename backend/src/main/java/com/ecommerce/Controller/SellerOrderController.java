package com.ecommerce.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.Entity.Seller;
import com.ecommerce.Service.SellerOrderService;
import com.ecommerce.jwt.SellerTokenValidator;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/sellerOrder")
public class SellerOrderController {

	@Autowired
	SellerTokenValidator token;
	@Autowired
	SellerOrderService sellerOrderService;
		
	@GetMapping("/getOrderedProduct")
	 public ResponseEntity<?> getOrderedProductController(@RequestHeader(value="authorization",defaultValue="")String auth)throws Exception{
		
		Seller seller=token.validate(auth);
	    	if(seller==null)
		          return new ResponseEntity<String>("Not verified",HttpStatus.UNAUTHORIZED);
	    	else 
			   String idd = seller.getId();
	    	   return new ResponseEntity(sellerOrderService.getOrderProductService(seller_id),HttpStatus.OK);
	    	    
		}
}
