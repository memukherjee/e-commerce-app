package com.ecommerce.Repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.ecommerce.Entity.Seller;
import com.ecommerce.Entity.User;

public interface SellerRepository extends MongoRepository<Seller,String> {
    Seller save(Seller sellerdata);
	
	Seller findAllByid(String id);

	Seller findByEmail(String email);
	Optional<Seller> findByUsername(String username);

	
		
	

	
	
	

}
