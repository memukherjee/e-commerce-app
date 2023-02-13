package com.ecommerce.Entity;

import javax.persistence.Entity;
import javax.persistence.Id;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;
@Entity
@Data
@Document(collection="wishlist")
public class WishList {

	@Id
	private String userId;
	@Id
	private String productId;
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
		System.out.println("1");
	}
	public String getProductId() {
		return productId;
	}
	public void setProductId(String productId) {
		this.productId = productId;
		System.out.println("2");
	}
	public WishList(String id, String productId) {
		super();
		this.userId = id;
		this.productId = productId;
	}
	public WishList() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
	
}
