package com.ecommerce.Controller;

import java.math.BigInteger;
import java.util.List;
import java.util.Vector;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.Entity.UserData;
import com.ecommerce.Repository.UserRepo;
import com.ecommerce.Service.UserService;

@RestController
@RequestMapping("/ecommerce/user")
public class UserController {
	String email;                //forgotpass_link
	String otp;
	
	Vector forgot=new Vector();  //forgotpass_link

	@Autowired
	UserService userService;
	
//                                     *************************signup module**************************** 
	@PostMapping("/signup")
	public UserData signup(@Valid @RequestBody UserData userData) {
		UserData user = userService.saveDataTODB(userData);
		return user;
	}
//                                 **************************details of user***********************
	@GetMapping("getUserDetails/{id}")
	public UserData getUserDetails(@PathVariable String id) {
		UserData user = userService.getsUserDetailsFromDB(id);
		return user;
	}
	
	//                                      ************************* login module*************************

	@PostMapping("/login/{email}/{pass}")
	public Vector MatchData(@PathVariable String email, @PathVariable String pass) {
		System.out.println("login controller email and pass=" + email + " : " + pass);
		UserData user = userService.findByEmail(email, pass);
		Vector v = new Vector();
		if (user != null) {
			v.add(user);
		} else
			v.add(new ResponseEntity<String>(HttpStatus.UNAUTHORIZED));
		return v;

	}

	//                             **************************    Forgot password module    **********************************

	@PostMapping("/forgotpass/{email}")
	public Object ForgotPass(@PathVariable String email) {
		this.email=email;
		System.out.println("forgotpass controller email=" + email);
		forgot = userService.findByEmail(email);
		
		return forgot.lastElement();

	}

	

	@PostMapping("/otp/{otp}")
	public Vector otp(@PathVariable String otp) {
		Vector votp=new Vector();
		this.otp=otp;
		if(forgot.contains(otp)) {
			System.out.println("matched");
			votp.add(new ResponseEntity<String>(HttpStatus.ACCEPTED));
		}else {
			System.out.println("not matched");
			votp.add(new ResponseEntity<String>(HttpStatus.NOT_ACCEPTABLE));
		}
		return votp;

	}
	
	@PostMapping("/reset/{pass}")
	public Vector reset(@PathVariable String pass) {
		System.out.println("reset speaking");
		System.out.println(pass);
		System.out.println(email);
		Vector user = userService.findByEmailreset(email, pass);
		return user;
			
		
	}

}
