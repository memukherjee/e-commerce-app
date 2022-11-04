package com.ecommerce.Entity;

import java.math.BigInteger;

import javax.persistence.GeneratedValue;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;


@Document(collection="user")
public class UserData {
	 
	@Id
	@GeneratedValue
	private BigInteger id;
	
	@NotEmpty
	@Field("name")
	private String name;         //user name
	
	
	@Email(message="Enter a valid email or email id already exist")
	@Field("email")
	private String email;        //user email
	@Indexed(unique=true)
	
	@NotEmpty
	@Field("address")
	private String address;      //user address
	
	@Field("mob")
	private int mob;             //user mobile no.
	@NotEmpty
	@Size(min=4,max=8,message="Password should contain minimum 4 character and maximum 8 character")
	private String pass;         //user password
	public UserData(String name, String email, String address, int mob, String pass) {
		super();
		this.name = name;
		this.email = email;
		this.address = address;
		this.mob = mob;
		this.pass = pass;
	}
	public UserData() {
		super();
		// TODO Auto-generated constructor stub
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public int getMob() {
		return mob;
	}
	public void setMob(int mob) {
		this.mob = mob;
	}
	public String getPass() {
		return pass;
	}
	public void setPass(String pass) {
		this.pass = pass;
	}
	
	

}
