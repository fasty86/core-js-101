/* ************************************************************************************************
 *                                                                                                *
 * Please read the following tutorial before implementing tasks:                                   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object        *
 *                                                                                                *
 ************************************************************************************************ */


/**
 * Returns the rectangle object with width and height parameters and getArea() method
 *
 * @param {number} width
 * @param {number} height
 * @return {Object}
 *
 * @example
 *    const r = new Rectangle(10,20);
 *    console.log(r.width);       // => 10
 *    console.log(r.height);      // => 20
 *    console.log(r.getArea());   // => 200
 */
function Rectangle(width, height) {
  // throw new Error('Not implemented');
  this.width = width;
  this.height = height;
}

Rectangle.prototype.getArea = function () {
  return this.width * this.height;
};

/**
 * Returns the JSON representation of specified object
 *
 * @param {object} obj
 * @return {string}
 *
 * @example
 *    [1,2,3]   =>  '[1,2,3]'
 *    { width: 10, height : 20 } => '{"height":10,"width":20}'
 */
function getJSON(obj) {
  // throw new Error('Not implemented');
  return JSON.stringify(obj);
}


/**
 * Returns the object of specified type from JSON representation
 *
 * @param {Object} proto
 * @param {string} json
 * @return {object}
 *
 * @example
 *    const r = fromJSON(Circle.prototype, '{"radius":10}');
 *
 */
function fromJSON(proto, json) {
  // throw new Error('Not implemented');
  const obj = JSON.parse(json);
  const result = Object.create(proto);
  Object.keys(obj).forEach((key) => {
    result[key] = obj[key];
  });
  // obj.__proto__ = proto;
  return result;
}


/**
 * Css selectors builder
 *
 * Each complex selector can consists of type, id, class, attribute, pseudo-class
 * and pseudo-element selectors:
 *
 *    element#id.class[attr]:pseudoClass::pseudoElement
 *              \----/\----/\----------/
 *              Can be several occurrences
 *
 * All types of selectors can be combined using the combination ' ','+','~','>' .
 *
 * The task is to design a single class, independent classes or classes hierarchy
 * and implement the functionality to build the css selectors using the provided cssSelectorBuilder.
 * Each selector should have the stringify() method to output the string representation
 * according to css specification.
 *
 * Provided cssSelectorBuilder should be used as facade only to create your own classes,
 * for example the first method of cssSelectorBuilder can be like this:
 *   element: function(value) {
 *       return new MySuperBaseElementSelector(...)...
 *   },
 *
 * The design of class(es) is totally up to you, but try to make it as simple,
 * clear and readable as possible.
 *
 * @example
 *
 *  const builder = cssSelectorBuilder;
 *
 *  builder.id('main').class('container').class('editable').stringify()
 *    => '#main.container.editable'
 *
 *  builder.element('a').attr('href$=".png"').pseudoClass('focus').stringify()
 *    => 'a[href$=".png"]:focus'
 *
 *  builder.combine(
 *      builder.element('div').id('main').class('container').class('draggable'),
 *      '+',
 *      builder.combine(
 *          builder.element('table').id('data'),
 *          '~',
 *           builder.combine(
 *               builder.element('tr').pseudoClass('nth-of-type(even)'),
 *               ' ',
 *               builder.element('td').pseudoClass('nth-of-type(even)')
 *           )
 *      )
 *  ).stringify()
 *    => 'div#main.container.draggable + table#data ~ tr:nth-of-type(even)   td:nth-of-type(even)'
 *
 *  For more examples see unit tests.
 */

