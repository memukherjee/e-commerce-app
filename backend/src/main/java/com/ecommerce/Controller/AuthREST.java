package com.ecommerce.Controller;



import com.ecommerce.Entity.RefreshToken;
import com.ecommerce.Entity.User;
import com.ecommerce.Entity.objholder;
import com.ecommerce.dto.LoginDTO;
import com.ecommerce.dto.SignupDTO;
import com.ecommerce.dto.TokenDTO;
import com.ecommerce.jwt.JwtHelper;
import com.ecommerce.jwt.TokenValidator;
import com.ecommerce.Repository.RefreshTokenRepository;
import com.ecommerce.Repository.UserRepository;
import com.ecommerce.Service.ContactMail;
import com.ecommerce.Service.UserService;
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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

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


    @PostMapping("/login")
    @Transactional
    public ResponseEntity<?> login(@Valid @RequestBody LoginDTO dto) {
    	System.out.println(dto.getEmail()+" ---"+dto.getPassword());
    	User logUser=userRepository.findByEmail(dto.getEmail());
    	if(logUser==null) {
    		return new ResponseEntity("",HttpStatus.UNAUTHORIZED);
    	}
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(logUser.getUsername(), dto.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        User user = (User) authentication.getPrincipal();

        System.out.println("user="+user);
        RefreshToken refreshToken = new RefreshToken();
        refreshToken.setOwner(user);
        refreshTokenRepository.save(refreshToken);

        String accessToken = jwtHelper.generateAccessToken(user);
        System.out.println("login--"+accessToken);
        String refreshTokenString = jwtHelper.generateRefreshToken(user, refreshToken);
        System.out.println("refreshToken="+refreshTokenString);

       
        return ResponseEntity.ok(new TokenDTO(user.getId(),accessToken,refreshTokenString));
    }

    @PostMapping("signup")
    @Transactional
    public ResponseEntity<?> signup(@Valid @RequestBody SignupDTO dto) {
    	System.out.println(dto.getUsername()+" ---"+dto.getEmail()+"---"+dto.getPassword());

    	
        User user = new User(dto.getUsername(), dto.getEmail(), passwordEncoder.encode(dto.getPassword()),dto.getMobile(),dto.getAddress());
        userRepository.save(user);

        RefreshToken refreshToken = new RefreshToken();
        refreshToken.setOwner(user);
        refreshTokenRepository.save(refreshToken);

        String accessToken = jwtHelper.generateAccessToken(user);
        System.out.println("access token="+accessToken);
        String refreshTokenString = jwtHelper.generateRefreshToken(user, refreshToken);

        return ResponseEntity.ok(new TokenDTO(user.getId(), accessToken, refreshTokenString));
    }

    @PostMapping("logout")
    public ResponseEntity<?> logout(@RequestBody TokenDTO dto) {
        String refreshTokenString = dto.getRefreshToken();
        System.out.println(refreshTokenString);
        if (jwtHelper.validateRefreshToken(refreshTokenString) && refreshTokenRepository.existsById(jwtHelper.getTokenIdFromRefreshToken(refreshTokenString))) {
            // valid and exists in db
            refreshTokenRepository.deleteById(jwtHelper.getTokenIdFromRefreshToken(refreshTokenString));
            return ResponseEntity.ok().build();
        }

        throw new BadCredentialsException("invalid token");
    }

    @PostMapping("logout-all")
    public ResponseEntity<?> logoutAll(@RequestBody TokenDTO dto) {
        String refreshTokenString = dto.getRefreshToken();
        if (jwtHelper.validateRefreshToken(refreshTokenString) && refreshTokenRepository.existsById(jwtHelper.getTokenIdFromRefreshToken(refreshTokenString))) {
            // valid and exists in db

            refreshTokenRepository.deleteByOwner_Id(jwtHelper.getUserIdFromRefreshToken(refreshTokenString));
            return ResponseEntity.ok().build();
        }

        throw new BadCredentialsException("invalid token");
    }

    @PostMapping("access-token")
    public ResponseEntity<?> accessToken(@RequestBody TokenDTO dto) {
        String refreshTokenString = dto.getRefreshToken();
        if (jwtHelper.validateRefreshToken(refreshTokenString) && refreshTokenRepository.existsById(jwtHelper.getTokenIdFromRefreshToken(refreshTokenString))) {
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
        if (jwtHelper.validateRefreshToken(refreshTokenString) && refreshTokenRepository.existsById(jwtHelper.getTokenIdFromRefreshToken(refreshTokenString))) {
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
    @PostMapping("/demo")
    public ResponseEntity<?> demo(@RequestHeader(value="authorization",defaultValue="")String auth) throws Exception{
    	
    	System.out.println("demo");
    	User user=token.validate(auth);
    	if(user==null)
		return new ResponseEntity("Not verified",HttpStatus.UNAUTHORIZED);
    	else
    		return new ResponseEntity(user,HttpStatus.OK);
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
    		//System.out.println(email);
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
}

