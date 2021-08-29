import Utils from '../utils.js';

const CLASS_PREFIX = 'leo-carousel';

export const CAROUSEL_ITEM_SPACE = 20; // px
export const CONTAINER_CLASS = `${CLASS_PREFIX}`;
export const CART_ITEMS_CLASS = `${CLASS_PREFIX}-cart`;
export const ITEM_CLASS = `${CLASS_PREFIX}-item`;
export const ITEM_IMG_BOX_CLASS = `${CLASS_PREFIX}-img-box`;
export const ITEM_LABEL_BOX_CLASS = `${CLASS_PREFIX}-labels-box`;
export const ITEM_BODY_CLASS = `${CLASS_PREFIX}-body`;

export class Types {
  static get cardType() {
    return {
      video: 'video',
      elearning: 'elearning',
      learning_plan: 'learning plan',
      playlist: 'playlist',
    };
  };
  static get cardinalityType() {
    return {
      single: 'single',
      collection: 'collection',
    };
  };
  static get iconType() {
    return {
      settings: 'settings',
      lightbulb: 'lightbulb',
      star_border: 'star_border',
      flight: 'flight',
      wb_sunny: 'wb_sunny',
      nightlight: 'nightlight',
    };
  };

    static factory = {
      getRandomCardType() {
        const keys = Object.keys(Types.cardType);
        const indexKey = Utils.getRandomInt(0, keys.length - 1);

        return Types.cardType[keys[indexKey]];
      },
      getRandomCardinalityType() {
        const keys = Object.keys(Types.cardinalityType);
        const indexKey = Utils.getRandomInt(0, keys.length - 1);

        return Types.cardinalityType[keys[indexKey]];
      },
      getRandomIconType() {
        const keys = Object.keys(Types.iconType);
        const indexKey = Utils.getRandomInt(0, keys.length - 1);

        return Types.iconType[keys[indexKey]];
      },
    }
}
