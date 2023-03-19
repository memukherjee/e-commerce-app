package com.ecommerce.Controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.apache.http.protocol.HTTP;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.support.PagedListHolder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.Entity.Product;
import com.ecommerce.Repository.UserProductRepository;
import com.ecommerce.dto.ProductReviewDTO;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/products")
public class SimilarProductController {

	@Autowired
	UserProductRepository userProductRepository;
	
	@GetMapping("/similarProduct")
	public ResponseEntity<?> similarProduct(@RequestParam("productId") String proId,@RequestParam("pageNo") int pageNo,@RequestParam("pageSize") int pageSize){
		Product product = userProductRepository.findProduct(proId);
		String catId=product.getProduct_category();
		List<Product> category = userProductRepository.findByCategory(catId);
		for(int i=0;i<category.size();i++) {
			if(category.get(i).getProduct_id().equals(proId))
				category.remove(i);
		}
		PagedListHolder<Product> pagedListHolder=new PagedListHolder<Product>(category);
    	pagedListHolder.setPage(pageNo);
    	pagedListHolder.setPageSize(pageSize);
    	int size=pagedListHolder.getPageCount();
    	System.out.println(size);
    	ArrayList<Product> leo=new ArrayList<>(); 
    	if(pageNo>=size)
    		return new ResponseEntity<>(leo,HttpStatus.OK);
    	
    	
    		return new ResponseEntity<>(pagedListHolder.getPageList(),HttpStatus.OK);
		
		}
	
}
