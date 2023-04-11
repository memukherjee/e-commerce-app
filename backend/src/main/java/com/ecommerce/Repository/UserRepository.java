package com.ecommerce.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.ecommerce.Entity.User;


public interface UserRepository extends MongoRepository<User,String> {
     User save(User userdata);
	
	User findAllByid(String id);

	User findByEmail(String email);
	Optional<User> findByUsername(String username);
	public List<User> findByNameContainingIgnoreCase(String search);

	@Query("{'_id': ?0}")
	User findByUserId(String userId);

	@Query(value = "{}", fields = "{ 'email' : 1,'_id': 0}}")
	List<String> getAllEmails();
	
		
	

	
	
	

}
