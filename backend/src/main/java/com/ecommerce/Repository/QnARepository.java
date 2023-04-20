package com.ecommerce.Repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.ecommerce.Entity.QnA;

@Repository
public interface QnARepository extends MongoRepository<QnA, String> {

	@Query("{productId:?0}")
	List<QnA> findByProductId(String productId);

}
