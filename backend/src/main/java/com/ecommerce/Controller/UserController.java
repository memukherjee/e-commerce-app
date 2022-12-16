package com.ecommerce.Controller;

import java.math.BigInteger;
import java.util.List;
import java.util.Vector;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.Entity.UserData;
import com.ecommerce.Entity.objholder;
import com.ecommerce.Repository.UserRepo;
import com.ecommerce.Service.ContactMail;
import com.ecommerce.Service.UserService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api")
public class UserController {
    String email; // forgotpass_link
    String otp;

    public Vector forgot = new Vector(); // forgotpass_link

    @Autowired
    UserService userService;

//                                     *************************signup module**************************** 
    @PostMapping("/signup")
    public ResponseEntity<Object> signup(@Valid @RequestBody UserData userData) {
        ResponseEntity<Object> user = userService.saveDataTODB(userData);
        return user;
    }

//                                 **************************details of user by id***********************
    @GetMapping("getUserDetails/{id}")
    public UserData getUserDetails(@PathVariable String id) {
        UserData user = userService.getsUserDetailsFromDB(id);
        return user;
    }

    // **************************details of user by email**********************
    @GetMapping("/userDetails/{email}")
    public ResponseEntity<Object> UserDetails(@PathVariable String email) {
        return userService.UserDetailsFromDB(email);
    }
    // ************************* login module*************************

    @PostMapping("/login")
    public ResponseEntity<Object> MatchData(@RequestBody objholder obj) {
        System.out.println("login controller email and pass=" + obj.email + " : " + obj.pass);
        UserData user = userService.findByEmail(obj.email, obj.pass);

        if (user != null) {

            return new ResponseEntity<>(user, HttpStatus.OK);
        } else
            return new ResponseEntity<>("User Not Found", HttpStatus.NOT_FOUND);

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
        System.out.println(str.pass);
        System.out.println(email);
        if (email != null && otp != null && otp.equals(userService.random)) {
            return userService.findByEmailreset(email, str.pass);
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
