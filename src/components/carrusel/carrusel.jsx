import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



const CarouselWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
  box-sizing: border-box;

  @media (min-width: 1024px) {
    width: 70%;
    margin: 1rem auto;
  }

`;

const SlideContainer = styled.div`
  border-radius: 14px;
  overflow: hidden;
`;

const SlideImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
  border-radius: 14px;
`;

const PropagandaCarousel = () => {

    const imagenes = [
      "/11.webp",
      "/12.webp",
      "/13.jpg",
      "/14.jpg",
      "/15.jpg"
    // "/1.jpg",
    // "/2.jpg",
    // "/3.jpg",
    // "/4.jpg",
    // "/5.jpg",
    // "/6.jpg",
    // "/7.jpg"
];


  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    pauseOnHover: true,
    speed: 500
  };

  return (
    <CarouselWrapper>
      <Slider {...settings}>
        {imagenes.map((src, index) => (
          <SlideContainer key={index}>
            <SlideImage src={src} alt={`slide-${index}`} />
          </SlideContainer>
        ))}
      </Slider>
    </CarouselWrapper>
  );
};

export default PropagandaCarousel;