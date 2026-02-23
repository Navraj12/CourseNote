const express = require('express');
const app = express();
const connectTodDatabase = require('./database/index.js');
const Book = require('./model/bookModel.js');
const fs = require('fs');
const cors = require('cors');
// const { multer, storage } = require('./middleware/multerConfig.js');
const upload = require('./middleware/multerConfig.js');

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.static("./storage/"));
app.use("/uploads", express.static("uploads"))

connectTodDatabase();

app.get("/", (req, res) => {
    res.status(200).json({ message: "Success" });
});

app.post("/book", upload.single('image'), async(req, res) => {
    try {
        const imageUrl = req.file ? "http://localhost:3000/" + req.file.filename : null;
        const { bookName, bookPrice, isbnNumber, authorName, publishedAt } = req.body;
        await Book.create({
            bookName,
            bookPrice,
            isbnNumber,
            authorName,
            publishedAt,
            imageUrl
        });
        res.status(201).json({ message: "Book created successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error creating book", error: error.message });
    }
});

// Read All Books
app.get("/book", async(req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json({ message: "Books fetched successfully", data: books });
    } catch (error) {
        res.status(500).json({ message: "Error fetching books", error: error.message });
    }
});

// Read Single Book
app.get("/book/:id", async(req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json({ message: "Book fetched successfully", data: book });
    } catch (error) {
        res.status(500).json({ message: "Error fetching book", error: error.message });
    }
});

// Delete Book
app.delete("/deletebook/:id", async(req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json({ message: "Book deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting book", error: error.message });
    }
});

// Update Book
app.patch("/book/:id", upload.single('image'), async(req, res) => {
    try {
        const id = req.params.id;
        const { bookName, bookPrice, isbnNumber, authorName, publishedAt } = req.body;
        const oldBook = await Book.findById(id);
        if (!oldBook) {
            return res.status(404).json({ message: "Book not found" });
        }
        let fileName = oldBook.imageUrl;
        if (req.file) {
            const oldImagePath = oldBook.imageUrl.replace("http://localhost:3000/", "");
            fs.unlink(`storage/${oldImagePath}`, (err) => {
                if (err) console.log("Error deleting old image:", err);
            });
            fileName = "http://localhost:3000/" + req.file.filename;
        }

        await Book.findByIdAndUpdate(id, {
            bookName,
            bookPrice,
            isbnNumber,
            authorName,
            publishedAt,
            imageUrl: fileName
        });

        res.status(200).json({ message: "Book updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error updating book", error: error.message });
    }
});

app.listen(3000, () => {
    console.log("Nodejs server has started at port 3000");
});
console.log("Nodejs server has started at port 3000");