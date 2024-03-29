package com.ecommerce.Repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.ecommerce.Entity.Admin;

public interface AdminAuthRepository extends MongoRepository<Admin, String> {
	<S extends Admin> S save(S admindata);

	Admin findAllByid(String id);

	Admin findByEmail(String email);

	Optional<Admin> findByUsername(String username);

}