// class
const cssSelectorBuilder = {
  // path: [],
  // hier: ['element', 'id'],
  order: [
    'element',
    'id',
    'class',
    'attribute',
    'pseudo-class',
    'pseudo-element',
  ],
  element(value) {
    // throw new Error('Not implemented');
    let that = this;
    that = !this.path ? Object.create(this, { path: { value: [] } }) : this;
    that.check('element');
    that.checkOrder('element');
    that.path.push({ type: 'element', value });
    return that;
  },

  combinator(value) {
    let that = this;
    that = !this.path ? Object.create(this, { path: { value: [] } }) : this;
    // that.checkOrder('element');
    that.path.push({ type: 'combinator', value });
    // that.check();
    return that;
  },

  id(value) {
    // throw new Error('Not implemented');
    let that = this;
    that = !this.path ? Object.create(this, { path: { value: [] } }) : this;
    that.check('id');
    that.checkOrder('id');
    that.path.push({ type: 'id', value });
    return that;
  },

  class(value) {
    // throw new Error('Not implemented');
    let that = this;
    that = !this.path ? Object.create(this, { path: { value: [] } }) : this;
    that.checkOrder('class');
    that.path.push({ type: 'class', value });
    // that.check();
    return that;
  },

  attr(value) {
    // throw new Error('Not implemented');
    let that = this;
    that = !this.path ? Object.create(this, { path: { value: [] } }) : this;
    that.checkOrder('attr');
    that.path.push({ type: 'attr', value });
    // that.check();
    return that;
  },

  pseudoClass(value) {
    // throw new Error('Not implemented');
    let that = this;
    that = !this.path ? Object.create(this, { path: { value: [] } }) : this;
    that.checkOrder('pseudoClass');
    that.path.push({ type: 'pseudoClass', value });
    // that.check();
    return that;
  },

  pseudoElement(value) {
    // throw new Error('Not implemented');
    let that = this;
    that = !this.path ? Object.create(this, { path: { value: [] } }) : this;
    that.check('pseudoElement');
    that.path.push({ type: 'pseudoElement', value });
    return that;
  },

  combine(selector1, combinator, selector2) {
    let that = this;
    that = !this.path ? Object.create(this, { path: { value: [] } }) : this;
    selector1.path.forEach((element) => {
      that.path.push(element);
      return element;
    });
    that.path.push({ type: 'combinator', value: combinator });
    selector2.path.forEach((element) => {
      that.path.push(element);
      return element;
    });
    return that;
  },
  check(prop) {
    const keys = this.path.map(({ type }) => type);
    // const test = new Set(keys);
    if (keys.includes(prop)) {
      throw new Error(
        'Element, id and pseudo-element should not occur more then one time inside the selector',
      );
    }
  },
  checkOrder(prop) {
    const test = this.path.map(({ type }) => type);
    let values = [];
    let isExist = false;
    switch (prop) {
      case 'element':
        if (this.path.length > 0) {
          throw new Error(
            'Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element',
          );
        }
        break;
      case 'id':
        values = ['class', 'attr', 'pseudoClass', 'pseudoElement'];
        isExist = values.some((val) => test.includes(val));
        if (isExist) {
          throw new Error(
            'Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element',
          );
        }
        break;
      case 'class':
        values = ['attr', 'pseudoClass', 'pseudoElement'];
        isExist = values.some((val) => test.includes(val));
        if (isExist) {
          throw new Error(
            'Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element',
          );
        }
        break;
      case 'attr':
        values = ['pseudoClass', 'pseudoElement'];
        isExist = values.some((val) => test.includes(val));
        if (isExist) {
          throw new Error(
            'Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element',
          );
        }
        break;
      case 'pseudoClass':
        values = ['pseudoElement'];
        isExist = values.some((val) => test.includes(val));
        if (isExist) {
          throw new Error(
            'Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element',
          );
        }
        break;
      default:
        break;
    }
  },
  stringify() {
    let res = '';
    this.path.map(({ type, value }) => {
      // console.log(type, value);
      let val = value;
      switch (type) {
        case 'element':
          break;
        case 'id':
          val = `#${val}`;
          break;
        case 'class':
          val = `.${val}`;
          break;
        case 'attr':
          val = `[${val}]`;
          break;
        case 'pseudoClass':
          val = `:${val}`;
          break;
        case 'pseudoElement':
          val = `::${val}`;
          break;
        case 'combinator':
          val = ` ${val} `;
          break;
        default:
          break;
      }
      res = `${res}${val}`;
      return val;
    });
    return res;
  },
};

module.exports = {
  Rectangle,
  getJSON,
  fromJSON,
  cssSelectorBuilder,
};
