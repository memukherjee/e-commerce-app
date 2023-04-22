package com.ecommerce.Controller;

import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
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
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.Entity.Admin;
import com.ecommerce.Entity.AdminRefreshToken;
import com.ecommerce.Entity.Seller;
import com.ecommerce.Entity.User;
import com.ecommerce.Entity.objholder;
import com.ecommerce.Repository.AdminAuthRepository;
import com.ecommerce.Repository.AdminRefreshTokenRepository;
import com.ecommerce.Repository.SellerRepository;
import com.ecommerce.Repository.UserRepository;
import com.ecommerce.Service.AdminAuthService;
import com.ecommerce.Service.AdminService;
import com.ecommerce.Service.UserService;
import com.ecommerce.dto.AdminStatsDTO;
import com.ecommerce.dto.LoginDTO;
import com.ecommerce.dto.SignupDTO;
import com.ecommerce.dto.TokenDTO;
import com.ecommerce.jwt.AdminTokenValidator;
import com.ecommerce.jwt.JwtHelper;

@RestController
@RequestMapping("/api/admin/auth")
public class AdminAuthREST {

	@Autowired
	AuthenticationManager authenticationManager;
	@Autowired
	JwtHelper jwtHelper;
	@Autowired
	PasswordEncoder passwordEncoder;

	@Autowired
	AdminAuthRepository adminAuthRepository;
	@Autowired
	AdminRefreshTokenRepository adminRefreshTokenRepository;

	@Autowired
	AdminTokenValidator token;

	@Autowired
	AdminAuthService adminAuthService;
	@Autowired
	SellerRepository sellerRepository;
	@Autowired
	UserRepository userRepository;

	@Autowired
	UserService userService;
	@Autowired
	AdminService adminService;

	@PostMapping("/login")
	public ResponseEntity<?> login(@Valid @RequestBody LoginDTO dto) {
		System.out.println("admin login-email-" + dto.getEmail() + " password-" + dto.getPassword());
		Admin logAdmin = adminAuthRepository.findByEmail(dto.getEmail());
		if (logAdmin == null) {
			return new ResponseEntity<String>("Email not matched", HttpStatus.UNAUTHORIZED);
		}

		System.out.println("hi admin " + logAdmin.getUsername());
		Authentication authentication;
		try {
			authentication = authenticationManager
					.authenticate(new UsernamePasswordAuthenticationToken(logAdmin.getUsername(), dto.getPassword()));
			SecurityContextHolder.getContext().setAuthentication(authentication);
		} catch (Exception e) {
			return new ResponseEntity<String>("Password is incorrect", HttpStatus.UNAUTHORIZED);
		}
		Admin admin = (Admin) authentication.getPrincipal();

		System.out.println("admin=" + admin);
		AdminRefreshToken adminRefreshToken = new AdminRefreshToken();
		adminRefreshToken.setOwner(admin);
		adminRefreshTokenRepository.save(adminRefreshToken);

		String accessToken = jwtHelper.generateAccessToken(admin);
		System.out.println("login--" + accessToken);
		String refreshTokenString = jwtHelper.generateRefreshToken(admin, adminRefreshToken);
		System.out.println("refreshToken=" + refreshTokenString);

		return ResponseEntity.ok(new TokenDTO(admin.getId(), accessToken, refreshTokenString));
	}

	@PostMapping("signup")
	@Transactional
	public ResponseEntity<?> signup(@Valid @RequestBody SignupDTO dto) {
		System.out.println(dto.getName() + " ---" + dto.getEmail() + "---" + dto.getPassword());

		Admin check = adminAuthRepository.findByEmail(dto.getEmail());
		if (check != null)
			return new ResponseEntity<String>("Email id incorrect or already exist", HttpStatus.UNAUTHORIZED);

		Admin admin = new Admin(dto.getName(), dto.getEmail(), passwordEncoder.encode(dto.getPassword()),
				dto.getMobile(), dto.getAddress());
		adminAuthRepository.save(admin);

		return new ResponseEntity<>("Your account is created but yet to be verified by Elegant Apparels.",
				HttpStatus.OK);
	}

	@PostMapping("logout")
	public ResponseEntity<?> logout(@RequestBody TokenDTO dto) {
		String refreshTokenString = dto.getRefreshToken();
		System.out.println(refreshTokenString);
		if (jwtHelper.validateRefreshToken(refreshTokenString)
				&& adminRefreshTokenRepository.existsById(jwtHelper.getTokenIdFromRefreshToken(refreshTokenString))) {
			// valid and exists in db
			adminRefreshTokenRepository.deleteById(jwtHelper.getTokenIdFromRefreshToken(refreshTokenString));
			return ResponseEntity.ok().build();
		}

		throw new BadCredentialsException("invalid token");
	}

	@GetMapping("/getAdminDetailsByJWT")
	public ResponseEntity<?> getUserDetailsByJWT(@RequestHeader(value = "authorization", defaultValue = "") String auth)
			throws Exception {

		System.out.println("getUserDetailsByJWT");
		Admin admin = token.validate(auth);
		if (admin == null)
			return new ResponseEntity<String>("Not verified", HttpStatus.UNAUTHORIZED);
		else
			return new ResponseEntity<Admin>(admin, HttpStatus.OK);
	}

