import { useState } from 'react';
import styled from 'styled-components';
import PixelCard from './common/PixelCard';
import { testimonialsData } from '../data/portfolio';

const SliderContainer = styled.div`
  position: relative;
  overflow: hidden;
`;

const Slide = styled.div`
  display: ${props => (props.active ? 'block' : 'none')};
  padding: 20px;
  text-align: center;
`;

const Quote = styled.blockquote`
  font-size: 1rem;
  font-style: italic;
  color: var(--text-main);
  margin: 0 0 15px 0;
  line-height: 1.5;

  &::before, &::after {
    content: '"';
    color: var(--neon-pink);
  }
`;

const Author = styled.div`
  font-size: 0.9rem;
  color: var(--neon-cyan);
`;

const Title = styled.div`
    font-size: 0.8rem;
    color: var(--text-dim);
`;

const NavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0,0,0,0.3);
  border: 1px solid var(--text-dim);
  color: var(--neon-yellow);
  padding: 5px 10px;
  cursor: pointer;
  z-index: 10;
  font-size: 1.2rem;

  &:hover {
    border-color: var(--neon-pink);
  }

  ${props => props.direction === 'prev' ? 'left: 10px;' : 'right: 10px;'}
`;

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const length = testimonialsData.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(testimonialsData) || testimonialsData.length <= 0) {
    return null;
  }

  return (
    <PixelCard title="TESTIMONIALS">
      <SliderContainer>
        <NavButton onClick={prevSlide} direction="prev">&lt;</NavButton>
        {testimonialsData.map((testimonial, index) => (
          <Slide key={index} active={index === current}>
            <Quote>{testimonial.quote}</Quote>
            <Author>{testimonial.name}</Author>
            <Title>{testimonial.title}</Title>
          </Slide>
        ))}
        <NavButton onClick={nextSlide} direction="next">&gt;</NavButton>
      </SliderContainer>
    </PixelCard>
  );
};

export default Testimonials;
