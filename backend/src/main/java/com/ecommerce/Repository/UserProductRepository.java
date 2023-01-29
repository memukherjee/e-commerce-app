package com.ecommerce.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.ecommerce.Entity.Product;

@Repository
public interface UserProductRepository extends MongoRepository<Product, String> {


	List<Product> findAll();

    // Product findById(String product_id);
    Product save(List<Product> existingProduct);

    @Query("{product_category: ?0}")
    Page<Product> findByCategory(String product_category, Pageable paging);

    @Query("{product_name: ?0}")
    List<Product> getProductByName(String product_name);

//    @Query("{seller_id: ?0}")
//    Product getAllProduct(String seller_id);

    @Query("{seller_id: ?0}")
	List<Product> findBySellerId(String id);

}
