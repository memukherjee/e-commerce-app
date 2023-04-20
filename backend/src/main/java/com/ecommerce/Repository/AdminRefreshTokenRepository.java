package com.ecommerce.Repository;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.ecommerce.Entity.AdminRefreshToken;

public interface AdminRefreshTokenRepository extends MongoRepository<AdminRefreshToken, String> {
    void deleteByOwner_Id(ObjectId id);

    default void deleteByOwner_Id(String id) {
        deleteByOwner_Id(new ObjectId(id));
    };
}