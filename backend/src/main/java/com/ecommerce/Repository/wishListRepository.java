package com.ecommerce.Repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.ecommerce.Entity.User;
import com.ecommerce.Entity.WishList;
@Repository
public interface wishListRepository extends MongoRepository<WishList,String> {

	void deleteByUserIdAndProductId(String id, String productId);

	List<WishList> findByuserIdAndProductId(String id, String productid);
	

}
