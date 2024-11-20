const Book = require('./book.model');
const cloudinary = require('../../utils/cloudinary.config')

const postBook = async (req, res) => {
    try {
      // Ensure coverImage is provided in the request body
      const { coverImage, ...bookData } = req.body;
  
      if (!coverImage) {
        return res.status(400).send({ message: "Cover image URL is required!" });
      }
  
      // Create a new book with the provided coverImage URL
      const newBook = new Book({
        ...bookData,
        coverImage, // Use the Cloudinary URL from the request body
      });
  
      await newBook.save();
      res.status(200).send({ message: "Book posted successfully!", book: newBook });
  
    } catch (error) {
      console.error("Error: Creating Book", error);
      res.status(500).send({ message: "Book post failed!" });
    }
  };
  


const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find().sort({createdAt: -1})
        res.status(200).send(books)
    } catch (error) {
        console.error("Error: Fetching Book", error);
        res.status(500).send({message: "Fetch books failed!"})
    }
}

const getSingleBook = async (req, res) => {
    try {
        const {id} = req.params
        const book = await Book.findById(id)
        if(!book) {
            res.status(404).send({message: "Book not found!"})
        }
        res.status(200).send(book)
    } catch (error) {
        console.error("Error: Fetching a Book", error);
        res.status(500).send({message: "Fetch the book failed!"})
    }
}

const updateBook = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if the book exists
        const existingBook = await Book.findById(id);
        if (!existingBook) {
            return res.status(404).send({ message: "Book not found!" });
        }

        // Handle image upload if a new file is provided
        let updatedData = { ...req.body }; // Copy all incoming data
        if (req.file && req.file.path) {
            updatedData.coverImage = req.file.path; // Cloudinary automatically provides the file path as URL
        }

        // Update book in the database
        const updatedBook = await Book.findByIdAndUpdate(id, updatedData, { new: true });
        
        res.status(200).send({
            message: "Book updated successfully",
            book: updatedBook,
        });
    } catch (error) {
        console.error("Error: Updating a Book", error);
        res.status(500).send({ message: "Failed to update the book!" });
    }
};


const deleteBook = async (req, res) => {
    try {
        const {id} = req.params
        const deletedBook = await Book.findByIdAndDelete(id)
        if(!deletedBook){
            res.status(404).send({message: "Book is not found!"})
        }
        res.status(200).send({
            message: "Book deleted successfully",
            book: deletedBook
        })
    } catch (error) {
        console.error("Error: Deleting a Book", error);
        res.status(500).send({message: "Delete a book failed!"})        
    }
}


module.exports = {
    postBook,
    getAllBooks,
    getSingleBook,
    updateBook,
    deleteBook
}