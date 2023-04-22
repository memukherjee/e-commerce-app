package com.ecommerce.dto;

import java.util.Date;

public class PlaceOrderDTO {

	private CartDTO cartDTO;
	private String address;
	private String orderCreationId;
	private String razorpayPaymentId;
	private String razorPayOrderId;
	private String razorpaypaySignature;
	private Date createdAt;

	public CartDTO getCartDTO() {
		return cartDTO;
	}

	public void setCartDTO(CartDTO cartDTO) {
		this.cartDTO = cartDTO;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getOrderCreationId() {
		return orderCreationId;
	}

	public void setOrderCreationId(String orderCreationId) {
		this.orderCreationId = orderCreationId;
	}

	public String getRazorpayPaymentId() {
		return razorpayPaymentId;
	}

	public void setRazorpayPaymentId(String razorpayPaymentId) {
		this.razorpayPaymentId = razorpayPaymentId;
	}

	public String getRazorPayOrderId() {
		return razorPayOrderId;
	}

	public void setRazorPayOrderId(String razorPayOrderId) {
		this.razorPayOrderId = razorPayOrderId;
	}

	public String getRazorpaypaySignature() {
		return razorpaypaySignature;
	}

	public void setRazorpaypaySignature(String razorpaypaySignature) {
		this.razorpaypaySignature = razorpaypaySignature;
	}

	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

}
