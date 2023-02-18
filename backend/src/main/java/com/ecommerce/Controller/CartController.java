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

import com.ecommerce.dto.CartDTO;
import com.ecommerce.Entity.ShoppingCart;
import com.ecommerce.Entity.User;
import com.ecommerce.Repository.CartRepo;
import com.ecommerce.Service.CartService;
import com.ecommerce.jwt.TokenValidator;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("api/cart")
public class CartController {

    @Autowired
    private CartService cartService;
    
    @Autowired
    private TokenValidator token;
    
    @Autowired
    CartRepo cartRepo;

    // Add to cart ************************
        
    @PostMapping("/add")
    public ResponseEntity<?> addToCart(@RequestBody ShoppingCart shoppingCart,@RequestHeader(value="authorization",defaultValue="")String auth) throws Exception{
    	
    	User user=token.validate(auth);
    	if(user==null)
		return new ResponseEntity("Not verified",HttpStatus.UNAUTHORIZED);
    	else {
			shoppingCart.setUser_id(user.getEmail());
			cartRepo.save(shoppingCart);
			return new ResponseEntity(shoppingCart, HttpStatus.OK);
		}
    }

   
//    @PostMapping("/add")
//    public ShoppingCart addToCart(@RequestBody ShoppingCart shoppingCart) { 	
//    	   	
//            return cartService.addToCartService(shoppingCart);    	
//    }

    // Remove from cart by cart id ********************

    @DeleteMapping("/remove/{id}")
    public void removeFromCart(@PathVariable String id,@RequestHeader(value="authorization",defaultValue="")String auth) {
       
    	User user=token.validate(auth);
    	if(user!=null)
    	{ 
    		System.out.print(true);
    		cartService.removeFromCartService(id);}
    	else {
			System.out.print(false);
		}
    }
    
//    @DeleteMapping("/remove/{id}")
//    public void removeFromCart(@PathVariable String id) {
//        cartService.removeFromCartService(id);
//    }

    // get cart by Id *********************************
    @GetMapping("/{id}")
    public ShoppingCart findByShoppingCart(@PathVariable String id,@RequestHeader(value="authorization",defaultValue="")String auth) {
    	
    	User user=token.validate(auth);
    	if(user==null) {
    		System.out.print(false);
    		return null;
    	}
    	else {
    	   return cartService.getCartById(id);
    	}
    }

    // Show all in cart of user_id *******************************
    
    @GetMapping("/showcart")
    public CartDTO showItem(@RequestHeader(value="authorization",defaultValue="")String auth){
    	
    	User user=token.validate(auth);
    	if(user==null) {
    		System.out.print(false);
    		return null;
    	}
    	else {
    	String email=user.getEmail();
        return cartService.displayAllCartService(email);
    	}
    }
//    @GetMapping("/showcart/{user_id}")
//    public CartDetails showItem(@PathVariable String user_id) {
//        return cartService.displayAllCartService(user_id);
//    }

    // increase quantity by id **************************************
    
    @PutMapping("/inc/{id}")
    public String increaceCart(@RequestBody ShoppingCart shoppingCart,@RequestHeader(value="authorization",defaultValue="")String auth) {
       
    	User user=token.validate(auth);
    	if(user==null) {
    		return "Not valid";
    	}
    	else {
    	   return cartService.increaseCartQuantity(shoppingCart);
    	}
    }
    
//    @PutMapping("/inc/{id}")
//    public String increaceCart(@RequestBody ShoppingCart shoppingCart) {
//        return cartService.increaseCartQuantity(shoppingCart);
//    }

    // decrease quantity by id ***********************************
    @PutMapping("/dec/{id}")
    public String decreaseCart(@RequestBody ShoppingCart shoppingCart,@RequestHeader(value="authorization",defaultValue="")String auth) {
    	
    	User user=token.validate(auth);
    	if(user==null) {
    		return "Not valid";
    	}
    	else {
    		return cartService.decreaseCartQuantity(shoppingCart);
    	} 
    }
//    @PutMapping("/dec/{id}")
//    public String decreaseCart(@RequestBody ShoppingCart shoppingCart) {
//        return cartService.decreaseCartQuantity(shoppingCart);
//    }

    // remove all in cart of user_id *******************************
    @DeleteMapping("/removeAll")
    public String removeFromCartAllOrder(@RequestHeader(value="authorization",defaultValue="")String auth) {
    	
    	User user=token.validate(auth);    	
    	if(user==null) {
    		return "Not valid";
    	}
    	else {
    		String user_id=user.getEmail();
    		return cartService.removeFromCartAllService(user_id);
    	} 
    }
//    @DeleteMapping("/removeAll/{user_id}")
//    public String removeFromCartAllOrder(@PathVariable String user_id) {
//        return cartService.removeFromCartAllService(user_id);
//    }

}