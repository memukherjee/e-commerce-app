package com.ecommerce.Entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "ShoppingCart")
public class ShoppingCart {

	@Id
    private String id;
    private String user_id;
    private String product_id;
    private int cart_quantity;
    
	public ShoppingCart(String id, String user_id, String product_id, int cart_quantity) {
		super();
		this.id = id;
		this.user_id = user_id;
		this.product_id = product_id;
		this.cart_quantity = cart_quantity;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getUser_id() {
		return user_id;
	}

	public void setUser_id(String user_id) {
		this.user_id = user_id;
	}

	public String getProduct_id() {
		return product_id;
	}

	public void setProduct_id(String product_id) {
		this.product_id = product_id;
	}

	public int getCart_quantity() {
		return cart_quantity;
	}

	public void setCart_quantity(int cart_quantity) {
		this.cart_quantity = cart_quantity;
	}

	@Override
	public String toString() {
		return "ShoppingCart [id=" + id + ", user_id=" + user_id + ", product_id=" + product_id + ", cart_quantity="
				+ cart_quantity + "]";
	}
	 
		 
}
