package com.ecommerce.Entity;

import java.math.BigInteger;
import java.util.Collection;

import javax.annotation.Generated;
import javax.persistence.GeneratedValue;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import java.util.Collection;
import java.util.Collections;
//import lombok.Data;
//import lombok.NonNull;


@Document(collection="user")
public class User implements UserDetails {
//    public User(String id, String username, String email, String password, String mobile, String address,
//			String avatar) {
//		super();
//		this.id = id;
//		this.username = username;
//		this.email = email;
//		this.password = password;
//		this.mobile = mobile;
//		this.address = address;
//		this.avatar = avatar;
//	}
	

	@Id
    String id;
public User() {
		super();
		// TODO Auto-generated constructor stub
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
    public String getName() {
    	return name;
    }
    public void setName(String name) {
    	this.name=name;
    }
   
    
    public User(String name, String email, String encode,String mobile,String address) {
    	this.setAvatar("https://avatars.dicebear.com/api/initials/"+name+".svg");
		this.setMobile(mobile);
		this.name=name;
		this.setAddress(address);
		this.setUsername(email);
		this.setEmail(email);
		this.setPassword(encode);
		System.out.println(this.username+this.email+this.password);
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
        return Collections.EMPTY_LIST;
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
	 
//	@Id
//	@GeneratedValue
//	private BigInteger id;
//	
//	@NotEmpty
//	@Field("name")
//	private String name;         //user name
//	
//	
//	
//	@Field("email")
//	private String email;        //user email
//	@Indexed(unique=true)
//	
//	
//	@Field("address")
//	private String address;      //user address
//	
//	@Field("mob")
//	private String mob;             //user mobile no.
//	@NotEmpty
//	private String pass;         //user password
//	
//	private String avatar;      //user avatarz
//	public String getAvatar() {
//		return avatar;
//	}
//	public void setAvatar(String avatar) {
//		this.avatar = avatar;
//	}
//	public User(String name, String email, String address, String mob, String pass) {
//		super();
//		this.name = name;
//		this.email = email;
//		this.address = address;
//		this.mob = mob;
//		this.pass = pass;
//	}
//	public User() {
//		super();
//		// TODO Auto-generated constructor stub
//	}
//	public String getName() {
//		return name;
//	}
//	public void setName(String name) {
//		this.name = name;
//	}
//	public String getEmail() {
//		return email;
//	}
//	public void setEmail(String email) {
//		this.email = email;
//	}
//	public String getAddress() {
//		return address;
//	}
//	public void setAddress(String address) {
//		this.address = address;
//	}
//	public String getMob() {
//		return mob;
//	}
//	public void setMob(String mob) {
//		this.mob = mob;
//	}
//	public String getPass() {
//		return pass;
//	}
//	public void setPass(String pass) {
//		this.pass = pass;
//	}
//	
	

}
