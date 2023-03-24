package com.ecommerce.Repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.ecommerce.Entity.OrderDetails;

@Repository
public interface SellerOrderRepository extends MongoRepository<OrderDetails, String>{

	@Query("{seller_id : ?0}")
	List<OrderDetails> getOrderDetails(String seller_id);
	
	@Query("{user_id : ?0}")
	List<OrderDetails> findByUserId(String user_id);
	
//	@Query("{id : ?0}")
//	OrderDetails getOrder(String id);
	

}
