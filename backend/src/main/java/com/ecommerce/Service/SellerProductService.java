package com.ecommerce.Service;

import java.util.List;
import java.util.Optional;

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
	
	@Autowired
	SellerProductRepository repo;
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

	public List<Product> getAllProduct(String id) {
	      return repository.findBySellerId(id);
	       
	    }

	public Product updateProduct(String id,Product product) {
		Product existingProduct = repository.findById(product.getProduct_id()).get();
         existingProduct.setProduct_name(product.getProduct_name());
        existingProduct.setProduct_category(product.getProduct_category());
        existingProduct.setProduct_description(product.getProduct_description());
         existingProduct.setProduct_company(product.getProduct_company());
         existingProduct.setProduct_price(product.getProduct_price());
       existingProduct.setProduct_discount(product.getProduct_discount());
        existingProduct.setProduct_quantity(product.getProduct_quantity());
         existingProduct.setProduct_imageUrl(product.getProduct_imageUrl());

        return  repository.save(existingProduct);
	}
	}


