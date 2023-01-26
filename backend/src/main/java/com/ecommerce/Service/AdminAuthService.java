package com.ecommerce.Service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.ecommerce.Entity.Admin;
import com.ecommerce.Entity.Seller;
import com.ecommerce.Entity.User;
import com.ecommerce.Repository.AdminAuthRepository;
import com.ecommerce.Repository.UserRepository;
import com.ecommerce.jwt.AdminTokenValidator;

@Service
public class AdminAuthService implements UserDetailsService{
	
	@Autowired
    AdminAuthRepository adminAuthRepository;
	@Autowired
	AdminTokenValidator token;
	@Autowired
	UserRepository userRepository;

	 @Override
	    public Admin loadUserByUsername(String username) throws UsernameNotFoundException {
	        return adminAuthRepository.findByUsername(username)
	               .orElseThrow(() -> new UsernameNotFoundException("username not found"));
	    }
	  public Admin findById(String id) {
	        return adminAuthRepository.findById(id)
	                .orElseThrow(() -> new UsernameNotFoundException("user id not found"));
	    }
	public List<User> getUser(Integer pageNo, Integer pageSize) {
			Pageable paging=PageRequest.of(pageNo, pageSize);
			Page<User> p=userRepository.findAll(paging);
			
			if(p.hasContent()) {
				return p.getContent();
			}else {
				return new ArrayList<User>();
			}
			
	}

}
