const Book = require('./book.model');
const cloudinary = require('../../utils/cloudinary.config')

const postBook = async (req, res) => {
    try {
      const { body } = req;
  
      // Ensure that the frontend sends coverImages as an array of URLs
      if (!body.coverImage || body.coverImage.length === 0) {
        return res.status(400).send({ message: "At least one image is required!" });
      }
  
      // The coverImages are already passed as Cloudinary URLs from the frontend
      const coverImages = body.coverImage; // No need to use files here
  
      const newBook = new Book({
        ...body,
        coverImage: coverImages, // Save the array of Cloudinary URLs
      });
  
      await newBook.save();
      res.status(200).send({ message: "Book posted successfully!", book: newBook });
    } catch (error) {
      console.error("Error: Creating Book", error);
      res.status(500).send({ message: "Book post failed!" });
    }
  };
  
  
  const updateBook = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Find the existing book
      const existingBook = await Book.findById(id);
      if (!existingBook) {
        return res.status(404).send({ message: "Book not found!" });
      }
  
      const { files, body } = req;
  
      // Upload new images to Cloudinary (or your preferred storage service) if there are any
      let updatedImages = existingBook.coverImage; // Start with existing images
      if (files && files.length > 0) {
        const uploadedImageUrls = await Promise.all(
          files.map(async (file) => {
            // Assuming a Cloudinary upload function
            const uploadResult = await uploadToCloudinary(file.path); // Replace with your upload logic
            return uploadResult.secure_url; // Use the URL from the upload response
          })
        );
  
        updatedImages = uploadedImageUrls; // Replace old images with the new URLs
      }
  
      // Prepare updated data
      const updatedData = {
        ...body,
        coverImage: updatedImages,
      };
  
      // Update the book in the database
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