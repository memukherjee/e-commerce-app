package com.ecommerce.Controller;

import java.util.ArrayList;

import org.apache.commons.lang3.RandomStringUtils;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.dto.CartDTO;
import com.ecommerce.dto.PlaceOrderDTO;
import com.ecommerce.Entity.OrderDetails;
import com.ecommerce.Entity.Product;
import com.ecommerce.Entity.User;
import com.ecommerce.Repository.OrderRepo;
import com.ecommerce.Service.OrderService;
import com.ecommerce.jwt.TokenValidator;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;

@RestController
@RequestMapping("api/order")
public class OrderController {

    @Autowired
    OrderRepo orderRepo;

    @Autowired
    private OrderService orderService;

    @Autowired
    private TokenValidator token;

    @PostMapping("/payment")
    @ResponseBody
    public ResponseEntity<?> paymentOrder(@RequestHeader(value = "authorization", defaultValue = "") String auth,
            @RequestBody CartDTO cartDTO) throws RazorpayException {

        User user = token.validate(auth);
        System.out.println(user);
        if (user == null) {
            return new ResponseEntity<>("Not verified", HttpStatus.UNAUTHORIZED);
        } else {
            ArrayList<Product> productsWithMoreQuantity = orderService.checkQuantityService(cartDTO);
            if (productsWithMoreQuantity.size() != 0) {
                return new ResponseEntity<>("Product Out Of Stock", HttpStatus.BAD_REQUEST);
            }

            else {

                int pay = (int) cartDTO.getTotal();
                String receipt = RandomStringUtils.randomAlphanumeric(12);

                RazorpayClient client = new RazorpayClient("rzp_test_8oTp65hXpWlqQZ", "sUQ3F3PoY3RK2ODu4N1tU6e1");
                JSONObject ob = new JSONObject();
                ob.put("amount", pay * 100);
                ob.put("currency", "INR");
                ob.put("receipt", receipt);

                // creating order
                Order order = client.Orders.create(ob);
                return new ResponseEntity<>(order.toString(), HttpStatus.OK);
            }
        }
    }

    // place order *************************************************

    @PostMapping("/placeOrder")
    public ResponseEntity<?> addOrderDetails(@RequestHeader(value = "authorization", defaultValue = "") String auth,
            @RequestBody PlaceOrderDTO placeOrderDTO) {

        User user = token.validate(auth);
        if (user == null) {
            return new ResponseEntity<>("Not verified", HttpStatus.UNAUTHORIZED);
        } else {
            CartDTO cartDTO = placeOrderDTO.getCartDTO();
            ArrayList<Product> productsWithMoreQuantity = orderService.checkQuantityService(cartDTO);
            if (productsWithMoreQuantity.size() != 0) {
                return new ResponseEntity<>("Product Out Of Stock", HttpStatus.BAD_REQUEST);
            } else {
                return new ResponseEntity<>(orderService.showAll(user, placeOrderDTO), HttpStatus.OK);
            }
        }
    }

    // show all ordered products ******************************************
    @GetMapping("/showOrder")
    public ResponseEntity<?> showOrderDetails(@RequestHeader(value = "authorization", defaultValue = "") String auth) {

        User user = token.validate(auth);
        if (user == null) {
            return new ResponseEntity<>("Not verified", HttpStatus.UNAUTHORIZED);
        } else {
            String user_id = user.getEmail();
            return new ResponseEntity<>(orderService.getOrderDetails(user_id), HttpStatus.OK);
        }
    }

    @PutMapping("/cancel")
    public ResponseEntity<?> cancelOrderController(
            @RequestHeader(value = "authorization", defaultValue = "") String auth,
            @RequestBody OrderDetails orderDetails) throws Exception {

        User user = token.validate(auth);
        // System.out.println(seller.getEmail());
        if (user == null)
            return new ResponseEntity<>("Not verified", HttpStatus.UNAUTHORIZED);
        else {

            return new ResponseEntity<>(orderService.cancelledOrder(orderDetails), HttpStatus.OK);
        }
    }
}
