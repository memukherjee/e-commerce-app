package com.ecommerce.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.ecommerce.Entity.Product;
import com.ecommerce.Entity.ShoppingCart;
import com.ecommerce.Repository.SellerProductRepository;
import com.ecommerce.Repository.UserProductRepository;

@Service
public class SellerProductService {
	
	@Autowired
	UserProductRepository repository;

//	public Product addProduct(Product product)
//	{
//        return repository.save(product);
//	}
	
	public Product addToProduct(Product product) {
        return repository.save(product);
    }
	
	public String deleteProduct(String product_id) {
        repository.deleteById(product_id);
        return "Product Deleted";
    }

}
