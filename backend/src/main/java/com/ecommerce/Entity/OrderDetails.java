package com.ecommerce.Entity;

import com.ecommerce.dto.CartDTO;
import com.ecommerce.dto.CartProductDTO;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Order")
public class OrderDetails {
	private String id;
    private String user_id;
    private String seller_id;
    private String address;
    private CartProductDTO cartProductDTO;
    private String method;
    private String paymentStatus;
    private String orderCreationId;
    private String razorpayPaymentId;
    private String razorPayOrderId;
    private String razorpaypaySignature;
    private String date;
    private String expDelivary;
    private String OrderStatus;
    
    
    public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getUser_id() {
        return user_id;
    }

    public void setUser_id(String user_id) {
        this.user_id = user_id;
    }

    
    public String getSeller_id() {
		return seller_id;
	}

	public void setSeller_id(String seller_id) {
		this.seller_id = seller_id;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	
	public CartProductDTO getCartProductDTO() {
		return cartProductDTO;
	}

	public void setCartProductDTO(CartProductDTO cartProductDTO) {
		this.cartProductDTO = cartProductDTO;
	}

	public String getMethod() {
        return method;
    }

    public void setMethod(String method) {
        this.method = method;
    }

    
    public String getPaymentStatus() {
		return paymentStatus;
	}

	public void setPaymentStatus(String paymentStatus) {
		this.paymentStatus = paymentStatus;
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

	public String getOrderStatus() {
		return OrderStatus;
	}

	public void setOrderStatus(String orderStatus) {
		OrderStatus = orderStatus;
	}

	public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getExpDelivary() {
        return expDelivary;
    }

    public void setExpDelivary(String expDelivary) {
        this.expDelivary = expDelivary;
    }

    

}
