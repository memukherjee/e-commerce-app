package com.ecommerce.jwt;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.ecommerce.Entity.Admin;
import com.ecommerce.Repository.AdminAuthRepository;

@Component
public class AdminTokenValidator {
	@Autowired
	JwtHelper jwtHelper;
	@Autowired
	AdminAuthRepository adminAuthRepository;

	Admin admin = null;

	public Admin validate(String auth) {
		System.out.println("token validation started");
		System.out.println(auth);

		if (jwtHelper.validateRefreshToken(auth)) {
			String uid = jwtHelper.getUserIdFromRefreshToken(auth);
			admin = adminAuthRepository.findAllByid(uid);
		} else {
			return null;
		}
		System.out.println("token validation ended");
		return admin;
	}
}
