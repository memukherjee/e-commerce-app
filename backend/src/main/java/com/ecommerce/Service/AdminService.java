package com.ecommerce.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

import javax.mail.Authenticator;
import javax.mail.Message;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecommerce.Entity.Product;
import com.ecommerce.Repository.AdminRepository;
import com.ecommerce.Repository.SellerRepository;
import com.ecommerce.Repository.UserRepository;

@Service
public class AdminService {

    @Autowired
    AdminRepository repo;
	@Autowired
	UserRepository userRepository;
	@Autowired
	SellerRepository sellerRepository;

    public Product addProduct(Product product) {
        double discountRate = 0.0;
        double a = product.getProduct_price();
        double b = product.getProduct_discount();
        discountRate = b / 100;
        double c = a - (a * discountRate);
        product.setDiscountPrice(c);
        return repo.save(product);
    }

    public List<Product> getAllProduct() {
        return repo.findAll();
    }

    public String deleteProduct(String product_id) {
        repo.deleteById(product_id);
        return "Product Deleted";
    }

    public Product updateProduct(Product product) {
        Product existingProduct = repo.findById(product.getProduct_id()).get();
        existingProduct.setProduct_name(product.getProduct_name());
        existingProduct.setProduct_category(product.getProduct_category());
        existingProduct.setProduct_description(product.getProduct_description());
        existingProduct.setProduct_company(product.getProduct_company());
        existingProduct.setProduct_price(product.getProduct_price());
        existingProduct.setProduct_discount(product.getProduct_discount());
        existingProduct.setProduct_quantity(product.getProduct_quantity());

        return repo.save(existingProduct);
    }

//	public Product getProductByCategory(String product_category) {
//		return repo.findByCategory(product_category);
//		
//	}
	public void adminMail(String to1, String subject1, String message1) {

		System.out.println("sending mail...");

		String message = message1;
		String subject = subject1;
		List<String> to = new ArrayList<>();

		if (to1.equalsIgnoreCase("all")) {
			to.addAll(userRepository.getAllEmails());
			to.addAll(sellerRepository.getAllEmails());
		}
		if (to1.equalsIgnoreCase("user")) {
			to.addAll(userRepository.getAllEmails());
		}
		if (to1.equalsIgnoreCase("seller")) {
			to.addAll(sellerRepository.getAllEmails());
		}

		String from = "in.elegantapparels@gmail.com";
		List<String> newto = new ArrayList<>();
		for (String email : to) {
			JSONObject jsonObject = new JSONObject(email);
			String emailAddress = jsonObject.getString("email");
			newto.add(emailAddress);
		}

		String host = "smtp.gmail.com";

		// get the system properties
		Properties properties = System.getProperties();
		System.out.println("prop" + properties);

		properties.put("mail.smtp.auth", true);
		properties.put("mail.smtp.starttls.enable", "true");
		properties.put("mail.smtp.host", host);
		properties.put("mail.smtp.port", 587);
		properties.put("mail.smtp.ssl.trust", host);
		properties.setProperty("mail.smtp.ssl.protocols", "TLSv1.2");

		Session session = Session.getInstance(properties, new Authenticator() {

			@Override
			protected PasswordAuthentication getPasswordAuthentication() {
				// TODO Auto-generated method stub
				return new PasswordAuthentication("in.elegantapparels@gmail.com", "izrretjlgbxifkhb");
			}

		});
		session.setDebug(true);

		MimeMessage m = new MimeMessage(session);

		try {
			m.setFrom(from);

//			
			for (String recipient : newto) {
				m.addRecipient(Message.RecipientType.BCC, new InternetAddress(recipient));
			}

			// adding subject to message
			m.setSubject(subject);

			// adding text to message
			m.setContent(message, "text/html; charset=utf-8");

			// send
			// step3: send the message using transport class
			Transport.send(m);

			System.out.println("success...");

		} catch (Exception e) {
			e.printStackTrace();
		}

	}
}
