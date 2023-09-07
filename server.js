const express = require('express');
const app = express();
const port = 3000;

app.use(express.json()); // Parse incoming JSON data

const data = []; // Sample data storage (in-memory)

// Create a new item
app.post('/api/items', (req, res) => {
  const newItem = req.body;
  data.push(newItem);
  res.json({ message: 'Item added successfully', item: newItem });
});

// Read all items
app.get('/api/items', (req, res) => {
  res.json(data);
});

// Update an item by ID
app.put('/api/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const updatedItem = req.body;

  const itemToUpdate = data.find(item => item.id === itemId);
  if (itemToUpdate) {
    Object.assign(itemToUpdate, updatedItem);
    res.json({ message: 'Item updated successfully', item: itemToUpdate });
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

// Delete an item by ID
app.delete('/api/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id);

  const indexToRemove = data.findIndex(item => item.id === itemId);
  if (indexToRemove !== -1) {
    const removedItem = data.splice(indexToRemove, 1);
    res.json({ message: 'Item deleted successfully', item: removedItem[0] });
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
