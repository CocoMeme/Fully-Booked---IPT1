import React, { useState } from 'react';
import { Box, Grid, Typography, Checkbox, FormControlLabel, Switch, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useFetchAllBooksQuery } from '../../redux/features/books/booksApi';
import BookCard from '../books/BookCard';

const categories = ['Business', 'Comedy', 'Fiction', 'Horror', 'Adventure'];
const tags = ['New', 'Hot', 'Sale'];

const Store = () => {
  const { data: books = [] } = useFetchAllBooksQuery();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [sortPrice, setSortPrice] = useState('');

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((item) => item !== category) : [...prev, category]
    );
  };

  const handleTagChange = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((item) => item !== tag) : [...prev, tag]
    );
  };

  const handlePriceChange = (event) => {
    setSortPrice(event.target.value);
  };

  const filteredBooks = books
  .filter(
    (book) =>
      (selectedCategories.length === 0 || selectedCategories.includes(book.category)) &&
      (selectedTags.length === 0 || selectedTags.some((tag) => (book.tag || []).includes(tag)))
  )
  .sort((a, b) => {
    if (sortPrice === 'low-to-high') return a.price - b.price;
    if (sortPrice === 'high-to-low') return b.price - a.price;
    return 0;
  });


  return (
    <Box sx={{ display: 'flex', padding: 2 }}>
      {/* Filter Panel */}
      <Box sx={{ width: '130px', padding: 2, borderRight: '1px solid #ddd' }}>
        <Typography variant="h6" gutterBottom>
          Filters
        </Typography>
        <Box>
          <Typography variant="subtitle1" gutterBottom>
            Category
          </Typography>
          {categories.map((category) => (
            <FormControlLabel
              key={category}
              control={
                <Checkbox
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                />
              }
              label={category}
            />
          ))}
        </Box>
        <Box>
          <Typography variant="subtitle1" gutterBottom>
            Tag
          </Typography>
          {tags.map((tag) => (
            <FormControlLabel
              key={tag}
              control={
                <Switch
                  checked={selectedTags.includes(tag)}
                  onChange={() => handleTagChange(tag)}
                />
              }
              label={tag}
            />
          ))}
        </Box>
        <Box sx={{ marginTop: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            Price
          </Typography>
          <FormControl fullWidth>
            <InputLabel>Sort by</InputLabel>
            <Select value={sortPrice} onChange={handlePriceChange}>
              <MenuItem value="low-to-high">Lowest to Highest</MenuItem>
              <MenuItem value="high-to-low">Highest to Lowest</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* Book Cards */}
      <Box sx={{ flexGrow: 1, padding: 2 }}>
        <Grid container spacing={4}>
          {filteredBooks.map((book) => (
            <Grid item xs={3} sm={3} md={3} lg={4} key={book.id}>
              <BookCard book={book} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Store;
