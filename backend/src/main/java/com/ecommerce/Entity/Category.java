package com.ecommerce.Entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.GeneratedValue;
import javax.validation.constraints.NotEmpty;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.annotation.Id;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
@Document(collection = "category")
public class Category {
	    @Id
	    @GeneratedValue
	    private String category_id;
	    
	    @NotEmpty
	    private String category_name;
	    
	    @NotEmpty
	    private String category_image;
	    
	    @DBRef
	    private List<Product> products;

	    public Category(String category_name, String category_image) {
	        super();
	        this.category_name = category_name;
	        this.category_image = category_image;
	        this.products = new ArrayList<Product>();
	    }

	    public String getCategory_name() {
	        return category_name;
	    }

	    public void setCategory_name(String category_name) {
	        this.category_name = category_name;
	    }

	    public String getCategory_image() {
	        return category_image;
	    }

	    public void setCategory_image(String category_image) {
	        this.category_image = category_image;
	    }

	}