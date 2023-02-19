package com.ecommerce.dto;

import java.util.ArrayList;

import com.ecommerce.Entity.Product;
import org.springframework.data.mongodb.core.mapping.Document;

public class CartDTO {
    private ArrayList<CartProductDTO> list;
    private double total;
    private int total_quantity;

   

    public ArrayList<CartProductDTO> getList() {
		return list;
	}

	public void setList(ArrayList<CartProductDTO> list) {
		this.list = list;
	}

	public double getTotal() {
        return total;
    }

    public void setTotal(double total) {
        this.total = total;
    }

    public int getTotal_quantity() {
        return total_quantity;
    }

    public void setTotal_quantity(int total_quantity) {
        this.total_quantity = total_quantity;
    }

}
