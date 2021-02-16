const express = require("express");
const router = express.Router();

const { register, login } = require("../controllers/authControllers");
const { addBook, getBooks, getBookDetail } = require("../controllers/bookControllers");
const { addTransaction, getTransactions } = require("../controllers/transactionControllers");
const { uploadBookNew } = require("../middlewares/uploadBook");
const { uploadTransactionProof } = require("../middlewares/uploadTransaction");

router.post("/register", register)
router.post("/login", login)

router.get("/books", getBooks)
router.get("/book/:id", getBookDetail)
router.post("/book", uploadBookNew("bookThumbnail", "bookFile"), addBook)

router.get("/transactions", getTransactions)
router.post("/transaction", uploadTransactionProof("transferProof"), addTransaction)

module.exports = router;