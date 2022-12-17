package com.ecommerce.Service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.ecommerce.Entity.Category;
import com.ecommerce.Entity.Product;
import com.ecommerce.Repository.CategoryRepository;

@Service
public class CategoryService {

    @Autowired
    CategoryRepository repo;

    public List<Category> getAll() {
        return repo.findAll();
    }

//	public Map<Category, String> addCategory(MultipartFile multipartFile,Category category) {
//		
//		return repo.save(multipartFile,category);
//	}

    public Category CategoryAdd(Category category) {
        return repo.save(category);
    }
}
