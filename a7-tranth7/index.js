"use strict";

const express = require('express');
const app = express();
const PORT = 3000; 

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

let htmlTop = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset='utf-8'>
        <meta http-equiv='X-UA-Compatible' content='IE=edge'>
        <meta name= "robots" content="index, nofollow">
        <title>Thomas Tran</title>
        <meta name='viewport' content='width=device-width, initial-scale=1'>
        <link rel='stylesheet' type='text/css' media='screen' href='main.css'>
        <script src='main.js'></script>
        <link rel="apple-touch-icon" sizes="180x180" href="apple-touch-icon.png">
        <link rel="icon" type="image/png" sizes="512x512" href="android-chrome-512x512.png">
        <link rel="icon" type="image/png" sizes="192x192" href="android-chrome-192x192.png">
        <link rel="icon" type="image/png" sizes="32x32" href="favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="favicon-16x16.png">
        <link rel="manifest" href="site.webmanifest">
    </head>
    <body>
        <header>
            <h1>
                <img src="android-chrome-192x192.png" alt="favicon of website">
                Thomas Tran
            </h1>
        </header>
        <nav>
            <a href="./index.html">Home</a>
            <a href="./contact.html">Contact</a>
            <a href="./gallery.html">Gallery</a>
            <a href="./order.html">Order</a>
        </nav>
        <main>
`;

let htmlBottom = `
    </main>
    <footer>
    <p><span>&#169;</span> 2023 Thomas Tran </p>
    </footer>
    </body>
    </html>
`;

app.post('/submit_contact', (req, res) => {
    const name = req.body.name;
    const category = req.body.category;
    const contactMethod = req.body.contactMethod;
    const subscribeNewsletter = req.body.subscribeNewsletter;
    const message = req.body.message;
    const email = req.body.email
    const phone = req.body.phone

    
    res.send(`${htmlTop}
    <p><strong>Contact Form Submission</strong><br>
        Thank you for contacting us, ${name}. We will get back to you shortly.<br>
        You selected the category: ${category}.<br>
        Your preferred contact method is: ${contactMethod}.<br>
        ${subscribeNewsletter === 'yes' ? 'You have subscribed to our newsletter.' : 'You have chosen not to subscribe to our newsletter.'}<br>
        Your message: ${message}</p>
        Provide information :<br>
        Phone Number: ${phone} <br>
        Email Address: ${email}
    ${htmlBottom}`);
});

// ... (the rest of your code)





//_______________________________________________________________________________________




const productsData = require('./products.js').products;

function findChosenProduct(productValue) {
  for (const products of productsData) {
    if (products.product === productValue) {
      return products;
    }
  }
  return null;
}



app.post('/submit_order', (req, res) => { 
  const name = req.body.name;
  const address = req.body.address;
  const deliveryInstructions = req.body.deliveryInstructions;

  const chosenProduct = findChosenProduct(req.body.selectedProduct);

  if (!chosenProduct) {
    // Handle the case where chosenProduct is null or undefined
    return res.status(400).send('Invalid product selection.');
  }

  const companyName = chosenProduct.company || '';
  const quantity = parseInt(req.body.quantity) || 0;

  const totalAmount = quantity * chosenProduct.price;
  const formattedTotal = totalAmount.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

  res.send(`
    ${htmlTop}
    <h1>Order Form Response</h1>
    <p>Thank you, ${name}, for placing an order with us! You have just purchased ${quantity} ${chosenProduct.product || 'N/A'} from
    ${companyName}. Your total amount is ${formattedTotal}. Your order will be delivered to ${address} and you requestings
     for your order to be delivered with these instructions.${deliveryInstructions} Thanks for shopping with us!</p>
    ${htmlBottom}
  `);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


