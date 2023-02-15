package com.ecommerce.dto;

public class ProductReviewDTO {
	
	private String productId;
	private String message;
	private float star;
	public String getProductId() {
		return productId;
	}
	public void setProductId(String productId) {
		this.productId = productId;
		System.out.println("dto"+this.productId);
	}
	public String getMessage() {
		return message;
		
	}
	public void setMessage(String message) {
		this.message = message;
		System.out.println("dto"+this.message);
	}
	public float getStar() {
		return star;
	}
	public void setStar(float star) {
		this.star = star;
		System.out.println("dto"+this.star);
	}
	public ProductReviewDTO(String productId, String message, float star) {
		super();
		this.productId = productId;
		this.message = message;
		this.star = star;
	}
	public ProductReviewDTO() {
		super();
		// TODO Auto-generated constructor stub
	}
	

}
