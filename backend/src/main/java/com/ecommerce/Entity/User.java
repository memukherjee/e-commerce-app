package com.ecommerce.Entity;

import java.util.Collection;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.security.core.GrantedAuthority;
import java.util.Collections;

@Document(collection = "user")
public class User implements UserDetails {

	@Id
	String id;

	public User() {
		super();
	}

	private String username;
	private String name;

	private String email;
	@JsonIgnore

	private String password;

	private String mobile;

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getAvatar() {
		return avatar;
	}

	public void setAvatar(String avatar) {
		this.avatar = avatar;
	}

	private String address;

	private String avatar;
	private boolean isSubscribedtoNewsLetter;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public boolean getIsSubscribedtoNewsLetter() {
		return isSubscribedtoNewsLetter;
	}

	public void setIsSubscribedtoNewsLetter(boolean isSubscribedtoNewsLetter) {
		this.isSubscribedtoNewsLetter = isSubscribedtoNewsLetter;
	}

	public User(String name, String email, String encode, String mobile, String address,
			Boolean isSubscribedtoNewsLetter) {
		this.setAvatar("https://avatars.dicebear.com/api/initials/" + name + ".svg");
		this.setMobile(mobile);
		this.name = name;
		this.setAddress(address);
		this.setUsername(email);
		this.setEmail(email);
		this.setPassword(encode);
		this.setIsSubscribedtoNewsLetter(isSubscribedtoNewsLetter);
		System.out.println(this.username + this.email + this.password);
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Collection<? extends GrantedAuthority> getAuthorities() {
		return Collections.emptyList();
	}

	@Override
	public String getPassword() {
		return password;
	}

	@Override
	public String getUsername() {
		return username;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

}
