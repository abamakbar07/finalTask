const express = require("express");
const router = express.Router();

const { register, login, checkAuth } = require("../controllers/authControllers");
const { addBook, getBooks, getBookDetail } = require("../controllers/bookControllers");
const { addTransaction, getTransactions, editTransaction } = require("../controllers/transactionControllers");
const { getUser, editUser } = require("../controllers/userControllers");
const { loginAuth } = require("../middlewares/auth");
const { uploadBookNew } = require("../middlewares/uploadBook");
const { uploadTransactionProof } = require("../middlewares/uploadTransaction");

router.post("/register", register)
router.post("/login", login)
router.get("/check-auth", loginAuth, checkAuth);

router.get("/user/:id", getUser)
router.post("/user/edit", editUser)

router.get("/books", getBooks)
router.get("/book/:id", getBookDetail)
router.post("/book", uploadBookNew("bookThumbnail", "bookFile"), addBook)

router.get("/transactions", getTransactions)
router.get("/transactions", getTransactions)
router.patch("/transaction/:id", editTransaction);
router.post("/transaction", uploadTransactionProof("transferProof"), addTransaction)

module.exports = router;