package com.ecommerce.dto;

public class wishlistDTO {

	public ProductAverageRatingDTO productAverageRatingDTO;
	boolean wishlisted = false;

	public ProductAverageRatingDTO getProductAverageRatingDTO() {
		return productAverageRatingDTO;
	}

	public void setProductAverageRatingDTO(ProductAverageRatingDTO productAverageRatingDTO) {
		this.productAverageRatingDTO = productAverageRatingDTO;
	}

	public boolean isWishlisted() {
		return wishlisted;
	}

	public void setWishlisted(boolean wishlisted) {
		this.wishlisted = wishlisted;
	}

	public wishlistDTO(ProductAverageRatingDTO productAverageRatingDTO, boolean wishlisted) {
		super();
		this.productAverageRatingDTO = productAverageRatingDTO;
		this.wishlisted = wishlisted;
	}

	public wishlistDTO() {
		super();
	}

}
