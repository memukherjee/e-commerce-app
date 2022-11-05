package com.ecommerce.Service;

import java.math.BigInteger;
import java.util.Vector;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.ecommerce.Entity.UserData;
import com.ecommerce.Repository.UserRepo;

@Service
public class UserService {

	@Autowired
	UserRepo userRepo;

	public Vector saveDataTODB(UserData metaData) { // signup module
		Vector v = new Vector();
		String email = metaData.getEmail();
		UserData user = userRepo.findByEmail(email);
		if (user == null) {
			v.add(userRepo.save(metaData));
			return v;
		} else {
			v.add("Email Id Already Exist");
			return v;
		}
	}

	// retrive data from db
	public UserData getsUserDetailsFromDB(String id) {
		return userRepo.findAllByid(id);
	}

	public UserData findByEmail(String email, String pass) { // login module
		UserData user = userRepo.findByEmail(email);
		System.out.println("service=" + user);

		if (user != null) {
			String locpass = user.getPass();
			if (locpass.equals(pass)) {
				return user;
			}
		}
		return null;

	}

	public Vector findByEmail(String email) { // forgot password module
		UserData user = userRepo.findByEmail(email);
		OtpMail obj = new OtpMail();
		System.out.println("service=" + user);
		Vector v = new Vector();
		if (user != null) {
			System.out.println("email verified");
			int otp = (int) (Math.random() * 9999);
			String random = String.valueOf(otp);
			System.out.println(random);
			obj.king(random, email); // mail
			v.add(random);
			v.add(new ResponseEntity<String>(HttpStatus.FOUND));

		} else {
			System.out.println("email not verified");
			v.add(new ResponseEntity<String>(HttpStatus.NOT_FOUND));
		}
		return v;
	}

	public Vector findByEmailreset(String email, String pass) {
		UserData user = userRepo.findByEmail(email);
		Vector v = new Vector();
		if (user != null) {
			System.out.println(user);
			user.setPass(pass);
			userRepo.save(user);
			v.add(new ResponseEntity<String>(HttpStatus.ACCEPTED));
		} else {
			v.add(new ResponseEntity<String>(HttpStatus.NOT_ACCEPTABLE));
		}
		return v;

	}

}
