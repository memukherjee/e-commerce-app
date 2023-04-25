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
import com.ecommerce.Entity.Seller;
import com.ecommerce.Entity.objholder;
import com.ecommerce.Repository.SellerRepository;
import com.ecommerce.jwt.SellerTokenValidator;

@Service
public class SellerService implements UserDetailsService {

	@Autowired
	SellerRepository sellerRepository;
	@Autowired
	SellerTokenValidator token;
	@Autowired
	PasswordEncoder passwordEncoder;
	@Autowired
	CloudinaryController cloudinaryController;

	@Override
	public Seller loadUserByUsername(String username) throws UsernameNotFoundException {
		return sellerRepository.findByUsername(username)
				.orElseThrow(() -> new UsernameNotFoundException("username not found"));
	}

	public Seller findById(String id) {
		return sellerRepository.findById(id)
				.orElseThrow(() -> new UsernameNotFoundException("user id not found"));
	}

	public String random;
	BCryptPasswordEncoder PasswordEncoder;

	public ResponseEntity<String> findByEmail(String email) { // forgot password module
		Seller seller = sellerRepository.findByEmail(email);
		System.out.println("service=" + seller);

		if (seller != null) {
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

	//
	public ResponseEntity<String> findByEmailreset(String email, String pass) {
		Seller seller = sellerRepository.findByEmail(email);
		if (seller != null) {
			System.out.println(seller);
			this.PasswordEncoder = new BCryptPasswordEncoder();
			String encodedPassword = this.PasswordEncoder.encode(pass);
			seller.setPassword(encodedPassword);
			// user.setPass(pass);
			sellerRepository.save(seller);
			return new ResponseEntity<>("Password Changed", HttpStatus.OK);
		} else {
			return new ResponseEntity<>("Password Not Changed", HttpStatus.NOT_FOUND);
		}

	}

	public ResponseEntity<Object> profile(objholder str, String auth) { // profile service controller objholder to
																		// commit

		Seller seller = token.validate(auth);
		if (seller == null) {
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		}

		if (str.name != null) {
			seller.setName(str.name);
			if (!seller.getAvatar().contains("cloudinary"))
				seller.setAvatar("https://avatars.dicebear.com/api/initials/" + str.name + ".svg");
		}
		if (str.address != null) {
			seller.setAddress(str.address);
		}
		if (str.mobile != null) {
			seller.setMobile(str.mobile);
		}

		if (str.email != null) {
			seller.setEmail(str.email); // check
			seller.setUsername(str.email);
		}
		if (str.oldPassword != null && str.newPassword != null) {
			System.out.println(str.oldPassword + " " + str.newPassword);
			String old = passwordEncoder.encode(str.oldPassword);
			System.out.println(old + " " + seller.getPassword());
			if (passwordEncoder.matches(str.oldPassword, seller.getPassword())) {
				System.out.println("1");
				this.PasswordEncoder = new BCryptPasswordEncoder();
				String encodedPassword = this.PasswordEncoder.encode(str.newPassword);
				seller.setPassword(encodedPassword);
			} else {

				return new ResponseEntity<>("Invalid old password", HttpStatus.UNAUTHORIZED);
			}
		}

		return new ResponseEntity<>(sellerRepository.save(seller), HttpStatus.OK);

	}
	//

	public ResponseEntity<?> avatar(MultipartFile file, String auth) throws IOException {
		Seller seller = token.validate(auth);
		if (seller == null) {
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		}
		String image_url;
		if (file == null) {
			image_url = "https://avatars.dicebear.com/api/initials/" + seller.getName() + ".svg";
		} else {
			image_url = cloudinaryController.upload(file);
		}
		seller.setAvatar(image_url);

		return new ResponseEntity<>(sellerRepository.save(seller), HttpStatus.OK);
	}
}