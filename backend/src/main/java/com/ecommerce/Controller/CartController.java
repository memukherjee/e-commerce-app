package com.ecommerce.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.Entity.CartDetails;
import com.ecommerce.Entity.ShoppingCart;
import com.ecommerce.Service.CartService;


@RestController
@RequestMapping("api/addToCart")
public class CartController {

	@Autowired
	private CartService cartService;
	
	//Add to cart ************************
	
	@PostMapping("/add")
	public ShoppingCart addToCart(@RequestBody ShoppingCart shoppingCart)
	{
		return cartService.addToCartService(shoppingCart);
	}
	
	//Remove from cart by cart id ********************
	
	@DeleteMapping("/remove/{id}")
	public void removeFromCart(@PathVariable String id)
	{
		cartService.removeFromCartService(id);
	}
	
	//get cart by Id *********************************
	@GetMapping("/{id}")
	public ShoppingCart findByShoppingCart(@PathVariable String id)
	{
		return cartService.getCartById(id);
	}
	
	//Show all in cart of user_id *******************************
	@GetMapping("/showcart/{user_id}")
	public CartDetails showItem(@PathVariable String user_id)
	{
		return cartService.displayAllCartService(user_id);
	}
	
	//increase quantity by id **************************************
	@PutMapping("/inc/{id}")
	public String increaceCart(@RequestBody ShoppingCart shoppingCart)
	{
		return cartService.increaseCartQuantity(shoppingCart);
	}
	
	//decrease quantity by id ***********************************
	@PutMapping("/dec/{id}")
	public String decreaseCart(@RequestBody ShoppingCart shoppingCart)
	{
		return cartService.decreaseCartQuantity(shoppingCart);
	}
	
	//remove all in cart of user_id *******************************
	@DeleteMapping("/removeAll/{user_id}")
	public String removeFromCartAllOrder(@PathVariable String user_id)
	{
		return cartService.removeFromCartAllService(user_id);
	}
	
}
