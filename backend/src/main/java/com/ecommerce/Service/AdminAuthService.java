package com.ecommerce.Service;

import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.support.PagedListHolder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.ecommerce.Entity.Admin;
import com.ecommerce.Entity.Seller;
import com.ecommerce.Entity.User;
import com.ecommerce.Repository.AdminAuthRepository;
import com.ecommerce.Repository.SellerRepository;
import com.ecommerce.Repository.UserRepository;
import com.ecommerce.jwt.AdminTokenValidator;

@Service
public class AdminAuthService implements UserDetailsService {

	@Autowired
	AdminAuthRepository adminAuthRepository;
	@Autowired
	AdminTokenValidator token;
	@Autowired
	UserRepository userRepository;
	@Autowired
	SellerRepository sellerRepository;

	@Override
	public Admin loadUserByUsername(String username) throws UsernameNotFoundException {
		return adminAuthRepository.findByUsername(username)
				.orElseThrow(() -> new UsernameNotFoundException("username not found"));
	}

	public Admin findById(String id) {
		return adminAuthRepository.findById(id)
				.orElseThrow(() -> new UsernameNotFoundException("user id not found"));
	}

	public Page<User> getUser(Integer pageNo, Integer pageSize) {
		Page<User> user = userRepository.findAll(PageRequest.of(pageNo, pageSize));
		return user;

	}

	public List<Seller> getSeller(Integer pageNo, Integer pageSize) {
		List<Seller> seller = sellerRepository.findVerified();
		PagedListHolder<Seller> pagedListHolder = new PagedListHolder<Seller>(seller);
		pagedListHolder.setPage(pageNo);
		pagedListHolder.setPageSize(pageSize);
		int size = pagedListHolder.getPageCount();
		if (pageNo >= size)
			return Collections.emptyList();
		return pagedListHolder.getPageList();
	}

	public List<Seller> getSellerRequests(Integer pageNo, Integer pageSize) {
		List<Seller> seller = sellerRepository.findSellerRequests();
		PagedListHolder<Seller> pagedListHolder = new PagedListHolder<Seller>(seller);
		pagedListHolder.setPage(pageNo);
		pagedListHolder.setPageSize(pageSize);
		int size = pagedListHolder.getPageCount();
		if (pageNo >= size)
			return Collections.emptyList();
		return pagedListHolder.getPageList();
	}

}
