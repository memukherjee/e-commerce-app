package com.ecommerce.Service;

import java.util.Properties;

import javax.mail.Authenticator;
import javax.mail.Message;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class ContactMail {
	public static ResponseEntity<String> king(String name, String email, String msg) {

		System.out.println("sending mail...");

		String message = "Hi " + name
				+ "...\nThanks for contacting us...\nWe have received Your messsage and will update you soon...";
		String subject = "Feedback Received";
		String to = email;
		String from = "in.elegantapparels@gmail.com";

		sendEmail(message, subject, to, from);
		return queen(name, email, msg);
	}

	public static ResponseEntity<String> queen(String name, String email, String msg) {
		String message = "Name: " + name + "\nEmail: " + email + "\nMessage: " + msg;
		String subject = "Feedback Received";
		String to = "in.elegantapparels@gmail.com";
		String from = "in.elegantapparels@gmail.com";

		if (sendEmail(message, subject, to, from)) {
			return new ResponseEntity<>("Success", HttpStatus.OK);
		} else {
			return new ResponseEntity<>("Unsuccessful", HttpStatus.NOT_FOUND);
		}

	}

	private static boolean sendEmail(String message, String subject, String to, String from) {

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

			// adding recipient to message
			m.addRecipient(Message.RecipientType.TO, new InternetAddress(to));

			// adding subject to message
			m.setSubject(subject);

			// adding text to message
			m.setText(message);

			// send
			// step3: send the message using transport class
			Transport.send(m);

			System.out.println("success...");
			return true;

		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;

	}

}
