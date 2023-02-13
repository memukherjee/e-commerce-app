package com.ecommerce.dto;

import org.springframework.data.mongodb.core.mapping.DBRef;

import com.ecommerce.Entity.Product;

public class wishlistDTO {
	
	public Product product;
	boolean wishlisted=false;
	public Product getProduct() {
		return product;
	}
	public void setProduct(Product product) {
		this.product = product;
	}
	public boolean isWishlisted() {
		return wishlisted;
	}
	public void setWishlisted(boolean wishlisted) {
		this.wishlisted = wishlisted;
	}
	public wishlistDTO() {
		super();
		// TODO Auto-generated constructor stub
	}
	public wishlistDTO(Product product, boolean wishlisted) {
		super();
		this.product = product;
		this.wishlisted = wishlisted;
	}
	
	

}
