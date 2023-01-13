package com.ecommerce.jwt;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.ecommerce.Entity.User;
import com.ecommerce.Repository.UserRepository;

@Component
public class TokenValidator {
  
	@Autowired
	JwtHelper jwtHelper;
	@Autowired
	UserRepository userRepository;
	
	User user;

	public User validate(String auth) {
		System.out.println("token validation started");
		System.out.println(auth);
		
    	if(jwtHelper.validateRefreshToken(auth)) {
    		String uid=jwtHelper.getUserIdFromRefreshToken(auth);
    		user=userRepository.findAllByid(uid);
    	}
    	System.out.println("token validation ended");
		return user;
	}
	
	
}
