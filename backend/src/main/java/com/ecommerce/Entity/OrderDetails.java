package com.ecommerce.Entity;

import com.ecommerce.dto.CartDTO;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Order")
public class OrderDetails {
    private String user_id;
    private CartDTO cartDTO;
    private String method;
    private String t_id;
    private String date;
    private String expDelivary;
    private String status;

    public String getUser_id() {
        return user_id;
    }

    public void setUser_id(String user_id) {
        this.user_id = user_id;
    }

    public CartDTO getCartDetails() {
        return cartDTO;
    }

    public void setCartDetails(CartDTO cartDTO) {
        this.cartDTO = cartDTO;
    }

    public String getMethod() {
        return method;
    }

    public void setMethod(String method) {
        this.method = method;
    }

    public String getT_id() {
        return t_id;
    }

    public void setT_id(String t_id) {
        this.t_id = t_id;
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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

}
