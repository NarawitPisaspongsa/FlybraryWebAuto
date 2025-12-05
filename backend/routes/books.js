import express from "express";
import { getBooks, getBook, borrowBook, returnBook, getBooksBorrowedByUser } from "../controllers/book.js";

const router = express.Router();

router.get('/', getBooks)
router.get('/:id', getBook)
router.get('/user/:id', getBooksBorrowedByUser)
router.put('/borrow/:id', borrowBook)
router.put('/return/:id', returnBook)

module.exports = router;
export default router;