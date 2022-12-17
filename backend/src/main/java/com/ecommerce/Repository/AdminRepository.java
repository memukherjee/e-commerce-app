package com.ecommerce.Repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.ecommerce.Entity.Product;

@Repository
public interface AdminRepository extends MongoRepository<Product, String> {
    List<Product> findAll();
}
