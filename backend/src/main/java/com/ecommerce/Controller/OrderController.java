package com.ecommerce.Controller;

import org.apache.commons.lang3.RandomStringUtils;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.dto.CartDTO;
import com.ecommerce.Entity.OrderDetails;
import com.ecommerce.Entity.User;
import com.ecommerce.Service.CartService;
import com.ecommerce.Service.OrderService;
import com.ecommerce.jwt.TokenValidator;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("api/order")
public class OrderController {

    @Autowired
    private CartService cartService;

    @Autowired
    private OrderService orderService;

    @Autowired
    private TokenValidator token;
    
    // check the quantities of products which are available or not ***********************************
    @GetMapping("/checkQuantity")
    public String checkQuantity(@RequestHeader(value="authorization",defaultValue="")String auth) {

    	User user=token.validate(auth);    	
    	if(user==null) {
    		return "Not valid";
    	}
    	else {
    		String user_id=user.getEmail();
    		return orderService.checkQuantityService(user_id);
    	} 
    }
    
//    @GetMapping("/checkQuantity/{user_id}")
//    public String checkQuantity(@PathVariable String user_id) {
//
//        return orderService.checkQuantityService(user_id);
//    }

    // make payment get t_id ***********************************

    @PostMapping("/payment")
    @ResponseBody
    public String paymentOrder(@RequestHeader(value="authorization",defaultValue="")String auth) throws RazorpayException {

    	User user=token.validate(auth); 
    	if(user==null) {
    		return "Not valid";
    	}
    	else 
    	{
    	 String user_id=user.getEmail();
        CartDTO cartDTO = cartService.displayAllCartService(user_id);

        int pay = (int) cartDTO.getTotal();
        String receipt = RandomStringUtils.randomAlphanumeric(12);

        RazorpayClient client = new RazorpayClient("rzp_test_8oTp65hXpWlqQZ", "sUQ3F3PoY3RK2ODu4N1tU6e1");
        JSONObject ob = new JSONObject();
        ob.put("amount", pay);
        ob.put("currency", "INR");
        ob.put("receipt", receipt);

        // creating order

        Order order = client.Orders.create(ob);
        return order.toString();
    	}
    }
    
//    @PostMapping("/payment/{user_id}")
//    @ResponseBody
//    public String paymentOrder(@PathVariable String user_id) throws RazorpayException {
//
//        CartDetails cartDetails = cartService.displayAllCartService(user_id);
//
//        int pay = (int) cartDetails.getTotal();
//        String receipt = RandomStringUtils.randomAlphanumeric(12);
//
//        RazorpayClient client = new RazorpayClient("rzp_test_8oTp65hXpWlqQZ", "sUQ3F3PoY3RK2ODu4N1tU6e1");
//        JSONObject ob = new JSONObject();
//        ob.put("amount", pay);
//        ob.put("currency", "INR");
//        ob.put("receipt", receipt);
//
//        // creating order
//
//        Order order = client.Orders.create(ob);
//        return order.toString();
//    }

    // place order *************************************************

    @GetMapping("/placeOrder/{t_id}")
    public OrderDetails addOrderDetails(@RequestHeader(value="authorization",defaultValue="")String auth, @PathVariable String t_id) {
       
    	User user=token.validate(auth); 
    	if(user==null) {
    		return null;
    	}
    	else 
    	{
    	 String user_id=user.getEmail();
    	 return orderService.showAll(user_id, t_id);
    	}
    }

    // show all ordered products ******************************************
    @GetMapping("/showOrder")
    public OrderDetails showOrderDetails(@RequestHeader(value="authorization",defaultValue="")String auth) {
    	
    	User user=token.validate(auth); 
    	if(user==null) {
    		return null;
    	}
    	else 
    	{
    	 String user_id=user.getEmail();
         return orderService.getOrderDetails(user_id);
    	}
    }
}
