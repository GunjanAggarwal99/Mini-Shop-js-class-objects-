// Import stylesheets
import './style.css';

// Write Javascript code!

class Product {
  title = 'DEFAULT';
  imageUrl;
  discription;
  price;

  constructor(title, image, disc, price) {
    this.title = title;
    this.imageUrl = image;
    this.discription = disc;
    this.price = price;
  }
}
class ElementAttribute {
  constructor(attributeName, attributeValue) {
    this.name = attributeName;
    this.value = attributeValue;
  }
}
class Component {
  constructor(renderHookId) {
    this.hookId = renderHookId;
  }

  createRootElement(tag, cssClass, attribute) {
    const rootEl = document.createElement(tag);
    if (cssClass) {
      rootEl.className = cssClass;
    }
    if (attribute && attribute.length > 0) {
      for (const arr of attribute) {
        rootEl.setAttribute(arr.name, arr.value);
      }
    }
    document.getElementById(this.hookId).append(rootEl);
    return rootEl;
  }
}
class ShoppingCard extends Component {
  constructor(renderHookId) {
    super(renderHookId);
  }
  item = [];
  set cardItem(value) {
    this.item = value;
    this.totalOutput.innerHTML = `<h2>Total: \$${this.totalAmount.toFixed(
      2
    )}</h2>`;
  }

  get totalAmount() {
    const sum = this.item.reduce((prev, curr) => {
      return prev + curr.price;
    }, 0);
    return sum;
  }

  addProduct(product) {
    const updateItem = [...this.item];
    updateItem.push(product);
    this.cardItem = updateItem;
  }

  rendor() {
    const cardEl = this.createRootElement('section', 'cart');
    cardEl.innerHTML = `
     <h2>Total: \$${0}</h2>
     <button>Order Now!</button>
    `;
    this.totalOutput = cardEl.querySelector('h2');
    // return cardEl;
  }
}

class ProductItem extends Component {
  constructor(product, renderHookId) {
    super(renderHookId); // call first as its component constructor
    this.product = product;
  }

  addToCart() {
    App.addProductToCart(this.product);
  }

  rendor() {
    const prodEl = this.createRootElement('li', 'product-item');
    // prodEl.className = 'product-item';
    prodEl.innerHTML = `
       <div>
       <img src='${this.product.imageUrl}' alt='${this.product.title}'>
       </div>
       <div class="product-item__content">
        <h2>${this.product.title}</h2>
        <h3>\$${this.product.price}</h3>
        <p>${this.product.discription}</p>
        <button>Add to Cart</button>
       </div>
      `;
    const AddCartBtn = prodEl.querySelector('button');
    AddCartBtn.addEventListener('click', this.addToCart.bind(this));
    // return prodEl;
  }
}

class ProductList extends Component {
  products = [
    new Product(
      'Echo Dot (3rd Gen)',
      'https://m.media-amazon.com/images/I/61IfOpQwIEL._SX522_.jpg',
      'Alexa smart speaker with loud 360 degree sound & Bluetooth',
      2499
    ),
    new Product(
      'Noise Pulse Go Buzz Bluetooth Calling Smart Watch',
      'https://m.media-amazon.com/images/I/61wJNP17lEL._SX425_.jpg',
      '1.69" Clear Display, 550Nits,150+ Watch face, Comfort Strap, Heart Rate, Steps & Sleep Tracker, IP68, 7 Days Battery(Rose Pink)',
      1699
    ),
  ];

  constructor(renderHookId) {
    super(renderHookId);
  }

  rendor() {
    // const prodList = document.createElement('ul');
    this.createRootElement('ul', 'product-list', [
      new ElementAttribute('id', 'prod-list'),
    ]);
    // prodList.className = 'product-list';
    for (const prod of this.products) {
      const productItem = new ProductItem(prod, 'prod-list');
      productItem.rendor();
      // const prodEl = productItem.rendor();
      // prodList.append(prodEl);
    }
    // return prodList;
  }
}

class MiniShopApp {
  rendor() {
    // const rendrHook = document.getElementById('app');

    this.cart = new ShoppingCard('app');
    this.cart.rendor();
    // const shoppingCardEl = this.cart.rendor();

    const productList = new ProductList('app');
    productList.rendor();
    // const productListEl = productList.rendor();

    // rendrHook.append(shoppingCardEl);
    // rendrHook.append(productListEl);
  }
}

class App {
  static cart;
  static init() {
    const shop = new MiniShopApp();
    shop.rendor();
    this.cart = shop.cart;
  }
  static addProductToCart(product) {
    this.cart.addProduct(product);
  }
}

App.init();
