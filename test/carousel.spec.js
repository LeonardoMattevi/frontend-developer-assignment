import { Carousel, Card } from '../src/js/components/carousel.js';

function initTest() {
  document.body.innerHTML = '<div id="carousel1"></div>';
  return new Carousel(
    {
      container: 'carousel1',
      title: 'ellentesque posuere iaculis justo',
      subtitle: 'Aliquam porta, velit nec tristique viverra, ex mi vulputate sapien',
      icon: 'test',
      fetchCard: function () {
        const chunkNumber = 2;
        const chunksCardList = [];

        for (let i = 0; i < chunkNumber; i++) {
          const cardList = [];

          for (let j = 0; j < 6; j++) {
            cardList.push(Card.factory.getRandomCard());
          }
          chunksCardList.push(cardList);
        }

        return chunksCardList;
      },
    },
  );
}

describe('Carousel tests', () => {
  it('Check carousel indexPosition', () => {
    const carusel = initTest();

    setTimeout(() => {
      expect(carusel.cardList.length).toBe(12);
      expect(carusel.indexPosition).toBe(0);
      carusel.goLeft();
      expect(carusel.indexPosition).toBe(1);
      carusel.goRight();
      expect(carusel.indexPosition).toBe(0);
      carusel.goRight();
      expect(carusel.indexPosition).toBe(0);
    });
  });

  it('Check carousel method addMoreCards', () => {
    const carusel = initTest();

    setTimeout(() => {
      expect(carusel.cardList.length).toBe(12);
      carusel.addMoreCards();
      expect(carusel.cardList.length).toBe(24);
    });
  });

  it('Check carousel method showArrows', () => {
    const carusel = initTest();

    setTimeout(() => {
      carusel.goRightArrow.classList.add('hidebox');
      carusel.goRightArrow.classList.add('hidebox');
      carusel.showArrows();
      expect(carusel.goRightArrow.classList.contains('hidebox')).toBe(false);
      expect(carusel.goRightArrow.classList.contains('hidebox')).toBe(false);
    });
  });

  it('Check carousel toThrow', () => {
    try {
      const carusel = new Carousel({});

      carusel.showArrows();
    } catch (err) {
      expect(err.message).toBe('missing container property');
    }
  });
});
