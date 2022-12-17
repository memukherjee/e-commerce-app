package com.ecommerce.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.ecommerce.Entity.Product;
import com.ecommerce.Repository.UserProductRepository;

@Service
public class UserProductService {

    @Autowired
    UserProductRepository repository;

    public List<Product> getAllProduct(Integer pageNo, Integer pageSize) {
        Pageable paging = PageRequest.of(pageNo, pageSize);
        Page<Product> P = repository.findAll(paging);

        if (P.hasContent()) {
            return P.getContent();
        } else {
            return new ArrayList<Product>();
        }
    }

    public List<Product> getProductByCategory(String product_category, Integer pageNo, Integer pageSize) {
        Pageable paging = PageRequest.of(pageNo, pageSize);
        Page<Product> P = repository.findByCategory(product_category, paging);
        if (P.hasContent()) {
            return P.getContent();
        } else {
            return new ArrayList<Product>();
        }
    }

    public Product getProductById(String product_id) {
        return repository.findById(product_id).get();
    }

    public List<Product> findTrending() {
        PageRequest thirdPageRequest = PageRequest.of(0, 6, Sort.Direction.DESC, "product_sold");
        return (List<Product>) repository.findAll(thirdPageRequest).getContent();
    }

    public List<Product> getProductByName(String product_name) {
        return repository.getProductByName(product_name);

    }

}
