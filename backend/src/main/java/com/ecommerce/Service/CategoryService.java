package com.ecommerce.Service;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.hibernate.validator.cfg.context.ReturnValueConstraintMappingContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.ecommerce.Controller.CloudinaryController;
import com.ecommerce.Entity.Category;
import com.ecommerce.Entity.Product;
import com.ecommerce.Repository.CategoryRepository;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class CategoryService {

    @Autowired
    CategoryRepository repo;
    @Autowired
    CloudinaryController cloudinaryController;

    public List<Category> getAll() {
        return repo.findAll();
    }

//	public Map<Category, String> addCategory(MultipartFile multipartFile,Category category) {
//		
//		return repo.save(multipartFile,category);
//	}

//    public Category CategoryAdd(Category category) {
//        return repo.save(category);
//    }
    
    public Category getJson(String category, MultipartFile file) throws IOException {
    	Category categoryJson= new Category(category, category, category);
    	try {
    		ObjectMapper objectMapper= new ObjectMapper();
    		categoryJson=objectMapper.readValue(category, Category.class);
    	} catch(IOException err)
    	{
    		System.out.printf("Error",err.toString());
    	}
    	String image_url=cloudinaryController.upload(file);
    	categoryJson.setCategory_image(image_url);
    	
    	return categoryJson;
    }
}
