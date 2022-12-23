package com.ecommerce.Repository;

import java.util.List;
import java.util.Map;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.multipart.MultipartFile;

import com.ecommerce.Entity.Category;
import com.ecommerce.Entity.Product;

@Repository
public interface CategoryRepository extends MongoRepository<Category, String> {

    List<Category> findAll();


    // Map<Category, String> save(MultipartFile multipartFile, Category category);

}
