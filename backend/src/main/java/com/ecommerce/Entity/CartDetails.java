package com.ecommerce.Entity;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection="Cart")
public class CartDetails {

	private String user_id;
	private ArrayList<List<Object>> list;
	private double total;
	private int total_quantity;
	
	
	public String getUser_id() {
		return user_id;
	}
	public void setUser_id(String user_id) {
		this.user_id = user_id;
	}
		
	public ArrayList<List<Object>> getList() {
		return list;
	}
	public void setList(ArrayList<List<Object>> list) {
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
