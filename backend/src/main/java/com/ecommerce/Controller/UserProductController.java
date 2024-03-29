
package com.ecommerce.Controller;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.support.PagedListHolder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.Assets.SearchQuery;
import com.ecommerce.Entity.Category;
import com.ecommerce.Entity.OrderDetails;
import com.ecommerce.Entity.Product;
import com.ecommerce.Entity.User;
import com.ecommerce.Entity.WishList;
import com.ecommerce.Repository.CategoryRepository;
import com.ecommerce.Repository.SellerOrderRepository;
import com.ecommerce.Repository.UserProductRepository;
import com.ecommerce.Repository.wishListRepository;
import com.ecommerce.Service.UserProductService;
import com.ecommerce.dto.ProductAverageRatingDTO;
import com.ecommerce.dto.wishlistDTO;
import com.ecommerce.jwt.TokenValidator;

@RestController
@RequestMapping("/api/products")
public class UserProductController {
	@Autowired
	UserProductService service;
	@Autowired
	UserProductRepository userProductRepository;
	@Autowired
	CategoryRepository categoryRepository;
	@Autowired
	TokenValidator token;
	@Autowired
	wishListRepository wishListRepository;

	@Autowired
	ProductReviewController productReviewController;

	@Autowired
	SellerOrderRepository sellerOrderRepository;

	wishlistDTO wishlistdto = null;

	/* Searching the product based on product id......................... */
	@GetMapping("/getProduct/{product_id}")
	public wishlistDTO getProduct(@PathVariable String product_id,
			@RequestHeader(value = "authorization", defaultValue = "") String auth) {
		boolean checkUserPurchased = false;
		User user = new User();
		if (!auth.isBlank()) {
			user = token.validate(auth);
		} else {
			Product pro = service.getProductById(product_id);
			float averageStar = productReviewController.averageStar(pro.getProduct_id());
			checkUserPurchased = checkUserPurchased(user, product_id);
			ProductAverageRatingDTO obj = new ProductAverageRatingDTO(pro.getProduct_id(), pro.getSeller_id(),
					pro.getProduct_name(), pro.getProduct_category(), pro.getProduct_description(), pro.getSize(),
					pro.getProduct_company(), pro.getProduct_price(), pro.getProduct_discount(), pro.getDiscountPrice(),
					pro.getProduct_quantity(), pro.getProduct_sold(), pro.getProduct_imageUrl(), averageStar,
					pro.getClothingType(), checkUserPurchased);

			return new wishlistDTO(obj, false);
		}

		List<WishList> wish = new ArrayList<WishList>();

		Product pro = service.getProductById(product_id);

		float averageStar = productReviewController.averageStar(pro.getProduct_id());
		checkUserPurchased = checkUserPurchased(user, product_id);
		ProductAverageRatingDTO obj = new ProductAverageRatingDTO(pro.getProduct_id(), pro.getSeller_id(),
				pro.getProduct_name(), pro.getProduct_category(), pro.getProduct_description(), pro.getSize(),
				pro.getProduct_company(), pro.getProduct_price(), pro.getProduct_discount(), pro.getDiscountPrice(),
				pro.getProduct_quantity(), pro.getProduct_sold(), pro.getProduct_imageUrl(), averageStar,
				pro.getClothingType(), checkUserPurchased);

		System.out.println(pro.discountPrice);

		if (user != null) {
			wish = wishListRepository.findByuserIdAndProductId(user.getId(), product_id);
			if (!wish.isEmpty()) {

				wishlistDTO wishlistDTO = new wishlistDTO(obj, true);
				return wishlistDTO;
			} else {
				wishlistDTO wishlistDTO = new wishlistDTO(obj, false);
				return wishlistDTO;
			}
		}
		return wishlistdto;

	}

