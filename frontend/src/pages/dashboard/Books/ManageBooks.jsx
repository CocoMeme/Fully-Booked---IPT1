import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useDeleteBookMutation, useFetchAllBooksQuery } from '../../../redux/features/books/booksApi';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Checkbox,
} from '@mui/material';

const ManageBooks = () => {
    const navigate = useNavigate();

    const { data: books, refetch } = useFetchAllBooksQuery();
    const [deleteBook] = useDeleteBookMutation();

    // State to track selected rows
    const [selected, setSelected] = useState([]);

    // Handle checkbox toggle for a row
    const handleCheckboxToggle = (id) => {
        if (selected.includes(id)) {
            setSelected(selected.filter((selectedId) => selectedId !== id));
        } else {
            setSelected([...selected, id]);
        }
    };

    // Handle select all rows
    const handleSelectAll = (event) => {
        if (event.target.checked) {
            const allIds = books.map((book) => book._id);
            setSelected(allIds);
        } else {
            setSelected([]);
        }
    };

    // Handle deleting a book
    const handleDeleteBook = async (id) => {
        try {
            await deleteBook(id).unwrap();
            alert('Book deleted successfully!');
            refetch();
            setSelected(selected.filter((selectedId) => selectedId !== id));
        } catch (error) {
            console.error('Failed to delete book:', error.message);
            alert('Failed to delete book. Please try again.');
        }
    };

    // Handle bulk delete
    const handleBulkDelete = async () => {
        try {
            for (const id of selected) {
                await deleteBook(id).unwrap();
            }
            alert('Selected books deleted successfully!');
            refetch();
            setSelected([]);
        } catch (error) {
            console.error('Failed to delete books:', error.message);
            alert('Failed to delete books. Please try again.');
        }
    };

    // Handle navigating to Edit Book page
    const handleEditClick = (id) => {
        navigate(`/dashboard/edit-book/${id}`);
    };

    return (
        <section className="py-1 bg-blueGray-50">
            <main className="mb-7 w-full xl:w-10/12 xl:mb-7 px-4 mx-auto">
                <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
                    <div className="mr-6">
                        <h1 className="text-4xl font-bold mb-1">Book Management</h1>
                        <h2 className="text-gray-600 ml-0.5">Admin Functionality</h2>
                    </div>
                    <div className="flex flex-col md:flex-row items-start justify-end -mb-3">
                        <Link to="/dashboard/manage-books" className="inline-flex px-5 py-3 text-gray-600 hover:text-gray-700 focus:text-gray-700 hover:bg-gray-100 focus:bg-gray-100 border border-gray-600 rounded-md mb-3">
                            Manage Books
                        </Link>
                        <Link to="/dashboard/add-new-book" className="inline-flex px-5 py-3 text-white bg-gray-600 hover:bg-gray-700 focus:bg-gray-700 rounded-md ml-6 mb-3">
                            Add New Book
                        </Link>
                        {selected.length > 0 && (
                            <Button
                                variant="contained"
                                color="error"
                                onClick={handleBulkDelete}
                                sx={{ ml: 2, p: 1.5, pl: 2}}
                            >
                                Delete Selected ({selected.length})
                            </Button>
                        )}
                    </div>
                </div>
                <Outlet />
            </main>
            <div className="w-full xl:w-10/12 mb-12 xl:mb-0 px-4 mx-auto">
                <Paper elevation={3}>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            indeterminate={selected.length > 0 && selected.length < books.length}
                                            checked={selected.length === books?.length}
                                            onChange={handleSelectAll}
                                        />
                                    </TableCell>
                                    <TableCell>#</TableCell>
                                    <TableCell>Book Title</TableCell>
                                    <TableCell>Category</TableCell>
                                    <TableCell>Tag</TableCell>
                                    <TableCell>Price</TableCell>
                                    <TableCell>Discounted Price</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {books && books.map((book, index) => (
                                    <TableRow key={book._id} selected={selected.includes(book._id)}>
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                checked={selected.includes(book._id)}
                                                onChange={() => handleCheckboxToggle(book._id)}
                                            />
                                        </TableCell>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{book.title}</TableCell>
                                        <TableCell>{book.category}</TableCell>
                                        <TableCell>{book.tag}</TableCell>
                                        <TableCell>₱{book.price}</TableCell>
                                        <TableCell>₱{book.discountPrice || "0"}</TableCell>
                                        <TableCell>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => handleEditClick(book._id)}
                                                sx={{ mr: 1 }}
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="error"
                                                onClick={() => handleDeleteBook(book._id)}
                                            >
                                                Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </div>
        </section>
    );
};

export default ManageBooks;
