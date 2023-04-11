package com.ecommerce.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.ecommerce.Entity.Seller;

public interface SellerRepository extends MongoRepository<Seller,String> {
    Seller save(Seller sellerdata);
	
	Seller findAllByid(String id);

	Seller findByEmail(String email);
	Optional<Seller> findByUsername(String username);

	@Query(value = "{}", fields = "{ 'email' : 1,'_id': 0}}")
	List<String> getAllEmails();

	@Query("{_id:?0}")
	Seller findBySellerId(String sellerId);
	
		
	

	
	
	

}
