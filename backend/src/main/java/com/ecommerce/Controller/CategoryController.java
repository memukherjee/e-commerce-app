package com.ecommerce.Controller;

import java.io.IOException;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ecommerce.Entity.Category;
import com.ecommerce.Service.CategoryService;

@RestController
@RequestMapping("/api/category")
public class CategoryController {

    @Autowired
    CategoryService categoryservice;
    
    @PostMapping(value = "/addCategory" , consumes= { org.springframework.http.MediaType.APPLICATION_JSON_VALUE, org.springframework.http.MediaType.MULTIPART_FORM_DATA_VALUE })
    public ResponseEntity<Category> addCategory(@RequestPart String category, @RequestPart MultipartFile file) throws IOException
    {
    	Category categoryJson= categoryservice.getJson(category,file);
    	return new ResponseEntity<Category>(categoryJson,  new HttpHeaders(), HttpStatus.OK);
    }

    @GetMapping("/getAllCategory")
    public ResponseEntity<List<Category>> getAllCategories() {
    	List<Category> list = categoryservice.getAll();
    	return new ResponseEntity<List<Category>>(list, new HttpHeaders(), HttpStatus.OK);
    }

}