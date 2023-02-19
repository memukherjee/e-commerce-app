package com.ecommerce.Repository;

import java.util.ArrayList;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.ecommerce.Entity.ShoppingCart;

@Repository
public interface CartRepo extends MongoRepository<ShoppingCart, String> {

    @Query("{user_id: ?0}")
    ArrayList<ShoppingCart> findByuser_id(String email);


    @Query("{user_id : ?0, product_id : ?1, size: ?2}")
	ShoppingCart checkPresentInCart(String user_id,String product_id,String size);

    
}
