import {
  Types, ITEM_CLASS, ITEM_IMG_BOX_CLASS, ITEM_BODY_CLASS, ITEM_LABEL_BOX_CLASS,
} from '../models/types.js';

import Utils from '../utils.js';

export class Card {
    ref= null; // HTML element
    image = '';
    type = '';
    duration = 3600;
    title = '';

    constructor({ image = '', type = '', title = '', duration = 3600}) {
      this.image = image;
      this.type = type;
      this.duration = duration;
      this.title = title;
      this.renderTemplate();
    }
    renderTemplate() {
      this.ref = document.createElement('div');
      this.ref.classList.add(ITEM_CLASS);
      if ([Types.cardType.learning_plan, Types.cardType.playlist].includes(this.type)) {
        this.ref.classList.add('multicard');
      }
      this.ref.innerHTML = `
                <div class="${ITEM_IMG_BOX_CLASS}" style="background-image:url('${this.image}');"></div>
                <div class="${ITEM_LABEL_BOX_CLASS}">            
                  <div class="left-label">${this.type}</div>
                  <div class="right-label">${this.duration}</div>
                </div>
                <div class="${ITEM_BODY_CLASS} p-3">
                    <h3 class="text-primary">${this.title}</h3>
                </div>
            `;
    }
    static factory = {
      generetedCard: 0,
      getRandomCard() {
        this.generetedCard++;
        const _type = Types.factory.getRandomCardType();

        return new Card({
          image: 'https://picsum.photos/300/200?random=' + this.generetedCard,
          type: _type,
          duration: Utils.formatSeconds(Utils.getRandomInt(30, 8000)), // seconds => mm:ss
          title: `${Utils.getCardTitle(Utils.getRandomInt(3, 8))} ${this.generetedCard}`,
          cardinality: Types.factory.getRandomCardinalityType(),
        });
      },
    }
}
