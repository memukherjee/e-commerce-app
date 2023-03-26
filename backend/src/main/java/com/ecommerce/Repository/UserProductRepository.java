package com.ecommerce.Repository;

import java.util.List;
import org.springframework.data.domain.Page;
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

    @Query("{seller_id: ?0}")
    List<Product> findBySellerId(String id);

    @Query("{'product_category': ?0}")
    List<Product> findByCategory(String product_category);

    @Query("{'_id': ?0}")
    List<Product> findByProductId(String productId);

    @Query("{'_id':?0}")
    Product findProduct(String pro);

    @Query("{discountPrice:{$lt:?0,$gt:?1}}")
    List<Product> filterProducts(double max, double min);

    @Query("{discountPrice:{$lt:?0,$gt:?1},product_category:?2}")
    List<Product> filterProducts(double parseDouble, double parseDouble2, String category);
    
    @Query("{discountPrice:{$lt:?0,$gt:?1},clothingType:?2}")
    List<Product> filterProductsByClothingType(double parseDouble, double parseDouble2, String clothingType);

}
