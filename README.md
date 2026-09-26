# Huxton — Gaming Laptop Store (Demo)

![HTML](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

A responsive landing page and storefront for **Huxton**, a fictional gaming and business laptop brand. Built with plain HTML, CSS and JavaScript: no frameworks, no build step.

🔗 **Live demo:** https://goodoldhuxton.github.io/huxton-site/

> This is a portfolio project. Huxton is not a real company and the store does not take orders.

## Features

- 🎮 **Dark gaming theme** with gradient accents and an animated hero section
- 🗂️ **Category filter** for gaming, business and ultrabook models
- 🛒 **Working cart drawer** where you can add and remove items and change quantities. The cart is saved in `localStorage`, so it survives a page refresh
- 📱 **Fully responsive** layout with a mobile hamburger menu
- ✉️ **Contact form** with client-side validation
- ⚡ **Lightweight:** three files and no dependencies. Laptop images are inline SVG

## Project structure

```
index.html   Page layout and sections
style.css    Theme, layout and responsive styles
script.js    Product data, filtering, cart and form logic
```

## Run locally

Clone the repo and open `index.html` in your browser:

```bash
git clone https://github.com/GoodoldHuxton/huxton-site.git
```

## Customization

Products live in the `products` array at the top of `script.js`. Each product has a name, category, badge, price, optional old price, gradient colors and a list of specs. Add, remove or edit entries there and the page updates automatically. Theme colors are CSS variables at the top of `style.css`.

## License

MIT
