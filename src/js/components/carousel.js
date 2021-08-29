import {
  Types, CAROUSEL_ITEM_SPACE, CONTAINER_CLASS, CART_ITEMS_CLASS, ITEM_CLASS,
} from '../models/types.js';
import { Card } from './card.js';
import Utils from '../utils.js';

export const CAROUSEL_CHUNK_ITEMS = 6;
export class Carousel {
    cardList = [];
    container = null; // HTML element ref
    carretBox = null; // HTML element ref
    cardShowMore = null; // HTML element ref
    goRightArrow = null; // HTML element ref
    goLeftArrow = null; // HTML element ref
    dragCoordinatesX = 0;
    dragCoordinatesY = 0;

    // comopnent properties
    icon = '';
    title = '';
    subtitle = '';
    fetchCards = null;
    indexPosition= 0;
    isLoading = false;

    constructor({
      container,
      title,
      subtitle,
      icon,
      fetchCard,
    }) {
      if (!container) {
        throw new Error('missing container property');
      }
      this.container = document.querySelector(container.startsWith('#') ? container : `#${container}`);
      this.container.classList.add(CONTAINER_CLASS);
      this.title = title;
      this.subtitle = subtitle;
      this.icon = icon;
      this.fetchCardsFN = fetchCard;
      this.init();
    }

    async init() {
      this.renderTemplate();
    }

    renderTemplate() {
      if (!this.container) return;
      this.container.innerHTML = `
            <div>
                <span class="badge badge-primary float-left mr-3 mb-3">
                    <span class="material-icons">${this.icon}</span>
                </span>
                <h2 class="leo-carousel-title text-primary">${this.title}&nbsp;<span class="material-icons">keyboard_arrow_right</span></h2>
                <h4 class="carousel-subtitle text-secondary">${this.subtitle}</h4>
            </div>
        `;
      // render carousel carret
      this.carretBox = document.createElement('div');
      this.carretBox.classList.add(CART_ITEMS_CLASS);
      this.container.append(this.carretBox);
      // reder more options button
      this.cardShowMore = document.createElement('div');
      this.cardShowMore.classList.add(ITEM_CLASS);
      this.cardShowMore.classList.add('card-show-more');
      this.cardShowMore.innerHTML = '<h2>Show<br> more <br>cards...</h2>';
      // reder go left button
      this.goLeftArrow = document.createElement('div');
      this.goLeftArrow.classList.add('carret-btn');
      this.goLeftArrow.classList.add('go-left');
      this.goLeftArrow.innerHTML = '<span class="material-icons material-icons-outlined">navigate_before</span>';
      this.goLeftArrow.classList.add('hidebox');
      this.carretBox.append(this.goLeftArrow);
      // render go right button
      this.goRightArrow = document.createElement('div');
      this.goRightArrow.classList.add('carret-btn');
      this.goRightArrow.classList.add('go-right');
      this.goRightArrow.innerHTML = '<span class="material-icons material-icons-outlined">keyboard_arrow_right</span>';
      this.carretBox.append(this.goRightArrow);

      // events
      this.container.addEventListener('mousedown', (e) => {
        this.dragCoordinatesX = e.clientX;
        this.dragCoordinatesY = e.clientY;
      });
      this.container.addEventListener('mouseup', (e) => {
        const dragX = this.dragCoordinatesX - e.clientX;
        const dragY = this.dragCoordinatesY - e.clientY;

        // if drag enough go left or right
        if (Math.abs(dragX) > Math.abs(dragY)) {
          if (dragX > 50) {
            this.goRight();
          }
          if (dragX < -50) {
            this.goLeft();
          }
        }

        this.dragCoordinatesX = 0;
        this.dragCoordinatesY = 0;
      });
      this.goLeftArrow.addEventListener('click', () => {
        this.goRight();
      });
      this.goRightArrow.addEventListener('click', () => {
        this.goLeft();
      });
      this.cardShowMore.addEventListener('click', () => {
        this.addMoreCards();
      });
      this.addMoreCards(true);
    }

    async addMoreCards(firstDrop) {
      if (this.isLoading) {return;}

      let showMoreCard = null;

      // get from array special card element (show more cards...) ant for put it in the end
      if (this.cardList.length > 0) {
        showMoreCard = this.cardList.pop();
      } else {
        showMoreCard = { ref: this.cardShowMore };
      }
      this.isLoading = true;
      const newCardsChunks = await this.fetchCardsFN();

      let newCards = [];

      // flat chunks
      for (const chunk of newCardsChunks) {
        newCards = [...newCards, ...chunk];
      }

      this.isLoading = false;
      // set new cards
      this.cardList = [...this.cardList, ...newCards, showMoreCard];
      for (let i = 0; i < this.cardList.length; i++) {
        const card = this.cardList[i].ref;

        this.carretBox.append(card);
      }
      if (!firstDrop) this.showArrows();
      this.positioningCards(true);
    }
    goRight() {
      if (this.indexPosition >= -1) {
        this.goLeftArrow.classList.add('hidebox');
        if (this.indexPosition >= 0) {
          return;
        }
      } else {
        this.showArrows();
      }
      this.indexPosition++;
      this.positioningCards();
    }
    goLeft() {
      if (this.cardList.length === 0) return;
      // rigth limit
      const diffCardsSpace = (this.cardList.length - parseInt(document.body.offsetWidth / (this.cardList[0].ref.offsetWidth + CAROUSEL_ITEM_SPACE), 10)) - 1;

      if (this.indexPosition <= -diffCardsSpace) {
        this.goRightArrow.classList.add('hidebox');
        if (this.indexPosition < -diffCardsSpace) {
          return;
        }
      } else {
        this.showArrows();
      }
      this.indexPosition--;
      this.positioningCards();
    }
    showArrows() {
      this.goRightArrow.classList.remove('hidebox');
      this.goLeftArrow.classList.remove('hidebox');
    }
    positioningCards(withoutAnimation) {
      for (let i = 0; i < this.cardList.length; i++) {
        const position = i + this.indexPosition;
        const card = this.cardList[i].ref;

        card.classList.remove('animated');
        if (!withoutAnimation) {card.classList.add('animated');}
        card.style.left = (position * card.offsetWidth + (position * CAROUSEL_ITEM_SPACE)) + 'px';
      }
    }

}

export { Card };
export { Utils };
export { Types };
