package com.ecommerce.Repository;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.ecommerce.Entity.RefreshToken;
import com.ecommerce.Entity.SellerRefreshToken;

public interface SellerRefreshTokenRepository extends MongoRepository<SellerRefreshToken, String> {
    void deleteByOwner_Id(ObjectId id);
    default void deleteByOwner_Id(String id) {
        deleteByOwner_Id(new ObjectId(id));
    };
}