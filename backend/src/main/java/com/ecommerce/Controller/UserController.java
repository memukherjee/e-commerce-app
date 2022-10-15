package com.ecommerce.Controller;

import java.math.BigInteger;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.Entity.UserData;
import com.ecommerce.Service.UserService;

@RestController
@RequestMapping("/ecommerce/user")
public class UserController {
	

	@Autowired
	UserService userService;

	@PostMapping("/signup")
	public UserData signup(@Valid @RequestBody UserData userData) {
		UserData user=userService.saveDataTODB(userData);
		return user;
	}
	
	@GetMapping("getUserDetails/{id}")
	public UserData getUserDetails(@PathVariable String id) {
		UserData user=userService.getsUserDetailsFromDB(id);
		return user;
	}
//	

}
