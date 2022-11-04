package com.ecommerce.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.ecommerce.Entity.OrderDetails;

@Repository
public interface OrderRepo extends MongoRepository<OrderDetails, String>{

	@Query("{user_id: ?0}")
	OrderDetails findAllOrder(String user_id);

}
