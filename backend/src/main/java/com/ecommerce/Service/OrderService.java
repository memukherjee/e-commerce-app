package com.ecommerce.Service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecommerce.Entity.CartDetails;
import com.ecommerce.Entity.OrderDetails;
import com.ecommerce.Entity.Product;
import com.ecommerce.Entity.ShoppingCart;
import com.ecommerce.Repository.CartRepo;
import com.ecommerce.Repository.OrderRepo;
import com.ecommerce.Repository.UserProductRepository;

@Service
public class OrderService {
    @Autowired
    CartService cartService;

    @Autowired
    OrderRepo orderRepo;

    @Autowired
    CartRepo cartRepo;

    @Autowired
    UserProductService productService;

    @Autowired
    UserProductRepository productRepo;

    public String checkQuantityService(String user_id) {
        int flag = 0;
        ArrayList<ShoppingCart> cartList = cartRepo.findByuser_id(user_id);
        for (int i = 0; i < cartList.size(); i++) {
            Product product = productService.getProductById(cartList.get(i).getProduct_id());
            ShoppingCart shoppingCart = cartService.getCartById(cartList.get(i).getId());

            int p = product.getProduct_quantity();
            int c = shoppingCart.getCart_quantity();

            if (p < c) {
                flag = 1;
                break;
            }
        }
        if (flag == 0)
            return "yes, You can process";
        else
            return "No, plz cleck your quantity, it may be out of our stock";

    }

    public OrderDetails showAll(String user_id, String t_id) {
        OrderDetails orderDetails = new OrderDetails();
        orderDetails.setUser_id(user_id);

        CartDetails cartDetails = cartService.displayAllCartService(user_id);
        orderDetails.setCartDetails(cartDetails);

        if (t_id.equals("null")) {
            orderDetails.setMethod("COD");
            orderDetails.setT_id(null);
        } else {
            orderDetails.setMethod("Online Pay");
            orderDetails.setT_id(t_id);
        }

        SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");

        // LocalDate.now().plusDays(7);
        Calendar calendar = Calendar.getInstance();
        // calendar.setTime(new Date());
        String date1 = dateFormat.format(calendar.getTime());
        calendar.add(Calendar.DATE, 7);
        String date2 = dateFormat.format(calendar.getTime());

        orderDetails.setDate(date1);
        orderDetails.setExpDelivary(date2);

        orderDetails.setStatus("PROCESSING");

        // subtract quantity from total product quantity

        ArrayList<ShoppingCart> cartList = cartRepo.findByuser_id(user_id);
        for (int i = 0; i < cartList.size(); i++) {
            Product product = productService.getProductById(cartList.get(i).getProduct_id());
            ShoppingCart shoppingCart = cartService.getCartById(cartList.get(i).getId());

            int p = product.getProduct_quantity();
            int sold = product.getProduct_sold();
            int c = shoppingCart.getCart_quantity();

            product.setProduct_quantity(p - c);
            product.setProduct_sold(sold + c);
            productRepo.save(product);
        }

        orderRepo.save(orderDetails);
        cartService.removeFromCartAllService(user_id);
        return orderDetails;
    }

    public OrderDetails getOrderDetails(String user_id) {
        return orderRepo.findAllOrder(user_id);

    }

}
