package com.ecommerce.dto;

public class AdminStatsDTO {

	private int TotalUser = 0;
	private int TotalSeller = 0;
	private int TotalPendingReq = 0;

	public int getTotalPendingReq() {
		return TotalPendingReq;
	}

	public void setTotalPendingReq(int totalPendingReq) {
		TotalPendingReq = totalPendingReq;
	}

	public int getTotalUser() {
		return TotalUser;
	}

	public void setTotalUser(int totalUser) {
		TotalUser = totalUser;
	}

	public int getTotalSeller() {
		return TotalSeller;
	}

	public void setTotalSeller(int totalSeller) {
		TotalSeller = totalSeller;
	}

	public AdminStatsDTO(int totalUser, int totalSeller, int totalPendingReq) {
		super();
		TotalUser = totalUser;
		TotalSeller = totalSeller;
		TotalPendingReq = totalPendingReq;
	}

	public AdminStatsDTO() {
		super();
		// TODO Auto-generated constructor stub
	}

}