	@GetMapping("/getAllUser/{pageNo}/{pageSize}")
	public ResponseEntity<?> getUser(@PathVariable Integer pageNo, @PathVariable Integer pageSize) {
		Page<User> list = adminAuthService.getUser(pageNo, pageSize);
		return new ResponseEntity<>(list.getContent(), HttpStatus.OK);
	}

	@GetMapping("/getAllSeller/{pageNo}/{pageSize}")
	public ResponseEntity<?> getSeller(@PathVariable Integer pageNo, @PathVariable Integer pageSize) {
		List<Seller> list = adminAuthService.getSeller(pageNo, pageSize);
		return new ResponseEntity<>(list, HttpStatus.OK);
	}
	@GetMapping("/getAllSellerRequests/{pageNo}/{pageSize}")
	public ResponseEntity<?> getSellerRequests(@PathVariable Integer pageNo, @PathVariable Integer pageSize) {
		List<Seller> list = adminAuthService.getSellerRequests(pageNo, pageSize);
		return new ResponseEntity<>(list, HttpStatus.OK);
	}

	@PostMapping("/validateSeller")
	public ResponseEntity<?> verify(@RequestBody objholder obj,
			@RequestHeader(value = "authorization", defaultValue = "") String auth) {
		Admin admin = token.validate(auth);
		if (admin == null)
			return new ResponseEntity<>("INVALID TOKEN", HttpStatus.NOT_FOUND);

		String sid = obj.id;
		System.out.println(sid);
		Seller seller = sellerRepository.findAllByid(sid);
		if (seller == null)
			return new ResponseEntity<>("Seller ID Invalid", HttpStatus.NOT_FOUND);

		seller.setAccountStatus(true);
		sellerRepository.save(seller);
		return new ResponseEntity<>("Seller account verified", HttpStatus.OK);

	}

	@PostMapping("/deleteUser")
	public ResponseEntity<?> deleteUser(@RequestBody objholder obj,
			@RequestHeader(value = "authorization", defaultValue = "") String auth) {
		Admin admin = token.validate(auth);
		if (admin == null)
			return new ResponseEntity<>("INVALID TOKEN", HttpStatus.NOT_FOUND);

		String sid = obj.id;
		System.out.println(sid);
		User user = userRepository.findAllByid(sid);
		if (user == null)
			return new ResponseEntity<>("User ID Invalid", HttpStatus.NOT_FOUND);

		userRepository.delete(user);
		return new ResponseEntity<>("User Removed", HttpStatus.OK);

	}

	@PostMapping("/deleteSeller")
	public ResponseEntity<?> deleteSeller(@RequestBody objholder obj,
			@RequestHeader(value = "authorization", defaultValue = "") String auth) {
		Admin admin = token.validate(auth);
		if (admin == null)
			return new ResponseEntity<>("INVALID TOKEN", HttpStatus.NOT_FOUND);

		String sid = obj.id;
		System.out.println(sid);
		Seller seller = sellerRepository.findAllByid(sid);
		if (seller == null)
			return new ResponseEntity<>("User ID Invalid", HttpStatus.NOT_FOUND);

		sellerRepository.delete(seller);
		return new ResponseEntity<>("Seller Removed", HttpStatus.OK);

	}

	@GetMapping("/adminStats")
	public ResponseEntity<?> stats(@RequestHeader(value = "authorization", defaultValue = "") String auth) {
		Admin admin = token.validate(auth);
		if (admin == null)
			return new ResponseEntity<>("INVALID TOKEN", HttpStatus.NOT_FOUND);
		AdminStatsDTO obj = new AdminStatsDTO();
		obj.setTotalUser(userRepository.findAll().size());
		int count = 0;
		int verifiedSellerCount = 0;
		List<Seller> seller = sellerRepository.findAll();
		for (Seller i : seller) {
			if (i.getAccountStatus() == false)
				count++;
			else {
				verifiedSellerCount++;
			}
		}
		obj.setTotalSeller(verifiedSellerCount);
		obj.setTotalPendingReq(count);
		return new ResponseEntity<>(obj, HttpStatus.OK);
	}

	@PostMapping("/adminMail")
	public ResponseEntity<?> mail(@RequestHeader(value = "authorization", defaultValue = "") String auth,
			@RequestBody Map<String, String> requestBody) {
		System.out.println("admin mail entered...");
		Admin admin = token.validate(auth);
		if (admin == null)
			return new ResponseEntity<>("INVALID TOKEN", HttpStatus.NOT_FOUND);

		System.out.println(requestBody.get("to"));
		System.out.println(requestBody.get("subject"));
		System.out.println(requestBody.get("message"));

		adminService.adminMail(requestBody.get("to"), requestBody.get("subject"), requestBody.get("message"));
		return new ResponseEntity<>("email sent", HttpStatus.OK);

	}

	@PostMapping("/newsletter")
	public ResponseEntity<?> newsletter(@RequestHeader(value = "authorization", defaultValue = "") String auth,
			@RequestBody Map<String, String> requestBody) {
		Admin admin = token.validate(auth);
		if (admin == null)
			return new ResponseEntity<>("INVALID TOKEN", HttpStatus.UNAUTHORIZED);

		System.out.println(requestBody.get("subject"));
		System.out.println(requestBody.get("message"));

		adminService.newsletter(requestBody.get("subject"), requestBody.get("message"));
		return new ResponseEntity<>("email sent", HttpStatus.OK);

	}

}
