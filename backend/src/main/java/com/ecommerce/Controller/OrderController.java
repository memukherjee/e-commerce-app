package com.ecommerce.Controller;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.Entity.CartDetails;
import com.ecommerce.Entity.OrderDetails;
import com.ecommerce.Service.CartService;
import com.ecommerce.Service.OrderService;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;

@RestController
@RequestMapping("/order")
public class OrderController {
	
	@Autowired
	private CartService cartService;
	
	@Autowired
	private OrderService orderService;
	
	@GetMapping("/checkQuantity/{user_id}")
	public String checkQuantity(@PathVariable String user_id)
	{
		
		return orderService.checkQuantityService(user_id);
	}
	
	
	//make payment get t_id ***********************************
	
	@PostMapping("/payment/{user_id}")
	@ResponseBody
	public String paymentOrder(@PathVariable String user_id) throws RazorpayException
	{
		
	    CartDetails cartDetails=cartService.displayAllCartService(user_id);
		
		double pay = cartDetails.getTotal();
		
		RazorpayClient client = new RazorpayClient("rzp_test_3v5Lsd5HIdHyHy","moWNwD6hOzxwsnyUaVjbxARE");
		
		JSONObject ob = new JSONObject();
		ob.put("amount", pay);
		ob.put("currency","INR");
		ob.put("receipt", "txn_235425");
		
		//creating order
		
		Order order =client.Orders.create(ob);
		return order.toString();
	}

	//place order *************************************************
	
	@GetMapping("/placeOrder/{user_id}/{t_id}")
	public OrderDetails addOrderDetails(@PathVariable String user_id,@PathVariable String t_id) 
	{
		return orderService.showAll(user_id,t_id);
	}
	
	//show all ordered products ******************************************
	@GetMapping("/showOrder/{user_id}")
	public OrderDetails showOrderDetails(@PathVariable String user_id)
	{
		return orderService.getOrderDetails(user_id);
	}
}

