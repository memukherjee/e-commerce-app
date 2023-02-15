package com.ecommerce.Repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.ecommerce.Entity.ProductReview;
import com.ecommerce.Entity.WishList;

@Repository
public interface ProductReviewRepository extends MongoRepository<ProductReview,String>{


	

	List<ProductReview> findAllByProductId(String productId);

}
