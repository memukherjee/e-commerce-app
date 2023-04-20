package com.ecommerce.jwt;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.ecommerce.Entity.Seller;
import com.ecommerce.Repository.SellerRepository;

@Component
public class SellerTokenValidator {

	@Autowired
	JwtHelper jwtHelper;
	@Autowired
	SellerRepository sellerRepository;

	Seller seller = null;

	public Seller validate(String auth) {
		System.out.println("token validation started");
		System.out.println(auth);

		if (jwtHelper.validateRefreshToken(auth)) {
			String uid = jwtHelper.getUserIdFromRefreshToken(auth);
			seller = sellerRepository.findAllByid(uid);
		} else {
			return null;
		}
		System.out.println("token validation ended");
		return seller;
	}

}