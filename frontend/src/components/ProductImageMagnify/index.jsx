// import { useContext, useRef, useState } from "react";
// import ReactImageMagnify from "react-image-magnify";
// import { ScreenContext } from "../../contexts/screenContext";

export default function ProductImageMagnify({ product, open, setModalChild }) {
  // const mobileScreen = useContext(ScreenContext);

  // const [imgSize, setImgSize] = useState({ width: 0, height: 0 });
  // const containerRef = useRef(null);

  // const img = new Image();
  // img.src = product.product_imageUrl;
  // img.onload = () => {
  //   setImgSize({ width: img.width, height: img.height });
  // };

  return (
    <div
      onClick={() => {
        open();
        setModalChild("image");
      }}
      className="img-wrapper w-full h-full"
      // ref={containerRef}
    >
      {/* {mobileScreen ? ( */}
      <img
        className="w-full h-full object-contain"
        src={product.product_imageUrl}
        alt={product.product_name}
        onError={({ currentTarget }) => {
          currentTarget.onerror = null;
          currentTarget.src = `http://via.placeholder.com/640?text=UNAVAILABLE`;
        }}
      />
      {/*
      ) : (
        <ReactImageMagnify
          {...{
            smallImage: {
              alt: product.product_name,
              // isFluidWidth: true,
              width:
                (imgSize.width / imgSize.height) *
                containerRef.current?.clientHeight,
              height: containerRef.current?.clientHeight,
              src: product.product_imageUrl,
              onError: ({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src = `http://via.placeholder.com/640?text=UNAVAILABLE`;
              },
            },
            largeImage: {
              src: product.product_imageUrl,
              width: imgSize.width,
              height: imgSize.height,
            },
            // isHintEnabled: true,
            enlargedImageContainerStyle: {
              zIndex: 100,
              backgroundColor: "rgba(0,0,0,0.5)",
            },
            enlargedImageContainerDimensions: {
              width: "200%",
              height: "100%",
            },
            imageClassName: "w-full h-full object-contain",
            imageStyle: {
              objectFit: "contain",
            },
            enlargedImageStyle: {
              objectFit: "contain",
            },
            lensStyle: {
              background: "rgba(22, 78, 99, .3)",
              border: "2px dashed #ccc",
            },
            shouldUsePositiveSpaceLens: true,
          }}
        />
      )}
      */}
    </div>
  );
}
