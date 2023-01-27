package com.ecommerce.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.ecommerce.Service.*;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    @Autowired
    private UserService userService=null;
    @Autowired
    private SellerService sellerService=null;
    @Autowired
    private AdminAuthService adminAuthService=null;
    @Autowired
    private AccessTokenEntryPoint accessTokenEntryPoint;

    @Bean
    public AccessTokenFilter accessTokenFilter() {
        return new AccessTokenFilter();
    }

    @Bean
    @Override
    protected AuthenticationManager authenticationManager() throws Exception {
        return super.authenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
    	if(userService!=null) {
        auth.userDetailsService(userService)
                .passwordEncoder(passwordEncoder());
    	}
        auth.userDetailsService(sellerService).passwordEncoder(passwordEncoder());
        auth.userDetailsService(adminAuthService).passwordEncoder(passwordEncoder());
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors().and().csrf().disable()
                .exceptionHandling().authenticationEntryPoint(accessTokenEntryPoint).and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
                .authorizeRequests().antMatchers("/api/auth/**").permitAll()
                .antMatchers("/api/seller/auth/**").permitAll()
                .antMatchers("/api/sellerProduct/**").permitAll()
                .antMatchers("/api/admin/auth/**").permitAll()
                .antMatchers("/admin/**").permitAll()
                .antMatchers("/api/products/**").permitAll()
                .antMatchers("/api/category/**").permitAll()
                .antMatchers("/api/addToCart/**").permitAll()
                .antMatchers("/api/cloudinary/**").permitAll()
                .antMatchers("/api/order/**").permitAll() 
                .anyRequest().authenticated();
        http.addFilterBefore(accessTokenFilter(), UsernamePasswordAuthenticationFilter.class)
        
        .logout()
        	.clearAuthentication(true);
    }
    
}