package com.ecommerce.Controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ecommerce.Entity.Category;
import com.ecommerce.Entity.Product;
import com.ecommerce.Service.CategoryService;
import com.ecommerce.Service.CloudinaryService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/category")
public class CategoryController {

    @Autowired
    CategoryService categoryservice;

//	@PostMapping("/addCategory")
//	 public ResponseEntity<Category> Categoryadd(@RequestBody MultipartFile image,@RequestBody String category) throws IOException{
//		String image_url=cloudinaryController.upload(image);
//		return new ResponseEntity<>(categoryservice.CategoryAdd(new Category(category,image_url)),HttpStatus.OK);
//	}

//		Map<Category, String> s=categoryservice.addCategory(multipartFile,category);
//		return new ResponseEntity<Map<Category,String>>(new HttpHeaders(),HttpStatus.OK);
//		}

    @PostMapping("/addCategory")
    public Category addCategory(@RequestBody Category category) {
        return categoryservice.CategoryAdd(category);
    }

    @GetMapping("/getAllCategory")
    public List<Category> getAllCategories() {
        return categoryservice.getAll();
    }

}
