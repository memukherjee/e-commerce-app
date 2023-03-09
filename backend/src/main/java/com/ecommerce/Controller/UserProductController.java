
package com.ecommerce.Controller;

import java.awt.print.Pageable;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.print.attribute.HashPrintServiceAttributeSet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.support.PagedListHolder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.Entity.Category;
import com.ecommerce.Entity.Product;
import com.ecommerce.Entity.User;
import com.ecommerce.Entity.WishList;
import com.ecommerce.Repository.CategoryRepository;
import com.ecommerce.Repository.UserProductRepository;
import com.ecommerce.Repository.wishListRepository;
import com.ecommerce.Service.UserProductService;
import com.ecommerce.dto.wishlistDTO;
import com.ecommerce.jwt.TokenValidator;
import com.fasterxml.jackson.annotation.JsonTypeInfo.Id;
import java.util.Comparator;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/products")
public class UserProductController {
    @Autowired
    UserProductService service;
    @Autowired
    UserProductRepository userProductRepository;
    @Autowired
    CategoryRepository categoryRepository;
    @Autowired
   	TokenValidator token;
    @Autowired
    wishListRepository wishListRepository;
    
    wishlistDTO wishlistdto=null;

    /* Searching the product based on product id......................... */

    @GetMapping("/getProduct/{product_id}")
    public wishlistDTO getProduct(@PathVariable String product_id,@RequestHeader(value="authorization",defaultValue="")String auth) {
    	User user=new User();
    	if(!auth.isBlank()) {
    	user=token.validate(auth);
    	}else {
    		Product pro = service.getProductById(product_id);
    		return new wishlistDTO(pro,false);
    	}

    	
    	
    	List<WishList> wish=new ArrayList<WishList>();
    	
    	Product pro = service.getProductById(product_id);
    	System.out.println(pro.discountPrice);
    	
    	if(user!=null) {
    	wish = wishListRepository.findByuserIdAndProductId(user.getId(),product_id);
    	if(!wish.isEmpty()) {
    		
    		wishlistDTO wishlistDTO=new wishlistDTO(pro, true);
    		return wishlistDTO;
    	}else {
    		wishlistDTO wishlistDTO=new wishlistDTO(pro, false);
    		return wishlistDTO;
    	}
    	}
		return wishlistdto;
 
    	//return pro;
        
        
    }

    /* Getting all the trending products......................... */

    @GetMapping("/trending")
    public List<Product> TrendingProducts() {
        return service.findPopularityByProducts1();
    }

    /* Searching product by category.................... */
    @GetMapping("/product_category/{product_category}")
    public ResponseEntity<List<Product>> getProductByCategory(@PathVariable String product_category,
            @RequestParam(defaultValue = "0") Integer pageNo,
            @RequestParam(defaultValue = "5") Integer pageSize) {
        List<Product> list = service.getProductByCategory(product_category, pageNo, pageSize);
        return new ResponseEntity<List<Product>>(list, new HttpHeaders(), HttpStatus.OK);
    }

    /* Searching product by product name............................ */

    @GetMapping("/product_name/{product_name}")
    public List<Product> getProductByName(@PathVariable String product_name) {
        return service.getProductByName(product_name);

    }

