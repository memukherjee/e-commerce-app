package com.ecommerce.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.boot.autoconfigure.data.web.SpringDataWebProperties.Sort;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.web.multipart.MultipartFile;

import com.ecommerce.Entity.Product;
import com.ecommerce.Entity.User;

@Repository
public interface UserProductRepository extends MongoRepository<Product, String> {

  
	List<Product> findAll();

    // Product findById(String product_id);
    Product save(List<Product> existingProduct);

    @Query("{product_category: ?0}")
    Page<Product> findByCategory(String product_category, Pageable paging);

    @Query("{product_name: ?0}")
    List<Product> getProductByName(String product_name);

    @Query("{seller_id: ?0}")
	List<Product> findBySellerId(String id);
    
    @Query("{'product_category': ?0}")
	List<Product> findByCategory(String product_category);
    
    @Query("{discountPrice:{$lt:?0,$gt:?1}}")
    List<Product> getProductByMaxMin(double max,double min);

    @Query("{'_id': ?0}")
	List<Product> findByProductId(String productId);

    @Query("{discountPrice:{$lt:?0,$gt:?1},product_category:?2}")
	List<Product> getProductByMaxMinAndCategory(double parseDouble, double parseDouble2, String category);

   
	

   
    
}
