package com.ecommerce.Repository;

import java.math.BigInteger;
import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.ecommerce.Entity.User;


public interface UserRepository extends MongoRepository<User,String> {
     User save(User userdata);
	
	User findAllByid(String id);

	User findByEmail(String email);
	Optional<User> findByUsername(String username);

	
		
	

	
	
	

}
