package com.ecommerce.Service;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.ecommerce.Controller.CloudinaryController;
import com.ecommerce.Entity.User;
import com.ecommerce.Entity.objholder;
import com.ecommerce.Repository.SellerRepository;
import com.ecommerce.Repository.UserRepository;
import com.ecommerce.jwt.TokenValidator;

@Service
public class UserService implements UserDetailsService {

	@Autowired
	UserRepository userRepository;
	@Autowired
	TokenValidator token;
	@Autowired
	PasswordEncoder passwordEncoder;
	@Autowired
	CloudinaryController cloudinaryController;

	@Autowired
	SellerRepository sellerRepository;

	@Override
	public User loadUserByUsername(String username) throws UsernameNotFoundException {
		return userRepository.findByUsername(username)
				.orElseThrow(() -> new UsernameNotFoundException("username not found"));
	}

	public User findById(String id) {
		return userRepository.findById(id)
				.orElseThrow(() -> new UsernameNotFoundException("user id not found"));
	}

	public String random;

	BCryptPasswordEncoder PasswordEncoder;

	public ResponseEntity<String> findByEmail(String email) { // forgot password module
		User user = userRepository.findByEmail(email);
		System.out.println("service=" + user);

		if (user != null) {
			System.out.println("email verified");
			int otp = 1000 + (int) Math.floor(Math.random() * 9000);
			random = String.valueOf(otp);
			System.out.println(random);
			OtpMail.king(random, email); // mail sending

			return (new ResponseEntity<>("Email Verified", HttpStatus.OK));

		} else {
			System.out.println("email not verified");
			return (new ResponseEntity<>("Email Not Verified", HttpStatus.NOT_FOUND));
		}

	}

	public ResponseEntity<Object> otpservice(String inotp) {
		if (inotp.equals(random)) {
			System.out.println("matched");
			return new ResponseEntity<>("OTP Verified", HttpStatus.OK);
		} else {
			System.out.println("not matched");
			return new ResponseEntity<>("OTP Incorrect", HttpStatus.NOT_FOUND);
		}

	}

	public ResponseEntity<String> findByEmailreset(String email, String pass) {
		User user = userRepository.findByEmail(email);
		if (user != null) {
			System.out.println(user);
			this.PasswordEncoder = new BCryptPasswordEncoder();
			String encodedPassword = this.PasswordEncoder.encode(pass);
			user.setPassword(encodedPassword);
			// user.setPass(pass);
			userRepository.save(user);
			return new ResponseEntity<>("Password Changed", HttpStatus.OK);
		} else {
			return new ResponseEntity<>("Password Not Changed", HttpStatus.NOT_FOUND);
		}

	}

	public ResponseEntity<Object> profile(objholder str, String auth) { // profile service controller objholder to
																		// commit

		User user = token.validate(auth);
		if (user == null) {
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		}

		if (str.name != null) {
			user.setName(str.name);
			if (!user.getAvatar().contains("cloudinary"))
				user.setAvatar("https://avatars.dicebear.com/api/initials/" + str.name + ".svg");
		}
		if (str.address != null) {
			user.setAddress(str.address);
		}
		if (str.mobile != null) {
			user.setMobile(str.mobile);
		}

		if (str.email != null) {
			user.setEmail(str.email); // check
			user.setUsername(str.email);
		}
		if (str.oldPassword != null && str.newPassword != null) {
			System.out.println(str.oldPassword + " " + str.newPassword);
			String old = passwordEncoder.encode(str.oldPassword);
			System.out.println(old + " " + user.getPassword());
			if (passwordEncoder.matches(str.oldPassword, user.getPassword())) {
				System.out.println("1");
				this.PasswordEncoder = new BCryptPasswordEncoder();
				String encodedPassword = this.PasswordEncoder.encode(str.newPassword);
				user.setPassword(encodedPassword);
			} else {
				userRepository.save(user);
				return new ResponseEntity<>("Invalid old password", HttpStatus.UNAUTHORIZED);
			}
		}

		return new ResponseEntity<>(userRepository.save(user), HttpStatus.OK);

	}

	public ResponseEntity<?> avatar(MultipartFile file, String auth) throws IOException {
		User user = token.validate(auth);
		if (user == null) {
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		}
		String image_url = cloudinaryController.upload(file);
		user.setAvatar(image_url);

		return new ResponseEntity<>(userRepository.save(user), HttpStatus.OK);
	}

}
