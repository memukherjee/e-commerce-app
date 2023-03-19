package com.ecommerce.dto;

public class SellerStatsDTO {
private int totalProduct=0;
private int totalCategory=0;
private int totalCompany=0;
private int totalReviews=0;
private int totalOrderCount=0;
private int totalSoldItems=0;



public int getTotalOrderCount() {
	return totalOrderCount;
}
public void setTotalOrderCount(int totalOrderCount) {
	this.totalOrderCount = totalOrderCount;
}
public int getTotalSoldItems() {
	return totalSoldItems;
}
public void setTotalSoldItems(int totalSoldItems) {
	this.totalSoldItems = totalSoldItems;
}
public int getTotalReviews() {
	return totalReviews;
}
public void setTotalReviews(int totalReviews) {
	this.totalReviews = totalReviews;
}
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
public SellerStatsDTO(int totalProduct, int totalCategory, int totalCompany,int totalReviews) {
	super();
	this.totalProduct = totalProduct;
	this.totalCategory = totalCategory;
	this.totalCompany=totalCompany;
	this.totalReviews=totalReviews;
}
public SellerStatsDTO() {
	super();
	// TODO Auto-generated constructor stub
}

}
