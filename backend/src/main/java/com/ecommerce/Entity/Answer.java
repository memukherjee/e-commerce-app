package com.ecommerce.Entity;

import java.time.LocalDate;
import java.time.LocalTime;

public class Answer {
	private String answer = "";
	private String userId = "";
	private LocalDate date;
	private LocalTime time;

	public Answer(String answer, String userId) {
		super();
		this.answer = answer;
		this.userId = userId;
		this.date = LocalDate.now();
		this.time = LocalTime.now();
	}

	public String getAnswer() {
		return answer;
	}

	public void setAnswer(String answer) {
		this.answer = answer;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
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
