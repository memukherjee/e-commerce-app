package com.ecommerce.Controller;

import java.io.IOException;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import com.ecommerce.Entity.Product;
import com.ecommerce.Entity.Seller;
import com.ecommerce.Repository.UserProductRepository;
import com.ecommerce.Service.SellerProductService;
import com.ecommerce.jwt.SellerTokenValidator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/api/seller")
public class SellerProductController {

	@Autowired
	private ObjectMapper mapper;
	@Autowired
	SellerTokenValidator token;
	@Autowired
	SellerProductService service;
	@Autowired
	UserProductRepository repo;
	@Autowired
	CloudinaryController cloudinaryController;

	@PostMapping(value = "/addProduct", consumes = { org.springframework.http.MediaType.APPLICATION_JSON_VALUE,
			org.springframework.http.MediaType.MULTIPART_FORM_DATA_VALUE })
	public ResponseEntity<?> productJson(@RequestParam("file") MultipartFile file,
			@RequestParam("productData") String productData,
			@RequestHeader(value = "authorization", defaultValue = "") String auth) throws Exception {

		Product product = null;
		Seller seller = token.validate(auth);
		if (seller == null)
			return new ResponseEntity<String>("Not verified", HttpStatus.UNAUTHORIZED);
		else {
			try {
				product = mapper.readValue(productData, Product.class);
			} catch (JsonProcessingException e) {
				return new ResponseEntity<String>("Invalid", HttpStatus.UNAUTHORIZED);
			}
			product.setSeller_id(seller.getId());
		}

		double productPrice = product.getProduct_price();
		double discountedRate = product.getDiscountPrice();
		product.setProduct_discount((productPrice - discountedRate) / productPrice * 100);
		Product productJson = new Product();
		try {
			ObjectMapper objectMapper = new ObjectMapper();
			String jsonString = objectMapper.writeValueAsString(productJson);
			System.out.println(jsonString);
		} catch (IOException err) {
			System.out.printf("Error", err.toString());
		}

		try {
			String image_url = cloudinaryController.upload(file);
			product.setProduct_imageUrl(image_url);
		} catch (Exception e) {
			return new ResponseEntity<String>("Image uploading Failed,Image size should be within 1MB",
					HttpStatus.BAD_REQUEST);
		}
		repo.save(product);
		return new ResponseEntity<Product>(product, new HttpHeaders(), HttpStatus.OK);
	}

	@DeleteMapping("/deleteProduct/{product_id}")
	public ResponseEntity<String> deleteProduct(@PathVariable String product_id,
			@RequestHeader(value = "authorization", defaultValue = "") String auth) throws Exception {
		Seller seller = token.validate(auth);
		if (seller == null)
			return new ResponseEntity<String>("Not verified", HttpStatus.UNAUTHORIZED);
		else
			return service.deleteProduct(product_id);

	}

	@GetMapping("/getAll")
	public List<Product> getProduct(@RequestHeader(value = "authorization", defaultValue = "") String auth)
			throws Exception {
		Seller seller = token.validate(auth);
		if (seller == null)
			return null;
		String id = seller.getId();
		return service.getAllProduct(id);

	}

	@PutMapping(value = "/updateProducts", consumes = { org.springframework.http.MediaType.APPLICATION_JSON_VALUE,
			org.springframework.http.MediaType.MULTIPART_FORM_DATA_VALUE })
	public ResponseEntity<?> updateCategory(@RequestParam("file") MultipartFile file,
			@RequestParam("productData") String productData,
			@RequestHeader(value = "authorization", defaultValue = "") String auth) throws Exception {
		Product product = null;
		Seller seller = token.validate(auth);
		if (seller == null)
			return new ResponseEntity<String>("Not verified", HttpStatus.UNAUTHORIZED);
		else {
			try {
				product = mapper.readValue(productData, Product.class);
			} catch (JsonProcessingException e) {
				return new ResponseEntity<String>("Invalid", HttpStatus.UNAUTHORIZED);
			}
			product.setSeller_id(seller.getId());
		}
		Product productJson = new Product();
		try {
			ObjectMapper objectMapper = new ObjectMapper();
			String jsonString = objectMapper.writeValueAsString(productJson);
			System.out.println(jsonString);
		} catch (IOException err) {
			System.out.printf("Error", err.toString());
		}
		String id = seller.getId();
		double productPrice = product.getProduct_price();
		double discountedRate = product.getDiscountPrice();
		product.setProduct_discount((productPrice - discountedRate) / productPrice * 100);

		try {
			String image_url = cloudinaryController.upload(file);
			product.setProduct_imageUrl(image_url);
		} catch (Exception e) {
			return new ResponseEntity<String>("Image uploading Failed,Image size should be within 1MB",
					HttpStatus.BAD_REQUEST);
		}
		return service.updateProduct(id, product);
	}
}
