package com.ecommerce.Controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ecommerce.Entity.OrderDetails;
import com.ecommerce.Entity.Product;
import com.ecommerce.Entity.RefreshToken;
import com.ecommerce.Entity.ShoppingCart;
import com.ecommerce.Entity.User;
import com.ecommerce.Entity.WishList;
import com.ecommerce.Entity.objholder;
import com.ecommerce.Repository.CartRepo;
import com.ecommerce.Repository.OrderRepo;
import com.ecommerce.Repository.RefreshTokenRepository;
import com.ecommerce.Repository.UserProductRepository;
import com.ecommerce.Repository.UserRepository;
import com.ecommerce.Repository.wishListRepository;
import com.ecommerce.Service.ContactMail;
import com.ecommerce.Service.UserService;
import com.ecommerce.Service.wishlistService;
import com.ecommerce.dto.LoginDTO;
import com.ecommerce.dto.SignupDTO;
import com.ecommerce.dto.TokenDTO;
import com.ecommerce.dto.UserStatsDTO;
import com.ecommerce.jwt.JwtHelper;
import com.ecommerce.jwt.TokenValidator;

@RestController

@RequestMapping("/api/auth")
public class AuthREST {

	String email; // forgotpass_link
	String otp;
	@Autowired
	AuthenticationManager authenticationManager;
	@Autowired
	RefreshTokenRepository refreshTokenRepository;
	@Autowired
	UserRepository userRepository;
	@Autowired
	JwtHelper jwtHelper;
	@Autowired
	PasswordEncoder passwordEncoder;
	@Autowired
	UserService userService;

	@Autowired
	TokenValidator token;

	@Autowired
	wishListRepository wishListRepository;

	@Autowired
	wishlistService wishlistService;
	WishList wishList;

	@Autowired
	UserProductRepository userProductRepository;

	@Autowired
	OrderRepo orderRepo;

	@Autowired
	CartRepo cartRepo;

	@PostMapping("/login")
	@Transactional
	public ResponseEntity<?> login(@Valid @RequestBody LoginDTO dto) {
		System.out.println(dto.getEmail() + " ---" + dto.getPassword());
		User logUser = userRepository.findByEmail(dto.getEmail());
		if (logUser == null) {
			return new ResponseEntity<>("Email not matched", HttpStatus.UNAUTHORIZED);
		}
		Authentication authentication;
		try {
			authentication = authenticationManager
					.authenticate(new UsernamePasswordAuthenticationToken(logUser.getUsername(), dto.getPassword()));
			SecurityContextHolder.getContext().setAuthentication(authentication);
		} catch (Exception e) {
			return new ResponseEntity<>("Password is incorrect", HttpStatus.UNAUTHORIZED);
		}
		User user = (User) authentication.getPrincipal();

		System.out.println("user=" + user);
		RefreshToken refreshToken = new RefreshToken();
		refreshToken.setOwner(user);
		refreshTokenRepository.save(refreshToken);

		String accessToken = jwtHelper.generateAccessToken(user);
		System.out.println("login--" + accessToken);
		String refreshTokenString = jwtHelper.generateRefreshToken(user, refreshToken);
		System.out.println("refreshToken=" + refreshTokenString);

		return ResponseEntity.ok(new TokenDTO(user.getId(), accessToken, refreshTokenString));
	}

	@PostMapping("signup")
	@Transactional
	public ResponseEntity<?> signup(@Valid @RequestBody SignupDTO dto) {
		System.out.println(dto.getName() + " ---" + dto.getEmail() + "---" + dto.getPassword());

		User check = userRepository.findByEmail(dto.getEmail());
		if (check != null)
			return new ResponseEntity<String>("Email id incorrect or already exist", HttpStatus.UNAUTHORIZED);

		User user = new User(dto.getName(), dto.getEmail(), passwordEncoder.encode(dto.getPassword()), dto.getMobile(),
				dto.getAddress(), false);
		userRepository.save(user);

		RefreshToken refreshToken = new RefreshToken();
		refreshToken.setOwner(user);
		refreshTokenRepository.save(refreshToken);

		String accessToken = jwtHelper.generateAccessToken(user);
		System.out.println("access token=" + accessToken);
		String refreshTokenString = jwtHelper.generateRefreshToken(user, refreshToken);

		return ResponseEntity.ok(new TokenDTO(user.getId(), accessToken, refreshTokenString));
	}

	@PostMapping("logout")
	public ResponseEntity<?> logout(@RequestBody TokenDTO dto) {
		String refreshTokenString = dto.getRefreshToken();
		System.out.println(refreshTokenString);
		if (jwtHelper.validateRefreshToken(refreshTokenString)
				&& refreshTokenRepository.existsById(jwtHelper.getTokenIdFromRefreshToken(refreshTokenString))) {
			// valid and exists in db
			refreshTokenRepository.deleteById(jwtHelper.getTokenIdFromRefreshToken(refreshTokenString));
			return ResponseEntity.ok().build();
		}

		throw new BadCredentialsException("invalid token");
	}

