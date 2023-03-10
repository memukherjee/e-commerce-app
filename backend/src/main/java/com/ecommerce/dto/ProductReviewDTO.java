package com.ecommerce.dto;

import java.time.LocalDate;
import java.time.LocalTime;

public class ProductReviewDTO {
	
	private String productId;
	private String message;
	private float star;
	private float averageStar;
	private String name;
	private String avatar;
	private String userId;
	private LocalTime time;
	private LocalDate date;
	
	
	
	
	
	public LocalDate getDate() {
		return date;
	}
	public void setDate(LocalDate date) {
		this.date = date;
	}
	public LocalTime getTime() {
		return time;
	}
	public void setTime(LocalTime time) {
		this.time = time;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getAvatar() {
		return avatar;
	}
	public void setAvatar(String avatar) {
		this.avatar = avatar;
	}
	public float getAverageStar() {
		return averageStar;
	}
	public void setAverageStar(float averageStar) {
		this.averageStar = averageStar;
	}
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
	public ProductReviewDTO(String productId, String message, float star,String name,String avatar,String userId,LocalDate date,LocalTime time) {
		super();
		this.productId = productId;
		this.message = message;
		this.star = star;
		this.name=name;
		this.avatar=avatar;
		this.userId=userId;
		this.date=date;
		this.time=time;
	}
	public ProductReviewDTO(float averageStar) {
		this.averageStar=averageStar;
	}
	public ProductReviewDTO() {
		super();
		// TODO Auto-generated constructor stub
	}
	

}
