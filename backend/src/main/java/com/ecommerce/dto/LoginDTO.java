package com.ecommerce.dto;

//import lombok.Getter;
//import lombok.Setter;

import javax.validation.constraints.NotBlank;

//@Getter
//@Setter
public class LoginDTO {
//    @NotBlank
//    private String username;
//    public String getUsername() {
//		return username;
//	}
//	public void setUsername(String username) {
//		this.username = username;
//	}
	private String email;
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	@NotBlank
    private String password;
	
}
