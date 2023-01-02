package com.ecommerce.dto;

import com.ecommerce.Entity.RefreshToken;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class TokenDTO {
    private String userId;
    private String accessToken;
    private String refreshToken;
    public TokenDTO() {
		super();
		// TODO Auto-generated constructor stub
	}



	public TokenDTO(String id, String accessToken2, RefreshToken refreshToken2) {
		// TODO Auto-generated constructor stub
    	this.setUserId(id);
    	this.setAccessToken(accessToken2);
    	this.setRefreshToken(accessToken2);
	}
	
	

	public TokenDTO(String id, String accessToken2, String refreshTokenString) {
		this.setUserId(id);
    	this.setAccessToken(accessToken2);
    	this.setRefreshToken(accessToken2);
	}



	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getAccessToken() {
		return accessToken;
	}
	public void setAccessToken(String accessToken) {
		this.accessToken = accessToken;
	}
	public String getRefreshToken() {
		return refreshToken;
	}
	public void setRefreshToken(String refreshToken) {
		this.refreshToken = refreshToken;
	}
	
}