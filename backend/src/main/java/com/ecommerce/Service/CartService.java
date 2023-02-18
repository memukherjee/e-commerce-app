package com.ecommerce.Service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecommerce.dto.CartDTO;
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

    public CartDTO displayAllCartService(String user_id) {
        double totalPrice = 0;
        int quantity = 0;
        CartDTO cartDTO = new CartDTO();

        ArrayList<ShoppingCart> cartList = cartRepo.findByuser_id(user_id);
        ArrayList<Product> productList = new ArrayList<>();
        for (int i = 0; i < cartList.size(); i++) {
            Product product = productService.getProductById(cartList.get(i).getProduct_id());

            ShoppingCart shoppingCart = cartList.get(i);

            productList.add(product);

            double p = product.getDiscountPrice();

            int q = shoppingCart.getCart_quantity();
            quantity = quantity + q;

            totalPrice = totalPrice + (q * p);

        }
        cartDTO.setList(productList);
        cartDTO.setTotal(totalPrice);
        cartDTO.setTotal_quantity(quantity);
        return cartDTO;
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
