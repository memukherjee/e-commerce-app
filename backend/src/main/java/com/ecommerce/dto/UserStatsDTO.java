package com.ecommerce.dto;

public class UserStatsDTO {
	private int totalOrder=0;
	private int totalCartItems=0;
	private int totalWishListItems=0;
	public UserStatsDTO(int totalOrder, int totalCartItems, int totalWishListItems) {
		super();
		this.totalOrder = totalOrder;
		this.totalCartItems = totalCartItems;
		this.totalWishListItems = totalWishListItems;
	}
	public UserStatsDTO() {
		super();
		// TODO Auto-generated constructor stub
	}
	public int getTotalOrder() {
		return totalOrder;
	}
	public void setTotalOrder(int totalOrder) {
		this.totalOrder = totalOrder;
	}
	public int getTotalCartItems() {
		return totalCartItems;
	}
	public void setTotalCartItems(int totalCartItems) {
		this.totalCartItems = totalCartItems;
	}
	public int getTotalWishListItems() {
		return totalWishListItems;
	}
	public void setTotalWishListItems(int totalWishListItems) {
		this.totalWishListItems = totalWishListItems;
	}
	
	

}
