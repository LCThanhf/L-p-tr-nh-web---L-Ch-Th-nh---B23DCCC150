const express = require('express');
const cors = require('cors');
const db = require('./src/configs/database.js');

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


//food items
app.get('/api/food-items', (req, res) => {
  const type = req.query.type;
  let query = 'SELECT * FROM food_items';
  if (type) {
    query += ' WHERE type = ?';
  }
  db.query(query, [type], (err, results) => {
    if (err) {
      console.error('Error fetching food items:', err);
      res.status(500).send('Server error');
      return;
    }
    res.json(results);
  });
});


//qr code and url
app.get('/api/table-info', (req, res) => {
  const qrCodeImage = req.query.qrCodeImage;
  const tableNumber = req.query.tableNumber;
  let query = '';
  let queryParam = '';

  if (qrCodeImage) {
    query = 'SELECT * FROM tables WHERE qr_code_image = ?';
    queryParam = qrCodeImage;
  } else if (tableNumber) {
    query = 'SELECT * FROM tables WHERE table_number = ?';
    queryParam = tableNumber;
  } else {
    res.status(400).send('Bad request');
    return;
  }

  db.query(query, [queryParam], (err, results) => {
    if (err) {
      console.error('Error fetching table info:', err);
      res.status(500).send('Server error');
      return;
    }
    if (results.length === 0) {
      res.status(404).send('Table not found');
      return;
    }
    res.json(results[0]);
  });
});


// order
app.post('/api/orders', (req, res) => {
  const { tableNumber, orderItems, totalAmount, paymentMethod } = req.body;
  const orderDate = new Date();
  const status = 'waiting';

  // Format the items as a string with the desired format
  const items = orderItems.map(item => `${item.name},${item.amount},${item.price}`).join('; ');

  const query = `
    INSERT INTO orders (table_number, items, total_amount, total_price, payment_method, order_date, status)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(query, [tableNumber, items, orderItems.length, totalAmount, paymentMethod, orderDate, status], (err, results) => {
    if (err) {
      console.error('Error saving order:', err);
      res.status(500).send('Server error');
      return;
    }
    res.status(201).send('Order saved successfully');
  });
});

// update order status
app.put('/api/orders/:id/status', (req, res) => {
  const orderId = req.params.id;
  const { status } = req.body;

  const query = `
    UPDATE orders
    SET status = ?
    WHERE id = ?
  `;

  db.query(query, [status, orderId], (err, results) => {
    if (err) {
      console.error('Error updating order status:', err);
      res.status(500).send('Server error');
      return;
    }
    if (results.affectedRows === 0) {
      res.status(404).send('Order not found');
      return;
    }
    res.status(200).send('Order status updated successfully');
  });
});


// service request
app.post('/api/requests', (req, res) => {
  const { tableNumber, notes } = req.body;

  const query = `
    INSERT INTO requests (table_number, notes)
    VALUES (?, ?)
  `;

  db.query(query, [tableNumber, notes], (err, results) => {
    if (err) {
      console.error('Error saving request:', err);
      res.status(500).send('Server error');
      return;
    }
    res.status(201).send('Request saved successfully');
  });
});