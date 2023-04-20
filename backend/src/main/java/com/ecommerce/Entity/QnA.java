package com.ecommerce.Entity;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.Id;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.stereotype.Component;

import lombok.Data;

@Component
@Entity
@Data
@Document(collection = "qna")
public class QnA {

	@Id
	private String id;
	private String userId = "";
	private String productId = "";
	private String question = "";
	private List<Answer> answer;
	private LocalDate date;
	private LocalTime time;

	public QnA(String userId, String productId, String question) {
		super();
		this.userId = userId;
		this.productId = productId;
		this.question = question;
		this.date = LocalDate.now();
		this.time = LocalTime.now();
	}

	public QnA() {
		super();
	}

	public String getProductId() {
		return productId;
	}

	public void setProductId(String productId) {
		this.productId = productId;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getQuestion() {
		return question;
	}

	public void setQuestion(String question) {
		this.question = question;
	}

	public List<Answer> getAnswer() {
		return answer;
	}

	public void setAnswer(List<Answer> answer) {
		this.answer = answer;
	}

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

}
