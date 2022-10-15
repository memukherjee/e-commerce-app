package com.ecommerce.Repository;

import java.math.BigInteger;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.ecommerce.Entity.UserData;


public interface UserRepo extends MongoRepository<UserData,BigInteger> {
     UserData save(UserData userdata);
	
	UserData findAllByid(String id);

}
