package com.ecommerce.Controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.Entity.ProductReview;
import com.ecommerce.Entity.User;
import com.ecommerce.Repository.ProductReviewRepository;
import com.ecommerce.Repository.UserRepository;
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
	@Autowired
	UserRepository userRepository;

	@PostMapping("/addReview")
	public ResponseEntity<?> review(@RequestBody ProductReviewDTO obj,
			@RequestHeader(value = "authorization", defaultValue = "") String auth) {
		User user = token.validate(auth);
		if (user == null)
			return new ResponseEntity<>("Invalid JWT token", HttpStatus.UNAUTHORIZED);
		System.out.println(user.getId() + " " + obj.getProductId() + " " + obj.getMessage() + " " + obj.getStar());
		ProductReview productReview = new ProductReview(user.getId(), obj.getProductId(), obj.getMessage(),
				obj.getStar());

		return new ResponseEntity<>(productReviewRepository.save(productReview), HttpStatus.OK);

	}

	@GetMapping("/getproductReview/{productId}")
	public ResponseEntity<?> productReview(@PathVariable String productId) {
		List<ProductReview> reviews = productReviewRepository.findAllByProductId(productId);
		List<ProductReviewDTO> li = new ArrayList<ProductReviewDTO>();
		for (int i = 0; i < reviews.size(); i++) {
			User user = userRepository.findAllByid(reviews.get(i).getUserId());
			ProductReviewDTO obj = new ProductReviewDTO(reviews.get(i).getId(), reviews.get(i).getProductId(),
					reviews.get(i).getMessage(), reviews.get(i).getStar(), user.getName(), user.getAvatar(),
					user.getId(), reviews.get(i).getDate(), reviews.get(i).getTime());
			li.add(obj);
		}

		return new ResponseEntity<>(li, HttpStatus.OK);
	}

	@GetMapping("/averageStar/{productId}")
	public float averageStar(@PathVariable String productId) {

		float star = 0;
		float count = 0;
		List<ProductReview> review = productReviewRepository.findAllByProductId(productId);
		for (ProductReview i : review) {
			star += i.getStar();
			count++;
		}
		if(star==0&&count==0)
			return 0;
		System.out.println(star+":"+count);
		averageStarDTO DTO = new averageStarDTO(star / count);
System.out.println("rating is:"+(star/count));
		return (star/count);
	}

}
