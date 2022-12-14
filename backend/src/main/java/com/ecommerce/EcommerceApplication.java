package com.ecommerce;

import java.io.File;
import java.io.IOException;
import java.util.Map;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;

@SpringBootApplication(exclude=SecurityAutoConfiguration.class)
public class EcommerceApplication {

	public static void main(String[] args) throws IOException {
		SpringApplication.run(EcommerceApplication.class, args);
		
		Cloudinary cloudinary = new Cloudinary(ObjectUtils.asMap(
				"cloud_name", "dbziwyqwd",
				"api_key", "917479111298556",
				"api_secret", "rrKP00LNoa1BMXUNh_duTXiPrE8",
				"secure", true));
		
		
	}

}