	@PostMapping("logout-all")
	public ResponseEntity<?> logoutAll(@RequestBody TokenDTO dto) {
		String refreshTokenString = dto.getRefreshToken();
		if (jwtHelper.validateRefreshToken(refreshTokenString)
				&& refreshTokenRepository.existsById(jwtHelper.getTokenIdFromRefreshToken(refreshTokenString))) {
			// valid and exists in db

			refreshTokenRepository.deleteByOwner_Id(jwtHelper.getUserIdFromRefreshToken(refreshTokenString));
			return ResponseEntity.ok().build();
		}

		throw new BadCredentialsException("invalid token");
	}

	@PostMapping("access-token")
	public ResponseEntity<?> accessToken(@RequestBody TokenDTO dto) {
		String refreshTokenString = dto.getRefreshToken();
		if (jwtHelper.validateRefreshToken(refreshTokenString)
				&& refreshTokenRepository.existsById(jwtHelper.getTokenIdFromRefreshToken(refreshTokenString))) {
			// valid and exists in db

			User user = userService.findById(jwtHelper.getUserIdFromRefreshToken(refreshTokenString));
			String accessToken = jwtHelper.generateAccessToken(user);

			return ResponseEntity.ok(new TokenDTO(user.getId(), accessToken, refreshTokenString));
		}

		throw new BadCredentialsException("invalid token");
	}

	@PostMapping("refresh-token")
	public ResponseEntity<?> refreshToken(@RequestBody TokenDTO dto) {
		String refreshTokenString = dto.getRefreshToken();
		if (jwtHelper.validateRefreshToken(refreshTokenString)
				&& refreshTokenRepository.existsById(jwtHelper.getTokenIdFromRefreshToken(refreshTokenString))) {
			// valid and exists in db

			refreshTokenRepository.deleteById(jwtHelper.getTokenIdFromRefreshToken(refreshTokenString));

			User user = userService.findById(jwtHelper.getUserIdFromRefreshToken(refreshTokenString));

			RefreshToken refreshToken = new RefreshToken();
			refreshToken.setOwner(user);
			refreshTokenRepository.save(refreshToken);

			String accessToken = jwtHelper.generateAccessToken(user);
			String newRefreshTokenString = jwtHelper.generateRefreshToken(user, refreshToken);

			return ResponseEntity.ok(new TokenDTO(user.getId(), accessToken, newRefreshTokenString));
		}

		throw new BadCredentialsException("invalid token");
	}

	@GetMapping("/getUserDetailsByJWT")
	public ResponseEntity<?> getUserDetailsByJWT(@RequestHeader(value = "authorization", defaultValue = "") String auth)
			throws Exception {

		System.out.println("getUserDetailsByJWT");
		User user = token.validate(auth);
		if (user == null)
			return new ResponseEntity<>("Not verified", HttpStatus.UNAUTHORIZED);
		else
			return new ResponseEntity<>(user, HttpStatus.OK);
	}

	@GetMapping("/search/{query}")
	public ResponseEntity<Object> search(@PathVariable("query") String query) {
		System.out.println(query);
		return new ResponseEntity<Object>(userRepository.findByNameContainingIgnoreCase(query), HttpStatus.OK);

	}

	// ************************** Forgot password module **************

	@PostMapping("/forgotpass")
	public ResponseEntity<String> ForgotPass(@RequestBody objholder str) {
		this.email = str.email;
		System.out.println("forgotpass controller email=" + str.email);
		ResponseEntity<String> user = userService.findByEmail(str.email);

		return user;

	}

	@PostMapping("/otp")
	public ResponseEntity<Object> otp(@RequestBody objholder str) {

		this.otp = str.otp;

		return userService.otpservice(str.otp);

	}

	@PostMapping("/reset")
	public ResponseEntity<String> reset(@RequestBody objholder str) {
		System.out.println("reset speaking");
		System.out.println(str.password);
		// System.out.println(email);
		if (email != null && otp != null && otp.equals(userService.random)) {
			return userService.findByEmailreset(email, str.password);
		} else {
			return new ResponseEntity<>("invalid", HttpStatus.NOT_FOUND);
		}

	}

	// ********************************** CONTACT *******************************

	@PostMapping("/contact")
	public ResponseEntity<String> contact(@RequestBody objholder str) {
		System.out.println("contact speaking");
		System.out.println(str.name);
		System.out.println(str.email);
		System.out.println(str.msg);
		return ContactMail.king(str.name, str.email, str.msg);

	}

