package com.ecommerce.Controller;

import org.springframework.beans.factory.annotation.Autowired;
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
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.Entity.OrderDetails;
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
		
	//get all products with same seller_id***************************************************************
	@GetMapping("/getOrderedProduct")
	 public ResponseEntity<?> getOrderedProductController(@RequestHeader(value="authorization",defaultValue="")String auth)throws Exception{
		
		Seller seller=token.validate(auth);
		String seller_id=seller.getId();
	    if(seller==null)
		     return new ResponseEntity("Not verified",HttpStatus.UNAUTHORIZED);
	    else 
	    	 return new ResponseEntity(sellerOrderService.getOrderProductService(seller_id),HttpStatus.OK);
	    	    
		}
	
	//deliver the order**********************************************************************************
	@PutMapping("/deliver")
	public ResponseEntity<?> deliverOrderController(@RequestHeader(value="authorization",defaultValue="")String auth,@RequestBody OrderDetails orderDetails)throws Exception{
		
		Seller seller=token.validate(auth);
		//System.out.println(seller.getEmail());
		if(seller==null)
		     return new ResponseEntity("Not verified",HttpStatus.UNAUTHORIZED);
		else {
			
			return new ResponseEntity(sellerOrderService.deliveredOrder(orderDetails),HttpStatus.OK);
		}
	}
	
	//Cancel the order***********************************************************************************
	@PutMapping("/cancel")
	public ResponseEntity<?> cancelOrderController(@RequestHeader(value="authorization",defaultValue="")String auth,@RequestBody OrderDetails orderDetails)throws Exception{
		
		Seller seller=token.validate(auth);
		//System.out.println(seller.getEmail());
		if(seller==null)
		     return new ResponseEntity("Not verified",HttpStatus.UNAUTHORIZED);
		else {
			
			return new ResponseEntity(sellerOrderService.cancelledOrder(orderDetails),HttpStatus.OK);
		}
	}
}
