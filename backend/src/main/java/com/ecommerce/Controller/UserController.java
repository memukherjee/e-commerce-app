package com.ecommerce.Controller;

import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.Entity.UserData;
import com.ecommerce.Service.UserService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api")
public class UserController {

	@Autowired
	UserService userService;

	@PostMapping("/signup")
	public UserData signup(@Valid @RequestBody UserData userData) {
		UserData user = userService.saveDataTODB(userData);
		return user;
	}

	@GetMapping("getUserDetails/{id}")
	public UserData getUserDetails(@PathVariable String id) {
		UserData user = userService.getsUserDetailsFromDB(id);
		return user;
	}

	@PostMapping("/login/{email}/{pass}")
	public List<Object> MatchData(@PathVariable String email, @PathVariable String pass) {
		System.out.println("login controller email and pass=" + email + " : " + pass);
		UserData user = userService.findByEmail(email, pass);
		System.out.println(user);
		List<Object> v=new ArrayList<>();
		if (user != null) {
			v.add(user);
		}else
		v.add(new ResponseEntity<String>(HttpStatus.UNAUTHORIZED));
		return v;
	}
//	 

}
