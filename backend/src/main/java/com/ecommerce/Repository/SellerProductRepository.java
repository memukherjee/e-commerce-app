package com.ecommerce.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.ecommerce.Entity.Product;
import com.ecommerce.Entity.Seller;

@Repository
public interface SellerProductRepository extends MongoRepository<Seller, String> {
	Product save(Product product);
}
