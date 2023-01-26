package com.ecommerce.Entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

@Document
//@Data
public class AdminRefreshToken {
	 @Id
	    String id;
	    @DocumentReference(lazy = true)
	    private Admin owner;
		public String getId() {
			return id;
		}
		public void setId(String id) {
			this.id = id;
		}
		public Admin getOwner() {
			return owner;
		}
		public void setOwner(Admin owner) {
			this.owner = owner;
			System.out.println("owner="+this.owner);
		}
}