	public boolean checkUserPurchased(User user, String productId) {

		int flag = 0;
		List<OrderDetails> orderUser = sellerOrderRepository.findByUserId(user.getEmail());

		for (int i = 0; i < orderUser.size(); i++) {
			if (!orderUser.get(i).getCartProductDTO().getProduct_id().equals(productId)) {
				orderUser.remove(i);
			}
		}

		for (OrderDetails i : orderUser) {
			if (i.getOrderStatus().equals("Delivered")) {
				flag = 1;
				break;
			}
		}
		if (flag == 1)
			return true;

		return false;

	}

	@GetMapping("/filterProducts")
	public ResponseEntity<?> getProductByFilter(@RequestParam(defaultValue = "", name = "query") String query,
			@RequestParam(defaultValue = "10000000", name = "maxPrice", required = false) String maxPrice,
			@RequestParam(defaultValue = "0", name = "minPrice", required = false) String minPrice,
			@RequestParam(name = "category", required = false) String product_category,
			@RequestParam(name = "clothingType", required = false) String clothingType,
			@RequestParam(defaultValue = "", name = "sort", required = false) String sort,
			@RequestParam(defaultValue = "0") Integer pageNo, @RequestParam(defaultValue = "5") Integer pageSize) {

		boolean checkUserPurchased = false;

		System.out.println("query: " + query);
		System.out.println("max: " + maxPrice);
		System.out.println("min: " + minPrice);
		System.out.println("category: " + product_category);
		System.out.println("sort: " + sort);
		System.out.println("clothingType:" + clothingType);
		List<Product> filteredProducts = new ArrayList<Product>();

		// Filtering Products by Min and Max Price
		if ((clothingType != null && !clothingType.equals("null"))
				&& (product_category == null || product_category.equals("null"))) {
			System.out.println(clothingType);
			for (String clothString : clothingType.split(",")) {

				filteredProducts.addAll(userProductRepository.filterProductsByClothingType(Double.parseDouble(maxPrice),
						Double.parseDouble(minPrice), clothString));
			}
		} else if ((clothingType != null && !clothingType.equals("null"))
				&& (product_category != null && !product_category.equals("null"))) {
			System.out.println(clothingType + ":" + product_category);
			List<Product> newCategory = new ArrayList<Product>();
			List<Product> newClothingType = new ArrayList<Product>();
			for (String category : product_category.split(",")) {
				newCategory.addAll(
						service.filterProducts(Double.parseDouble(maxPrice), Double.parseDouble(minPrice), category));
			}
			for (String clothString : clothingType.split(",")) {

				newClothingType.addAll(userProductRepository.filterProductsByClothingType(Double.parseDouble(maxPrice),
						Double.parseDouble(minPrice), clothString));
			}

			for (int i = 0; i < newCategory.size(); i++) {
				for (Product j : newClothingType) {
					if (newCategory.get(i).getProduct_id().equals(j.getProduct_id())) {
						filteredProducts.add(j);
					}
				}
			}

		}

		else if (product_category != null && !product_category.equals("null")) {
			System.out.println(product_category);
			for (String category : product_category.split(",")) {
				filteredProducts.addAll(
						service.filterProducts(Double.parseDouble(maxPrice), Double.parseDouble(minPrice), category));
			}
		}
		// Filtering Products by Min, Max Price and Category
		else {
			filteredProducts.addAll(service.filterProducts(Double.parseDouble(maxPrice), Double.parseDouble(minPrice)));
		}

		// Sorting Products by Price and Popularity
		if (sort.contains("price") && sort.contains("ascending")) {
			System.out.println("price a");
			Collections.sort(filteredProducts, new Comparator<Product>() {
				public int compare(Product p1, Product p2) {
					return Double.valueOf(p1.discountPrice).compareTo(p2.discountPrice);
				}
			});
		} else if (sort.contains("price") && sort.contains("descending")) {
			System.out.println("price d");
			Collections.sort(filteredProducts, new Comparator<Product>() {
				public int compare(Product p1, Product p2) {
					return Double.valueOf(p2.discountPrice).compareTo(p1.discountPrice);
				}
			});
		} else if (sort.contains("popularity") && sort.contains("ascending")) {
			System.out.println("popularity a");
			Collections.sort(filteredProducts, new Comparator<Product>() {
				public int compare(Product p1, Product p2) {
					return Integer.valueOf(p1.getProduct_sold()).compareTo(p2.getProduct_sold());
				}
			});
		} else if (sort.contains("popularity") && sort.contains("descending")) {
			System.out.println("popularity d");
			Collections.sort(filteredProducts, new Comparator<Product>() {
				public int compare(Product p1, Product p2) {
					return Integer.valueOf(p2.getProduct_sold()).compareTo(p1.getProduct_sold());
				}
			});
		}

		// Filtering products based on the search query
		if (query != null && !query.equals("")) {
			query = query.toLowerCase();
			String genderSpecificQuery = "";
			if (query.contains("female") || query.contains("woman") || query.contains("women") || query.contains("girl")
					|| query.contains("lady")) {
				genderSpecificQuery = "women";

			} else if (query.contains("male") || query.contains("man") || query.contains("men") || query.contains("boy")
					|| query.contains("guy")) {
				genderSpecificQuery = "men";
			} else if (query.contains("kid") || query.contains("child") || query.contains("baby")
					|| query.contains("infant")) {
				genderSpecificQuery = "kids";
			} else if (query.contains("unisex")) {
				genderSpecificQuery = "unisex";
			}

			String[] queryWords = query.split(" ");

			System.out.println("genderSpecificQuery: " + genderSpecificQuery);

			List<Product> newList = new ArrayList<Product>();
			for (Product product : filteredProducts) {
				Category category = categoryRepository.findById(product.getProduct_category()).get();
				for (String word : queryWords) {
					if (SearchQuery.ignoreWords.contains(word)) {
						continue;
					}
					if ((product.getProduct_name().toLowerCase().contains(word)
							|| product.getProduct_company().toLowerCase().contains(word)
							|| category.getCategory_name().toLowerCase().contains(word)) &&
							(genderSpecificQuery.equals("")
									|| product.getClothingType().equals(genderSpecificQuery))) {
						newList.add(product);
						break;
					}
				}
			}
			filteredProducts = newList;
		}

		List<ProductAverageRatingDTO> obj = new ArrayList<>();
		for (int i = 0; i < filteredProducts.size(); i++) {
			float averageStar = productReviewController.averageStar(filteredProducts.get(i).getProduct_id());
			ProductAverageRatingDTO ob = new ProductAverageRatingDTO(filteredProducts.get(i).getProduct_id(),
					filteredProducts.get(i).getSeller_id(), filteredProducts.get(i).getProduct_name(),
					filteredProducts.get(i).getProduct_category(), filteredProducts.get(i).getProduct_description(),
					filteredProducts.get(i).getSize(), filteredProducts.get(i).getProduct_company(),
					filteredProducts.get(i).getProduct_price(), filteredProducts.get(i).getProduct_discount(),
					filteredProducts.get(i).getDiscountPrice(), filteredProducts.get(i).getProduct_quantity(),
					filteredProducts.get(i).getProduct_sold(), filteredProducts.get(i).getProduct_imageUrl(),
					averageStar, filteredProducts.get(i).getClothingType(), checkUserPurchased);
			obj.add(ob);
		}

		// Pagination of Products
		PagedListHolder<ProductAverageRatingDTO> pagedListHolder = new PagedListHolder<ProductAverageRatingDTO>(obj);
		pagedListHolder.setPage(pageNo);
		pagedListHolder.setPageSize(pageSize);
		int size = pagedListHolder.getPageCount();
		System.out.println(size);
		if (pageNo >= size)
			return new ResponseEntity<>(new ArrayList<Product>(), HttpStatus.OK);

		return new ResponseEntity<>(pagedListHolder.getPageList(), HttpStatus.OK);

	}

}
