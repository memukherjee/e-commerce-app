package com.ecommerce.dto;

import java.util.ArrayList;

public class ProductAverageRatingDTO {

	private String product_id;
	private String seller_id;
	private String product_name;
	private String product_category;
	private String product_description;
	private ArrayList<String> size;
	private String product_company;
	public double product_price;
	public double product_discount;
	public double discountPrice;
	private int product_quantity;
	private int product_sold;
	private String product_imageUrl;
	private float averageRating = 0;
	private String clothingType;
	private boolean userPurchased;

	public boolean isUserPurchased() {
		return userPurchased;
	}

	public void setUserPurchased(boolean userPurchased) {
		this.userPurchased = userPurchased;
	}

	public String getClothingType() {
		return clothingType;
	}

	public void setClothingType(String clothingType) {
		this.clothingType = clothingType;
	}

	public ProductAverageRatingDTO() {
		super();
	}

	public ProductAverageRatingDTO(String product_id, String seller_id, String product_name, String product_category,
			String product_description, ArrayList<String> size, String product_company, double product_price,
			double product_discount, double discountPrice, int product_quantity, int product_sold,
			String product_imageUrl, float averageRating, String clothingType, boolean userPurchased) {
		super();
		this.product_id = product_id;
		this.seller_id = seller_id;
		this.product_name = product_name;
		this.product_category = product_category;
		this.product_description = product_description;
		this.size = size;
		this.product_company = product_company;
		this.product_price = product_price;
		this.product_discount = product_discount;
		this.discountPrice = discountPrice;
		this.product_quantity = product_quantity;
		this.product_sold = product_sold;
		this.product_imageUrl = product_imageUrl;
		this.averageRating = averageRating;
		this.clothingType = clothingType;
		this.userPurchased = userPurchased;
	}

	public float getAverageRating() {
		return averageRating;
	}

	public void setAverageRating(float averageRating) {
		this.averageRating = averageRating;
	}

	public String getProduct_id() {
		return product_id;
	}

	public void setProduct_id(String product_id) {
		this.product_id = product_id;
	}

	public String getSeller_id() {
		return seller_id;
	}

	public void setSeller_id(String seller_id) {
		this.seller_id = seller_id;
	}

	public String getProduct_name() {
		return product_name;
	}

	public void setProduct_name(String product_name) {
		this.product_name = product_name;
	}

	public String getProduct_category() {
		return product_category;
	}

	public void setProduct_category(String product_category) {
		this.product_category = product_category;
	}

	public String getProduct_description() {
		return product_description;
	}

	public void setProduct_description(String product_description) {
		this.product_description = product_description;
	}

	public ArrayList<String> getSize() {
		return size;
	}

	public void setSize(ArrayList<String> size) {
		this.size = size;
	}

	public String getProduct_company() {
		return product_company;
	}

	public void setProduct_company(String product_company) {
		this.product_company = product_company;
	}

	public double getProduct_price() {
		return product_price;
	}

	public void setProduct_price(double product_price) {
		this.product_price = product_price;
	}

	public double getProduct_discount() {
		return product_discount;
	}

	public void setProduct_discount(double product_discount) {
		this.product_discount = product_discount;
	}

	public double getDiscountPrice() {
		return discountPrice;
	}

	public void setDiscountPrice(double discountPrice) {
		this.discountPrice = discountPrice;
	}

	public int getProduct_quantity() {
		return product_quantity;
	}

	public void setProduct_quantity(int product_quantity) {
		this.product_quantity = product_quantity;
	}

	public int getProduct_sold() {
		return product_sold;
	}

	public void setProduct_sold(int product_sold) {
		this.product_sold = product_sold;
	}

	public String getProduct_imageUrl() {
		return product_imageUrl;
	}

	public void setProduct_imageUrl(String product_imageUrl) {
		this.product_imageUrl = product_imageUrl;
	}

}
