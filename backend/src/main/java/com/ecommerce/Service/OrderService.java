package com.ecommerce.Service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecommerce.dto.CartDTO;
import com.ecommerce.dto.CartProductDTO;
import com.ecommerce.dto.PlaceOrderDTO;
import com.ecommerce.Entity.OrderDetails;
import com.ecommerce.Entity.Product;
import com.ecommerce.Entity.ShoppingCart;
import com.ecommerce.Entity.User;
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

    public ArrayList<Product> checkQuantityService(CartDTO cartDTO) {
        int flag = 0;
        //ArrayList<ShoppingCart> cartList = cartRepo.findByuser_id(user_id);
        ArrayList<CartProductDTO> cartList=cartDTO.getList();
        ArrayList<Product> productsWithMoreQuantity=new ArrayList<>();
        for (int i = 0; i < cartList.size(); i++) {
            Product product = productService.getProductById(cartList.get(i).getProduct_id());
            //ShoppingCart shoppingCart = cartService.getCartById(cartList.get(i).getCart_id());
            int cart_quantity=cartList.get(i).getQuantity();
            int product_quentity = product.getProduct_quantity();
            
            if (product_quentity < cart_quantity) {
                flag = 1;
                productsWithMoreQuantity.add(product);
                break;
            }
        }
        return productsWithMoreQuantity;
    }

    public String showAll(User user,PlaceOrderDTO placeOrderDTO) {
    	
    	CartDTO cartDTO = placeOrderDTO.getCartDTO();
        ArrayList<CartProductDTO> cartProductDTOs= cartDTO.getList();
    	
        for(int i=0;i<cartProductDTOs.size();i++)
        {
           OrderDetails orderDetails = new OrderDetails();
           orderDetails.setUser_id(user.getEmail());
           orderDetails.setSeller_id(cartProductDTOs.get(i).getSeller_id());
           orderDetails.setAddress(placeOrderDTO.getAddress());
        //CartDTO cartDTO = cartService.displayAllCartService(user_id);;
           orderDetails.setCartProductDTO(cartProductDTOs.get(i));
           String p_id = placeOrderDTO.getRazorpayPaymentId();
        
        if (p_id==null) 
        {
            orderDetails.setMethod("COD");
            orderDetails.setPaymentStatus(null);
            orderDetails.setOrderCreationId(null);
            orderDetails.setRazorpayPaymentId(null);
            orderDetails.setRazorPayOrderId(null);
            orderDetails.setRazorpaypaySignature(null);
            
        } else {
            orderDetails.setMethod("Online Pay");
            orderDetails.setPaymentStatus("Paid");
            orderDetails.setOrderCreationId(placeOrderDTO.getOrderCreationId());;
            orderDetails.setRazorpayPaymentId(placeOrderDTO.getRazorpayPaymentId());
            orderDetails.setRazorPayOrderId(placeOrderDTO.getRazorPayOrderId());
            orderDetails.setRazorpaypaySignature(placeOrderDTO.getRazorpaypaySignature());
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

        orderDetails.setOrderStatus("PROCESSING");
        orderRepo.save(orderDetails);
        }
        // subtract quantity from total product quantity
        
        for(int i=0;i<cartProductDTOs.size();i++)
        {
        	Product product = productService.getProductById(cartProductDTOs.get(i).getProduct_id());
        	int product_quantity=product.getProduct_quantity();
        	int product_sold=product.getProduct_sold();
        	int cart_quantity = cartProductDTOs.get(i).getQuantity();
        	
        	product.setProduct_quantity(product_quantity-cart_quantity);
        	product.setProduct_sold(product_sold+cart_quantity);
        	productRepo.save(product);
        	if(cartProductDTOs.get(i).getCart_id() != null)
        	{
        		cartService.removeFromCartService(cartProductDTOs.get(i).getCart_id());
        	}
        	
        }
      
        //cartService.removeFromCartAllService(user.getEmail());
        return "Order is Placed";
    }

    public ArrayList<OrderDetails> getOrderDetails(String user_id) {
        return orderRepo.findAllOrder(user_id);

    }

}
