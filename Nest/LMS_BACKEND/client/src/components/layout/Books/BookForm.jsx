import React, { useState, useEffect } from 'react';
import { Button } from '../../../common/Button';
import { Input } from '../../../common/Input';

export const BookForm = ({ book, onSubmit, loading, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    publisher: '',
    category: '',
    isbn: '',
    publicationYear: new Date().getFullYear(),
    price: 0,
    totalCount: 1,
    availableCount: 1,
    perDayCharge: 10,
    description: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (book) {
      setFormData(book);
    }
  }, [book]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title?.trim()) newErrors.title = 'Title is required';
    if (!formData.author?.trim()) newErrors.author = 'Author is required';
    if (!formData.publisher?.trim()) newErrors.publisher = 'Publisher is required';
    if (!formData.category?.trim()) newErrors.category = 'Category is required';
    if (!formData.isbn?.trim()) newErrors.isbn = 'ISBN is required';

    if (!formData.publicationYear || formData.publicationYear < 1000 || formData.publicationYear > new Date().getFullYear()) {
      newErrors.publicationYear = 'Invalid publication year';
    }

    if (formData.price < 0) newErrors.price = 'Price must be positive';
    if (formData.totalCount < 1) newErrors.totalCount = 'Must have at least 1 book';
    if (formData.availableCount < 0) newErrors.availableCount = 'Cannot be negative';
    if (formData.perDayCharge < 0) newErrors.perDayCharge = 'Charge must be positive';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          error={errors.title}
        />

        <Input
          label="Author"
          name="author"
          value={formData.author}
          onChange={handleChange}
          error={errors.author}
        />

        <Input
          label="Publisher"
          name="publisher"
          value={formData.publisher}
          onChange={handleChange}
          error={errors.publisher}
        />

        <Input
          label="Category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          error={errors.category}
        />

        <Input
          label="ISBN"
          name="isbn"
          value={formData.isbn}
          onChange={handleChange}
          error={errors.isbn}
        />

        <Input
          label="Publication Year"
          name="publicationYear"
          type="number"
          value={formData.publicationYear}
          onChange={handleChange}
          error={errors.publicationYear}
        />

        <Input
          label="Price"
          name="price"
          type="number"
          step="0.01"
          value={formData.price}
          onChange={handleChange}
          error={errors.price}
        />

        <Input
          label="Total Count"
          name="totalCount"
          type="number"
          value={formData.totalCount}
          onChange={handleChange}
          error={errors.totalCount}
        />

        <Input
          label="Available Count"
          name="availableCount"
          type="number"
          value={formData.availableCount}
          onChange={handleChange}
          error={errors.availableCount}
        />

        <Input
          label="Per Day Charge"
          name="perDayCharge"
          type="number"
          step="0.01"
          value={formData.perDayCharge}
          onChange={handleChange}
          error={errors.perDayCharge}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-red focus:border-transparent"
          placeholder="Enter book description..."
        />
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" loading={loading}>
          {book ? 'Update Book' : 'Create Book'}
        </Button>
      </div>
    </form>
  );
};