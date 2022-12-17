package com.ecommerce.Entity;

import org.springframework.data.mongodb.core.mapping.Document;

//@Document(collection = "colour")
public class Colour {
    private String colour_name;
    private String image_url;

    public Colour(String colour_name, String image_url) {
        super();
        this.colour_name = colour_name;
        this.image_url = image_url;
    }

    public String getColour_name() {
        return colour_name;
    }

    public void setColour_name(String colour_name) {
        this.colour_name = colour_name;
    }

    public String getImage_url() {
        return image_url;
    }

    public void setImage_url(String image_url) {
        this.image_url = image_url;
    }

}
