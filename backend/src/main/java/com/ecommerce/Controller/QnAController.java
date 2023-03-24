package com.ecommerce.Controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.Entity.Answer;
import com.ecommerce.Entity.QnA;
import com.ecommerce.Entity.User;
import com.ecommerce.Repository.QnARepository;
import com.ecommerce.Repository.UserProductRepository;
import com.ecommerce.jwt.TokenValidator;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/products")
public class QnAController {

	@Autowired
	private MongoTemplate mongoTemplate;

	@Autowired
	TokenValidator token;
	
	@Autowired
	QnARepository qnARepository;

	@PostMapping("/qa")
	public ResponseEntity<?> postQuestion(@RequestBody Map<String, String> requestBody,
			@RequestHeader(value = "authorization", defaultValue = "") String auth) {

		User user = token.validate(auth);
		if (user == null)
			return new ResponseEntity<>("Invalid JWT token", HttpStatus.UNAUTHORIZED);
		String question = requestBody.get("question");
		QnA qa = new QnA(user.getId(),requestBody.get("productId"), question);

		return new ResponseEntity<>(mongoTemplate.insert(qa), HttpStatus.OK);
	}

	@SuppressWarnings("unused")
	@PostMapping("/qa/answers")
	public ResponseEntity<?> postAnswer(@RequestBody Map<String, String> requestBody) {
System.out.println("answer speaking");
		String questionId = requestBody.get("questionId");
		String answer = requestBody.get("answer");
		String userId = requestBody.get("userId");
		System.out.println(questionId+","+answer+","+userId);
		QnA qa =new QnA();
		qa = mongoTemplate.findById(questionId, QnA.class);
		if(qa.getUserId().equals(userId)) 
			 return new ResponseEntity<>("You cannot answer your own question", HttpStatus.UNAUTHORIZED);
		
		 if (qa == null) {
		        return new ResponseEntity<>("Question not found", HttpStatus.NOT_FOUND);
		    }else {
		    	System.out.println("question found");
		    }

		Answer newAnswer = new Answer(answer, userId);
		 if (qa.getAnswer() == null) {
		        qa.setAnswer(new ArrayList<>());
		    }
		    qa.getAnswer().add(newAnswer);

		    QnA updatedQa = mongoTemplate.save(qa);

		
		return new ResponseEntity<>(updatedQa, HttpStatus.OK);
	}
	
	 @GetMapping("/qa")
	    public List<QnA> getAllQuestions() {
	        return mongoTemplate.findAll(QnA.class);
	    }
	 
	 @GetMapping("/qa/{questionId}")
	    public QnA getQuestion(@PathVariable String questionId) {
	        return mongoTemplate.findById(questionId, QnA.class);
	    }
	 @GetMapping("/qaByProductId/{productId}")
	 public List<QnA> qaByProductId(@PathVariable String productId) {
		 System.out.println(productId);
		 return qnARepository.findByProductId(productId);
	 }

}
