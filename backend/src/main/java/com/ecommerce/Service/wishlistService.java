package com.ecommerce.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.ecommerce.Entity.WishList;
import com.ecommerce.Repository.wishListRepository;

@Service
public class wishlistService {

	@Autowired
	wishListRepository wishListRepository;

	public ResponseEntity<Object> add(String id, String productId) {
		System.out.println("hi service");
		WishList wishList = new WishList();
		wishList.setUserId(id);
		wishList.setProductId(productId);
		System.out.println(wishList.getProductId() + "  " + wishList.getUserId());
		wishListRepository.save(wishList);
		return new ResponseEntity<>("wishlist added", HttpStatus.OK);
	}

	public ResponseEntity<Object> delete(String id, String productId) {
		WishList wishList1 = new WishList();
		System.out.println("service" + id + "   " + productId);
		wishList1.setUserId(id);
		wishList1.setProductId(productId);
		System.out.println(wishList1.getUserId() + "  " + wishList1.getProductId());
		wishListRepository.deleteByUserIdAndProductId(id, productId);

		return new ResponseEntity<>("wishlist deleted", HttpStatus.OK);
	}

}
