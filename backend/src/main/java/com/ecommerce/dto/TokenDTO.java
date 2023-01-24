package com.ecommerce.dto;

import com.ecommerce.Entity.RefreshToken;

import lombok.AllArgsConstructor;
//import lombok.Getter;
//import lombok.Setter;

//@Getter
//@Setter
//@AllArgsConstructor
public class TokenDTO {
    private String Id;
    private String accessToken;
    private String refreshToken;
	
    
    public TokenDTO(String id, String accessToken, String refreshTokenString) {
		this.Id=id;
		this.accessToken=accessToken;
		this.refreshToken=refreshTokenString;
	}
	public String getId() {
		return Id;
	}
	public void setId(String Id) {
		this.Id = Id;
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