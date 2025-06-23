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
    "/Imagen de WhatsApp 2025-06-21 a las 11.31.53_99a99078.jpg",
    "/Imagen de WhatsApp 2025-06-21 a las 11.32.16_757771a0.jpg",
    "/Imagen de WhatsApp 2025-06-21 a las 11.32.39_1fe97f34.jpg",
    "/Imagen de WhatsApp 2025-06-21 a las 11.33.17_f05593b4.jpg"
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