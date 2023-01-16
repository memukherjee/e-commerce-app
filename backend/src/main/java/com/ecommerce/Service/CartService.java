package com.ecommerce.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecommerce.Entity.CartDetails;
import com.ecommerce.Entity.Product;
import com.ecommerce.Entity.ShoppingCart;
import com.ecommerce.Repository.CartRepo;

@Service
public class CartService {

    @Autowired
    CartRepo cartRepo;

    @Autowired
    UserProductService productService;

    public ShoppingCart addToCartService(ShoppingCart shoppingCart) {
        return cartRepo.save(shoppingCart);
    }

    public String removeFromCartService(String id) {
        cartRepo.deleteById(id);
        return id + " is deleted";
    }

    public ShoppingCart getCartById(String id) {
        return cartRepo.findById(id).get();
    }
    
//    public CartDetails displayAllCartService(String user_id) {
//            System.out.print(user_id);
//            System.out.print(cartRepo.findByuser_id(user_id));
//            return null;
//    }

    public CartDetails displayAllCartService(String user_id) {
        double total = 0;
        int quantity = 0;
        CartDetails cartDetails = new CartDetails();
        cartDetails.setUser_id(user_id);

        ArrayList<ShoppingCart> cartList = cartRepo.findByuser_id(user_id);
        ArrayList<List<Object>> productList = new ArrayList<List<Object>>();
        for (int i = 0; i < cartList.size(); i++) {
            Product product = productService.getProductById(cartList.get(i).getProduct_id());
            // productList.add(product);

            ShoppingCart shoppingCart = getCartById(cartList.get(i).getId());

            ArrayList<Object> prod = new ArrayList<Object>();
            prod.add(product.getProduct_id());
            prod.add(product.getProduct_name());
            prod.add(product.getProduct_category());
            prod.add(product.getProduct_description());
//            prod.add(product.getProduct_colours());
            prod.add(product.getProduct_company());
            prod.add(product.getProduct_price());
            prod.add(product.getProduct_discount());
            prod.add(product.getDiscountPrice());
            prod.add(shoppingCart.getCart_quantity());
            prod.add(product.getProduct_imageUrl());

            productList.add(prod);

            double p = product.getDiscountPrice();

            int q = shoppingCart.getCart_quantity();
            quantity = quantity + q;

            total = total + (q * p);

        }
        cartDetails.setList(productList);
        cartDetails.setTotal(total);
        cartDetails.setTotal_quantity(quantity);
        return cartDetails;
    }

    public String increaseCartQuantity(ShoppingCart shoppingCart) {
        int q = 0;
        ShoppingCart exsistingProductCart = cartRepo.findById(shoppingCart.getId()).get();

        // exsistingProductCart.setCart_quantity(shoppingCart.getCart_quantity());
        q = shoppingCart.getCart_quantity();
        q = q + 1;
        exsistingProductCart.setCart_quantity(q);

        cartRepo.save(exsistingProductCart);
        return "Update +1";

    }

    public String decreaseCartQuantity(ShoppingCart shoppingCart) {
        int q = 0;
        ShoppingCart exsistingProductCart = cartRepo.findById(shoppingCart.getId()).get();

        q = shoppingCart.getCart_quantity();
        if (q > 1) {
            q = q - 1;
            exsistingProductCart.setCart_quantity(q);
        } else {
            exsistingProductCart.setCart_quantity(q);
        }

        cartRepo.save(exsistingProductCart);

        return "Update -1";
    }

    public String removeFromCartAllService(String user_id) {
        ArrayList<ShoppingCart> cartList = cartRepo.findByuser_id(user_id);
        for (int i = 0; i < cartList.size(); i++) {
            ShoppingCart shoppingCart = getCartById(cartList.get(i).getId());
            String cid = shoppingCart.getId();
            cartRepo.deleteById(cid);
        }
        return "delete all";
    }

}
