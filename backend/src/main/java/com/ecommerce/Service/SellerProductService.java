package com.ecommerce.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.ecommerce.Controller.CloudinaryController;
import com.ecommerce.Entity.Product;
import com.ecommerce.Repository.SellerProductRepository;
import com.ecommerce.Repository.UserProductRepository;

@Service
public class SellerProductService {

    @Autowired
    UserProductRepository repository;

    @Autowired
    SellerProductRepository repo;

    @Autowired
    CloudinaryController cloudinaryController;

    public ResponseEntity<String> deleteProduct(String product_id) {
        repository.deleteById(product_id);
        return new ResponseEntity<String>("Product Deleted", HttpStatus.OK);
    }

    public List<Product> getAllProduct(String id) {
        return repository.findBySellerId(id);

    }

    public ResponseEntity<Product> updateProduct(String id, Product product) {
        Product existingProduct = repository.findById(product.getProduct_id()).get();
        existingProduct.setProduct_name(product.getProduct_name());
        existingProduct.setProduct_category(product.getProduct_category());
        existingProduct.setProduct_description(product.getProduct_description());
        existingProduct.setSize(product.getSize());
        existingProduct.setProduct_company(product.getProduct_company());
        existingProduct.setProduct_price(product.getProduct_price());
        existingProduct.setProduct_discount(product.getProduct_discount());
        existingProduct.setDiscountPrice(product.getDiscountPrice());
        existingProduct.setProduct_quantity(product.getProduct_quantity());
        existingProduct.setProduct_imageUrl(product.getProduct_imageUrl());
        existingProduct.setClothingType(product.getClothingType());

        repository.save(existingProduct);
        return new ResponseEntity<Product>(product, new HttpHeaders(), HttpStatus.OK);
    }
}
