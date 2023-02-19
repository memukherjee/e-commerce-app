package com.ecommerce.Entity;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Id;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;
import java.time.LocalTime;
import java.time.LocalDate;

@Entity
@Data
@Document(collection="reviews")
public class ProductReview {

	@Id
	private String userId;
	@Id
	private String productId;
	private String message;
	private float star;
	private LocalTime time;
	private LocalDate date;
	private String userName;
	
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getProductId() {
		return productId;
	}
	public void setProductId(String productId) {
		this.productId = productId;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public float getStar() {
		return star;
	}
	public void setStar(float star) {
		this.star = star;
	}
	public LocalTime getTime() {
		return time;
	}
	public void setTime(LocalTime time) {
		this.time = time;
	}
	public LocalDate getDate() {
		return date;
	}
	public void setDate(LocalDate date) {
		this.date = date;
	}
	public ProductReview(String userId, String productId, String message, float star,String userName) {
		super();
		this.userId = userId;
		this.productId = productId;
		this.message = message;
		this.star = star;
		this.time = LocalTime.now();
		this.date = LocalDate.now();
		this.userName=userName;
	}
	public ProductReview() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
	
}
