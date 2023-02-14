package com.ecommerce.dto;

public class SellerStatsDTO {
private int totalProduct=0;
private int totalCategory=0;
private int totalCompany=0;
public int getTotalCompany() {
	return totalCompany;
}
public void setTotalCompany(int totalCompany) {
	this.totalCompany = totalCompany;
}
public int getTotalProduct() {
	return totalProduct;
}
public void setTotalProduct(int totalProduct) {
	this.totalProduct = totalProduct;
}
public int getTotalCategory() {
	return totalCategory;
}
public void setTotalCategory(int totalCategory) {
	this.totalCategory = totalCategory;
}
public SellerStatsDTO(int totalProduct, int totalCategory, int totalCompany) {
	super();
	this.totalProduct = totalProduct;
	this.totalCategory = totalCategory;
	this.totalCompany=totalCompany;
}
public SellerStatsDTO() {
	super();
	// TODO Auto-generated constructor stub
}

}
