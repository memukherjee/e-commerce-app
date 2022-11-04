package com.ecommerce.Service;


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

	// retrive data from db
	public UserData getsUserDetailsFromDB(String id) {
		return userRepo.findAllByid(id);
	}

	public UserData findByEmail(String email, String pass) {
		UserData user = userRepo.findByEmail(email);
		System.out.println("service="+user);
		
		if (user != null) {
			String locpass = user.getPass();
			if(locpass.equals(pass)) {
			return user;
			}
	}
		return null;

	}

//	public String matchData(String email,String pass) {
//		System.out.println("loginService email and pass="+email+" : "+pass);
//				
//
//		return pass;
//	}

}
