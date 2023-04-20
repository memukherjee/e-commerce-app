package com.ecommerce.Repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.ecommerce.Entity.Category;

@Repository
public interface CategoryRepository extends MongoRepository<Category, String> {
    List<Category> findAll();
}
