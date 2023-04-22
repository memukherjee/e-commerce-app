package com.ecommerce.Entity;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Entity
@Data
@Document(collection = "reviews")
public class ProductReview {

	@Id
	@GeneratedValue
	private String id;

	@Id
	private String userId;
	@Id
	private String productId;
	private String message;
	private float star;
	private Date createdAt;

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

	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	public ProductReview(String userId, String productId, String message, float star, Date createdAt) {
		super();
		this.userId = userId;
		this.productId = productId;
		this.message = message;
		this.star = star;
		this.createdAt = createdAt;
	}

	public ProductReview() {
		super();
	}

}
