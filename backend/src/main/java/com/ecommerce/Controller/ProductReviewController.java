package com.ecommerce.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.Entity.ProductReview;
import com.ecommerce.Entity.User;
import com.ecommerce.Repository.ProductReviewRepository;
import com.ecommerce.dto.ProductReviewDTO;
import com.ecommerce.dto.averageStarDTO;
import com.ecommerce.jwt.TokenValidator;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/products")
public class ProductReviewController {
	
	@Autowired
	TokenValidator token;
	@Autowired
	ProductReviewRepository productReviewRepository;
	
	@PostMapping("/review")
	public ResponseEntity<?> review(@RequestBody ProductReviewDTO obj,@RequestHeader(value="authorization",defaultValue="")String auth){
		User user=token.validate(auth);
		if(user==null)
			return new ResponseEntity<>("Invalid JWT token",HttpStatus.UNAUTHORIZED);
		System.out.println(user.getId()+" "+ obj.getProductId()+" "+ obj.getMessage()+" "+obj.getStar());
		ProductReview productReview=new ProductReview(user.getId(), obj.getProductId(), obj.getMessage(),obj.getStar(),user.getName());
		
		
		return new ResponseEntity<>(productReviewRepository.save(productReview),HttpStatus.OK);
		
	}
	@PostMapping("/productReview")
	public ResponseEntity<?> productReview(@RequestBody ProductReviewDTO obj,@RequestHeader(value="authorization",defaultValue="")String auth){
		User user=token.validate(auth);
		if(user==null)
			return new ResponseEntity<>("Invalid JWT token",HttpStatus.UNAUTHORIZED);
		return new ResponseEntity<>(productReviewRepository.findAllByProductId(obj.getProductId()),HttpStatus.OK);
	}
	
	@GetMapping("/averageStar")
	public ResponseEntity<?> averageStar(@RequestBody ProductReviewDTO obj,@RequestHeader(value="authorization",defaultValue="")String auth){
		User user=token.validate(auth);
		if(user==null)
			return new ResponseEntity<>("Invalid JWT token",HttpStatus.UNAUTHORIZED);
		float star=0;
		int count=0;
		List<ProductReview> review = productReviewRepository.findAllByProductId(obj.getProductId());
		for(ProductReview i:review) {
			star+=i.getStar();
			count++;
		}
		averageStarDTO DTO=new averageStarDTO(star/count);
		
		return new ResponseEntity<>(DTO,HttpStatus.OK);
	}

}
