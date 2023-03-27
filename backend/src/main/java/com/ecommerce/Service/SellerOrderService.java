package com.ecommerce.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.MultiValueMap;

import com.ecommerce.Entity.OrderDetails;
import com.ecommerce.Repository.OrderRepo;
import com.ecommerce.Repository.SellerOrderRepository;

@Service
public class SellerOrderService {

	@Autowired 
	SellerOrderRepository sellerOrderRepository;
	
	
	public List<OrderDetails> getOrderProductService(String seller_id) {
		
		List<OrderDetails> allOrder = sellerOrderRepository.getOrderDetails(seller_id);
        Collections.reverse(allOrder);		
		return allOrder;		
	}

	public String deliveredOrder(OrderDetails orderDetails) {
		
		//Optional<OrderDetails> orderDetails=orderRepo.findById(order_id);
		//System.out.println(orderDetails);
	    orderDetails.setOrderStatus("Delivered");
		sellerOrderRepository.save(orderDetails);
		
		return "Delivered";
	}

	public String cancelledOrder(OrderDetails orderDetails) {
		orderDetails.setOrderStatus("Cancelled by Seller");
		sellerOrderRepository.save(orderDetails);
		
		return "Cancelled";
	}
}

	
