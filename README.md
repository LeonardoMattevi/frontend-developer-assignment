# Reusable Carousel Component
A reusable carousel component

## Setup

```sh
npm i
```

```html
<script type="module" src="[path]/carousel.min.js"></script>
```

## Demo

```sh
npm run dev
```

## Usage
```html
    <html>
        <link href="https://fonts.googleapis.com/css?family=Material+Icons" rel="stylesheet">
        <link href="[path]/css/style.css" rel="stylesheet">
        <link href="[path]/css/carousel.css" rel="stylesheet">
        <script type="module" src="[path]/carousel.min.js"></script>
    </head>
    <body>        
        <div id="carousel1"></div>
        
        <script type="module">
            import { Carousel, Card, Utils, Types } from "./js/components/carousel.js";
            const options = {
                image = 'https://picsum.photos/300/200', 
                type = 'video',   // Types.cardType (video, elearning, learning_plan, playlist)
                title = 'Velit nec tristique viverra', 
                duration = 360 // seconds
            };
            const oprionCarousel1 = {
                container: 'carousel1', // id selector
                title: 'Ellentesque posuere iaculis justo',
                subtitle: 'Aliquam porta, velit nec tristique viverra, ex mi vulputate sapien',                    
                icon: '<font material icon name>',
                fetchCard: function () {
                    /* code that retun a chank list of cards dataset */
                    return [
                        [ new Card(options), new Card(options), new Card(options), new Card(options), new Card(options) ],
                        [ new Card(options), new Card(options), new Card(options), new Card(options), new Card(options) ],
                    ];
                }
            }
            const carusel1 = new Carousel(oprionCarousel1);
        </script>
    </body>
```
