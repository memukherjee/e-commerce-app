package com.ecommerce.Entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

@Document
public class SellerRefreshToken {
	@Id
	String id;
	@DocumentReference(lazy = true)
	private Seller owner;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public Seller getOwner() {
		return owner;
	}

	public void setOwner(Seller owner) {
		this.owner = owner;
		System.out.println("owner=" + this.owner);
	}
}