	// ************************** NEWSLETTER ***********************************

	@PostMapping("/newsletter")
	public ResponseEntity<String> newsletter(@RequestBody Map<String, Boolean> reqBody,
			@RequestHeader(value = "authorization", defaultValue = "") String auth) {
		User user = token.validate(auth);
		if (user == null)
			return new ResponseEntity<>("Not verified", HttpStatus.UNAUTHORIZED);
		user.setIsSubscribedtoNewsLetter(reqBody.get("isSubscribed"));
		userRepository.save(user);
		return new ResponseEntity<>("success", HttpStatus.OK);
	}

	// ************************PROFILE*************************************

	@PostMapping("/profile")
	public ResponseEntity<Object> profile(@RequestBody objholder str,
			@RequestHeader(value = "authorization", defaultValue = "") String auth) {
		return userService.profile(str, auth);
	}

	@PostMapping("/avatar")
	public ResponseEntity<?> avatar(@RequestParam(value = "file", required = false) MultipartFile file,
			@RequestHeader(value = "authorization", defaultValue = "") String auth) throws IOException {
		System.out.println(file);
		return userService.avatar(file, auth);

	}

	// ***********************WISHLIST*************************************

	@PostMapping("/addwishlist")
	public ResponseEntity<?> addwishList(@RequestBody objholder str,
			@RequestHeader(value = "authorization", defaultValue = "") String auth) {
		System.out.println("hi");
		User user = token.validate(auth);
		if (user == null)
			return new ResponseEntity<>("Invalid JWT token", HttpStatus.UNAUTHORIZED);
		System.out.println("hi");
		return wishlistService.add(user.getId(), str.productId);

	}

	@PostMapping("/deletewishlist")
	public ResponseEntity<?> deletewishList(@RequestBody objholder str,
			@RequestHeader(value = "authorization", defaultValue = "") String auth) {
		System.out.println("hi");
		User user = token.validate(auth);
		if (user == null)
			return new ResponseEntity<>("Invalid JWT token", HttpStatus.UNAUTHORIZED);
		System.out.println("hi");
		return wishlistService.delete(user.getId(), str.productId);

	}

	@GetMapping("/getUserWishListByJWT")
	public ResponseEntity<?> getUserWishListByJWT(
			@RequestHeader(value = "authorization", defaultValue = "") String auth) {
		User user = token.validate(auth);
		if (user == null)
			return new ResponseEntity<>("Invalid JWT token", HttpStatus.UNAUTHORIZED);
		List<WishList> wishlist = wishListRepository.findProductIdByuserId(user.getId());
		List<Product> product = new ArrayList<>();
		for (int i = 0; i < wishlist.size(); i++) {
			for (int j = i + 1; j < wishlist.size(); j++) {
				if (wishlist.get(i).getProductId().equals(wishlist.get(j).getProductId())) {
					wishlist.remove(j);
				}
			}
		}
		for (int i = 0; i < wishlist.size(); i++) {
			product.addAll(userProductRepository.findByProductId(wishlist.get(i).getProductId()));
		}

		return new ResponseEntity<>(product, HttpStatus.OK);

	}

	// ********************STATISTICAL DATA OF USER********************
	@PostMapping("/userStats")
	public ResponseEntity<?> stats(@RequestHeader(value = "authorization", defaultValue = "") String auth) {
		User user = token.validate(auth);
		if (user == null)
			return new ResponseEntity<>("Invalid JWT token", HttpStatus.UNAUTHORIZED);

		ArrayList<OrderDetails> totalOrder = orderRepo.findAllOrder(user.getEmail());
		int orderCount = 0;
		for (OrderDetails order : totalOrder) {
			if (!order.getOrderStatus().equals("Cancelled") &&
					!order.getOrderStatus().equals("Returned") &&
					!order.getOrderStatus().equals("Cancelled by Seller") &&
					!order.getOrderStatus().equals("Delivered")) {
				orderCount++;
			}
		}
		UserStatsDTO obj = new UserStatsDTO();
		obj.setTotalOrder(orderCount);

		ArrayList<ShoppingCart> totalCart = cartRepo.findByuser_id(user.getEmail());
		int totalQuantity = 0;
		for (ShoppingCart cart : totalCart) {
			totalQuantity += cart.getCart_quantity();
		}
		obj.setTotalCartItems(totalQuantity);

		List<WishList> totalWishList = wishListRepository.findProductIdByuserId(user.getId());
		obj.setTotalWishListItems(totalWishList.size());

		return new ResponseEntity<>(obj, HttpStatus.OK);

	}

	@GetMapping("/getUserDetailsById/{userId}")
	public ResponseEntity<?> details(@PathVariable String userId) {
		return new ResponseEntity<>(userRepository.findByUserId(userId), HttpStatus.OK);

	}

}
