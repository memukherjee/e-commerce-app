package com.ecommerce.Service;



import java.util.Vector;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.ecommerce.Entity.User;
import com.ecommerce.Entity.objholder;
import com.ecommerce.Repository.UserRepository;


@Service
public class UserService implements UserDetailsService {

	@Autowired
    UserRepository userRepository;
    @Override
    public User loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("username not found"));
    }

    public User findById(String id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new UsernameNotFoundException("user id not found"));
    }
//	public String random;
//
//	@Autowired
//	UserRepository userRepo;
//	
//	BCryptPasswordEncoder PasswordEncoder;
//	
//
//	public ResponseEntity<Object> saveDataTODB(User metaData) { // signup module
//		
//		String email = metaData.getEmail();
//		User user = userRepo.findByEmail(email);
//		metaData.setAvatar("https://avatars.dicebear.com/api/initials/"+metaData.getName()+".svg");
//		this.PasswordEncoder=new BCryptPasswordEncoder();
//		String encodedPassword=this.PasswordEncoder.encode(metaData.getPass());
//		metaData.setPass(encodedPassword);
//		if (user == null) {
//			//v.add(userRepo.save(metaData));
//			return new ResponseEntity<>(userRepo.save(metaData), HttpStatus.OK);
//		} else {
//			return new ResponseEntity<>("Email Id Already Exists", HttpStatus.NOT_FOUND);
//			
//		}
//	}
//
//	// retrive data from db
//	public User getsUserDetailsFromDB(String id) {
//		return userRepo.findAllByid(id);
//	}
//	public ResponseEntity<Object> UserDetailsFromDB(String email) {
//		User user= userRepo.findByEmail(email);
//		if(user!=null) {
//			return new ResponseEntity<>(user, HttpStatus.OK);
//		}else {
//			return new ResponseEntity<>("User Not Found", HttpStatus.NOT_FOUND);
//		}
//	}
//
//	public User findByEmail(String email, String pass) { // login module
//		User user = userRepo.findByEmail(email);
//		System.out.println("service=" + user);
//
//		if (user != null) {
//			BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();  
//			//encoder.matches(pass, user.getPass());  
//			//String locpass = user.getPass();
//			if (encoder.matches(pass, user.getPass())) {
//				return user;
//			}
//		}
//		return null;
//
//	}
//
//	public ResponseEntity<String> findByEmail(String email) { // forgot password module
//		User user = userRepo.findByEmail(email);
//		OtpMail obj = new OtpMail();
//		System.out.println("service=" + user);
//		
//		if (user != null) {
//			System.out.println("email verified");
//			int otp = (int) (Math.random() * 9999);
//			random = String.valueOf(otp);
//			System.out.println(random);
//			obj.king(random, email); // mail
//			//v.add(random);
//			
//			return (new ResponseEntity<>("Email Verified", HttpStatus.OK));
//
//		} else {
//			System.out.println("email not verified");
//			return (new ResponseEntity<>("Email Not Verified", HttpStatus.NOT_FOUND));
//		}
//		
//	}
//	
//	public ResponseEntity<Object> otpservice(String inotp){
//		if(inotp.equals(random)) {
//			System.out.println("matched");
//			return new ResponseEntity<>("OTP Verified", HttpStatus.OK);
//		}else {
//			System.out.println("not matched");
//			return new ResponseEntity<>("OTP Incorrect", HttpStatus.NOT_FOUND);
//		}
//		
//		
//		
//	}
//
//	public ResponseEntity<String>findByEmailreset(String email, String pass) {
//		User user = userRepo.findByEmail(email);
//		Vector v = new Vector();
//		if (user != null) {
//			System.out.println(user);
//			this.PasswordEncoder=new BCryptPasswordEncoder();
//			String encodedPassword=this.PasswordEncoder.encode(pass);
//			user.setPass(encodedPassword);
//			//user.setPass(pass);
//			userRepo.save(user);
//			return new ResponseEntity<>("Password Changed", HttpStatus.OK);
//		} else {
//			return new ResponseEntity<>("Password Not Changed", HttpStatus.NOT_FOUND);
//		}
//		
//
//	}
//	public ResponseEntity<Object> profile(objholder str){       //profile  service controller objholder to commit
//		User user = userRepo.findByEmail(str.email);
//		if(user!=null) {
//			if(str.name!=null) {
//				user.setName(str.name);
//				user.setAvatar("https://avatars.dicebear.com/api/initials/"+str.name+".svg");
//			}
//			if(str.address!=null) {
//				user.setAddress(str.address);
//			}
//			if(str.mob!=null) {
//				user.setMob(str.mob);
//			}
//			if(str.pass!=null) {
//				user.setPass(str.pass);
//			}
//			user.setEmail(str.email);  //check
//			
//			return new ResponseEntity<>(userRepo.save(user), HttpStatus.OK);
//		}else {
//			return new ResponseEntity<>("User Not Matched", HttpStatus.NOT_FOUND);
//		}
//		
//		
//	}

}