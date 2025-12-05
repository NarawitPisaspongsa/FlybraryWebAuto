import express from "express";
import { getBooks, getBook, borrowBook, returnBook } from "../controllers/book.js";

const router = express.Router();

router.get('/books', getBooks)
router.get('/books/:id', getBook)
router.put('/books/borrow/:id', borrowBook)
router.put('/books/return/:id', returnBook)

module.exports = router;
export default router;