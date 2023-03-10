package com.ecommerce.Controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;

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
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ecommerce.Entity.Product;
import com.ecommerce.Entity.RefreshToken;
import com.ecommerce.Entity.Seller;
import com.ecommerce.Entity.SellerRefreshToken;
import com.ecommerce.Entity.User;
import com.ecommerce.Entity.objholder;
import com.ecommerce.Repository.SellerRefreshTokenRepository;
import com.ecommerce.Repository.SellerRepository;
import com.ecommerce.Repository.UserProductRepository;
import com.ecommerce.Service.SellerService;
import com.ecommerce.dto.LoginDTO;
import com.ecommerce.dto.SellerStatsDTO;
import com.ecommerce.dto.SignupDTO;
import com.ecommerce.dto.TokenDTO;
import com.ecommerce.jwt.JwtHelper;
import com.ecommerce.jwt.SellerTokenValidator;
import com.ecommerce.jwt.TokenValidator;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/seller/auth")
public class SellerAuthREST {
	
	String email; // forgotpass_link
	String otp;
    @Autowired
    AuthenticationManager authenticationManager;
   
   
    @Autowired
    JwtHelper jwtHelper;
    @Autowired
    PasswordEncoder passwordEncoder;
    
    @Autowired
    SellerRepository sellerRepository;
    @Autowired
    SellerRefreshTokenRepository sellerRefreshTokenRepository;
    
    @Autowired
	SellerTokenValidator token;
    
    @Autowired
    SellerService sellerService;
    
    @Autowired
    UserProductRepository userProductRepository;
   
    
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginDTO dto){
    	System.out.println("seller login-email-"+dto.getEmail()+" password-"+dto.getPassword());
    	Seller logSeller=sellerRepository.findByEmail(dto.getEmail());
    	if(logSeller==null) {
    		return new ResponseEntity("email not matched",HttpStatus.UNAUTHORIZED);
    	}
    	if(logSeller.getAccountStatus()==false) {
    		return new ResponseEntity("Your account is yet to be verified by Elegant Apparels.",HttpStatus.NOT_FOUND);
    	}
    	System.out.println("hi seller"+logSeller.getUsername());
    	Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(logSeller.getUsername(), dto.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        Seller seller = (Seller) authentication.getPrincipal();
        
        System.out.println("seller="+seller);
        SellerRefreshToken sellerRefreshToken = new SellerRefreshToken();
        sellerRefreshToken.setOwner(seller);
        sellerRefreshTokenRepository.save(sellerRefreshToken);
        
        String accessToken = jwtHelper.generateAccessToken(seller);
        System.out.println("login--"+accessToken);
        String refreshTokenString = jwtHelper.generateRefreshToken(seller, sellerRefreshToken);
        System.out.println("refreshToken="+refreshTokenString);

        return ResponseEntity.ok(new TokenDTO(seller.getId(),accessToken,refreshTokenString));
    	
    }
    
    @PostMapping("signup")
    @Transactional
    public ResponseEntity<?> signup(@Valid @RequestBody SignupDTO dto) {
    	System.out.println(dto.getName()+" ---"+dto.getEmail()+"---"+dto.getPassword());
    	
    	Seller check=sellerRepository.findByEmail(dto.getEmail());
    	if(check!=null)
    		return new ResponseEntity("Email id incorrect or already exist",HttpStatus.UNAUTHORIZED);

    	
        Seller seller = new Seller(dto.getName(), dto.getEmail(), passwordEncoder.encode(dto.getPassword()),dto.getMobile(),dto.getAddress());
        sellerRepository.save(seller);

        return new ResponseEntity<>("Your account is created but yet to be verified by Elegant Apparels.",HttpStatus.OK);
    }
    
    @PostMapping("logout")
    public ResponseEntity<?> logout(@RequestBody TokenDTO dto) {
        String refreshTokenString = dto.getRefreshToken();
        System.out.println(refreshTokenString);
        if (jwtHelper.validateRefreshToken(refreshTokenString) && sellerRefreshTokenRepository.existsById(jwtHelper.getTokenIdFromRefreshToken(refreshTokenString))) {
            // valid and exists in db
            sellerRefreshTokenRepository.deleteById(jwtHelper.getTokenIdFromRefreshToken(refreshTokenString));
            return ResponseEntity.ok().build();
        }

        throw new BadCredentialsException("invalid token");
    }
    
    @GetMapping("/getSellerDetailsByJWT")
    public ResponseEntity<?> getUserDetailsByJWT(@RequestHeader(value="authorization",defaultValue="")String auth) throws Exception{
    	
    	System.out.println("getUserDetailsByJWT");
    	Seller seller=token.validate(auth);
    	if(seller==null)
		return new ResponseEntity("Not verified",HttpStatus.UNAUTHORIZED);
    	else
    		return new ResponseEntity(seller,HttpStatus.OK);
    }
    
    // ************************** Forgot password module **************
    
	@PostMapping("/forgotpass")
	public ResponseEntity<String> ForgotPass(@RequestBody objholder str) {
		this.email = str.email;
		System.out.println("forgotpass controller email=" + str.email);
		ResponseEntity<String> seller = sellerService.findByEmail(str.email);

		return seller;

	}

	@PostMapping("/otp")
	public ResponseEntity<Object> otp(@RequestBody objholder str) {

		this.otp = str.otp;

		return sellerService.otpservice(str.otp);

	}

	@PostMapping("/reset")
	public ResponseEntity<String> reset(@RequestBody objholder str) {
		System.out.println("reset speaking");
		System.out.println(str.password);
		//System.out.println(email);
		if (email != null && otp != null && otp.equals(sellerService.random)) {
			return sellerService.findByEmailreset(email, str.password);
		} else {
			return new ResponseEntity<>("invalid", HttpStatus.NOT_FOUND);
		}

	}
	
	//************************PROFILE*************************************
	
	@PostMapping("/profile")
	public  ResponseEntity<Object> profile(@RequestBody objholder str, @RequestHeader(value="authorization",defaultValue="")String auth) {
		return sellerService.profile(str, auth);
	}
	@PostMapping("/avatar")
	public ResponseEntity<?> avatar(@RequestParam("file")MultipartFile file, @RequestHeader(value="authorization",defaultValue="")String auth) throws IOException{
		return sellerService.avatar(file,auth);
		
	}
	
	//********************STATISTICAL DATA OF SELLER********************
	@GetMapping("/sellerStats")
	public ResponseEntity<?> stats(@RequestHeader(value="authorization",defaultValue="")String auth){
		Seller seller=token.validate(auth);
		if(seller==null)
			return new ResponseEntity<>("Invalid JWT token",HttpStatus.UNAUTHORIZED);
		
		List<Product> product;
		SellerStatsDTO sellerStatsDTO = new SellerStatsDTO();
		
		product=userProductRepository.findBySellerId(seller.getId());
		sellerStatsDTO.setTotalProduct(product.size());
		
		HashSet<String> cat = new HashSet<String>();
		for(int i=0;i<product.size();i++) {
			cat.add(product.get(i).getProduct_category());
		}

		System.out.println("cat-"+cat.size());
		sellerStatsDTO.setTotalCategory(cat.size());
		
		HashSet<String> comp=new HashSet<String>();
		for(int i=0;i<product.size();i++) {
			comp.add(product.get(i).getProduct_company().toLowerCase());
		}
		
		System.out.println("comp-"+comp);
		sellerStatsDTO.setTotalCompany(comp.size());
		
		return new ResponseEntity<>(sellerStatsDTO,HttpStatus.OK);
		
	}
    

}
