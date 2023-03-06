package com.ecommerce.dto;

public class CartProductDTO {

	private String product_id;
	private String seller_id;
	private String cart_id;
	private String product_name;
	private String product_category;
	private String product_description;
	private String size;
	private String product_company;
	private double product_price;
	private double product_discount;
	private double discountPrice;
	private int quantity;
	private String product_imageUrl;
	
	public CartProductDTO(String product_id, String seller_id, String cart_id, String product_name,
			String product_category, String product_description, String size, String product_company,
			double product_price, double product_discount, double discountPrice, int quantity,
			String product_imageUrl) {
		super();
		this.product_id = product_id;
		this.seller_id = seller_id;
		this.cart_id = cart_id;
		this.product_name = product_name;
		this.product_category = product_category;
		this.product_description = product_description;
		this.size = size;
		this.product_company = product_company;
		this.product_price = product_price;
		this.product_discount = product_discount;
		this.discountPrice = discountPrice;
		this.quantity = quantity;
		this.product_imageUrl = product_imageUrl;
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
	
	public String getCart_id() {
		return cart_id;
	}
	public void setCart_id(String cart_id) {
		this.cart_id = cart_id;
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
	public String getSize() {
		return size;
	}
	public void setSize(String size) {
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
	
	public int getQuantity() {
		return quantity;
	}
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	public String getProduct_imageUrl() {
		return product_imageUrl;
	}
	public void setProduct_imageUrl(String product_imageUrl) {
		this.product_imageUrl = product_imageUrl;
	}
	
	
	
}
