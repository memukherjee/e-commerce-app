package com.ecommerce.Service;

import java.math.BigInteger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecommerce.Entity.UserData;
import com.ecommerce.Repository.UserRepo;



@Service
public class UserService {
	
	@Autowired
	UserRepo userRepo;
	public UserData saveDataTODB(UserData metaData) {
		return userRepo.save(metaData);
	}
	//retrive data from db
	public UserData getsUserDetailsFromDB(String id) {
		return userRepo.findAllByid(id);
	}

}
