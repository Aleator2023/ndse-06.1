const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let books = [];

// Авторизация пользователя
app.post('/api/user/login', (req, res) => {
  res.status(201).json({ id: 1, mail: "test@mail.ru" });
});

// Получить все книги
app.get('/api/books', (req, res) => {
  res.json(books);
});

// Получить книгу по ID
app.get('/api/books/:id', (req, res) => {
  const book = books.find(b => b.id === req.params.id);
  if (book) {
    res.json(book);
  } else {
    res.status(404).send('Книга не найдена');
  }
});

// Создать книгу
app.post('/api/books', (req, res) => {
  const newBook = { ...req.body, id: (books.length + 1).toString() };
  books.push(newBook);
  res.status(201).json(newBook);
});

// Редактировать книгу по ID
app.put('/api/books/:id', (req, res) => {
  const bookIndex = books.findIndex(b => b.id === req.params.id);
  if (bookIndex !== -1) {
    books[bookIndex] = { ...books[bookIndex], ...req.body };
    res.json(books[bookIndex]);
  } else {
    res.status(404).send('Книга не найдена');
  }
});

// Удалить книгу по ID
app.delete('/api/books/:id', (req, res) => {
  const bookIndex = books.findIndex(b => b.id === req.params.id);
  if (bookIndex !== -1) {
    books.splice(bookIndex, 1);
    res.send('ok');
  } else {
    res.status(404).send('Книга не найдена');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
