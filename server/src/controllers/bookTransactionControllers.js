const { Userbooktransactions, Transactions, Books } = require("../../models");

exports.addBookTransaction = async (req, res) => {
  const { body } = req;

  try {
    const bookTransaction = await Userbooktransactions.create({
      ...body,
    });

    const resultBookTransaction = await Userbooktransactions.findOne({
      where: {
        id: bookTransaction.id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    res.send({
      status: "success",
      data: {
        resultBookTransaction,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Server Error",
    });
  }
};

exports.getBookTransactions = async (req, res) => {
  try {
    const bookTransactions = await Userbooktransactions.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    console.log(bookTransactions)

    for (i = 0; i < bookTransactions.length; i++) {
      const idTransaction = await Transactions.findOne({
        where: {
          id: bookTransactions[i].idTransaction,
        },
        attributes: {
          exclude: [
            "users",
            "transferProof",
            "productPurchased",
            "paymentTotal",
            "paymentStatus",
            "createdAt",
            "updatedAt"
          ],
        },
      });
      bookTransactions[i].idTransaction = idTransaction;
    }

    for (j = 0; j < bookTransactions.length; j++) {
      const idBook = await Books.findOne({
        where: {
          id: bookTransactions[j].idBook,
        },
        attributes: {
          exclude: [
            "email",
            "publicationDate",
            "pages",
            "author",
            "isbn",
            "price",
            "about",
            "bookThumbnail",
            "bookFile",
            "createdAt",
            "updatedAt",
          ],
        },
      });
      bookTransactions[j].idBook = idBook;
    }

    res.send({
      status: "success",
      data: {
        bookTransaction: bookTransactions,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: error,
    });
  }
};