    @GetMapping("/getAllProduct")
    public ResponseEntity<List<Product>> getProduct(@RequestParam(defaultValue = "0") Integer pageNo,
            @RequestParam(defaultValue = "5") Integer pageSize) {
        List<Product> list = service.getAllProduct(pageNo, pageSize);
        return new ResponseEntity<List<Product>>(list, new HttpHeaders(), HttpStatus.OK);
    }
    
    
    @GetMapping("/search")
    public ResponseEntity<?> search(@RequestParam("query") String query,@RequestParam("pageNo") int pageNo,@RequestParam("pageSize") int pageSize){
    	query.toLowerCase();
    	List<Category> cat = categoryRepository.findAll();
    	ArrayList<String> catIdAll=new ArrayList<String>();
    	for(int i=0;i<cat.size();i++) {
    		if(cat.get(i).getCategory_name().toLowerCase().contains(query.toLowerCase())) {
    			catIdAll.add(cat.get(i).getCategory_id());
    		}
    	}
    	

    	List<Product> concatenated_list
        = new ArrayList<Product>();
    	for(String i:catIdAll) {
    	
    	concatenated_list.addAll( userProductRepository.findByCategory(i));
    	}
    	
    	List<Product> pro=userProductRepository.findAll();
    	ArrayList<Product> proAll=new ArrayList<Product>();
    	for(int i=0;i<pro.size();i++) {
    		if(pro.get(i).getProduct_name().toLowerCase().contains(query.toLowerCase())) {
    			proAll.add(pro.get(i));
    		}
    	}
    	
    	
    	concatenated_list.addAll(proAll);
    	
    	
    	
    	
    	for(int i=0;i<concatenated_list.size();i++) {
    		for(int j=i+1;j<concatenated_list.size();j++) {
    			if(concatenated_list.get(i).getProduct_id().equals(concatenated_list.get(j).getProduct_id())) {
    				concatenated_list.remove(j); 				
    			}
    		}		
    	}
    	
    	PagedListHolder<Product> pagedListHolder=new PagedListHolder<Product>(concatenated_list);
    	pagedListHolder.setPage(pageNo);
    	pagedListHolder.setPageSize(pageSize);
    	int size=pagedListHolder.getPageCount();
    	System.out.println(size);
    	ArrayList<Product> leo=new ArrayList<>(); 
    	if(pageNo>=size)
    		return new ResponseEntity<>(leo,HttpStatus.OK);
    	
    	
    		return new ResponseEntity<>(pagedListHolder.getPageList(),HttpStatus.OK);
    	
    	
    }
    
    @GetMapping("/filterProducts")
    public ResponseEntity<?> getProductByFilter(@RequestParam (defaultValue="10000000",name="maxPrice",required = false) String maxPrice, @RequestParam (defaultValue="0",name="minPrice",required = false) String minPrice,@RequestParam (name="category",required = false) String product_category,@RequestParam (defaultValue="",name="sort",required = false) String sort, @RequestParam(defaultValue = "0") Integer pageNo,
          @RequestParam(defaultValue = "5") Integer pageSize)    {
    	
    		
    		List<Product> filter=new ArrayList<Product>();
    		
    		System.out.println(minPrice+" "+maxPrice);
    		if(product_category!=null) {
    			filter.addAll(service.getProductByMaxMinAndCategory(Double.parseDouble(maxPrice), Double.parseDouble(minPrice),product_category));
    		}else {
    			filter.addAll(service.getProductByMaxMin(Double.parseDouble(maxPrice), Double.parseDouble(minPrice)));
    		}

   			
   			if(sort.contains("price") && sort.contains("ascending")) {
   				System.out.println("price a");
   			Collections.sort(filter, new Comparator<Product>()
   					{
   						public int compare(Product p1,Product p2) {
   							return Double.valueOf(p1.discountPrice).compareTo(p2.discountPrice);
   						}
   					});
   			}
   			if(sort.contains("price") && sort.contains("descending")) {
   				System.out.println("price d");
   				Collections.sort(filter, new Comparator<Product>()
					{
						public int compare(Product p1,Product p2) {
							return Double.valueOf(p2.discountPrice).compareTo(p1.discountPrice);
						}
					});
   			}
   			if(sort.contains("trending") && sort.contains("ascending")) {
   				System.out.println("trending a");
   				Collections.sort(filter, new Comparator<Product>()
					{
						public int compare(Product p1,Product p2) {
							return Integer.valueOf(p1.getProduct_sold()).compareTo(p2.getProduct_sold());
						}
					});
   			}
   			if(sort.contains("trending") && sort.contains("descending")) {
   				System.out.println("trending d");
   				Collections.sort(filter, new Comparator<Product>()
				{
					public int compare(Product p1,Product p2) {
						return Integer.valueOf(p2.getProduct_sold()).compareTo(p1.getProduct_sold());
					}
				});
   			}
				//return new ResponseEntity<>(filter,HttpStatus.OK);
   			PagedListHolder<Product> pagedListHolder=new PagedListHolder<Product>(filter);
   	    	pagedListHolder.setPage(pageNo);
   	    	pagedListHolder.setPageSize(pageSize);
   	    	int size=pagedListHolder.getPageCount();
   	    	System.out.println(size);
   	    	ArrayList<Product> leo=new ArrayList<>(); 
   	    	if(pageNo>=size)
   	    		return new ResponseEntity<>(leo,HttpStatus.OK);
   	    	
   	    	
   	    		return new ResponseEntity<>(pagedListHolder.getPageList(),HttpStatus.OK);
    		
    		
    }
    
    
}
