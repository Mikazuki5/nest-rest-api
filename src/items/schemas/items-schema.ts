import mongoose from 'mongoose';

export const ItemsSchemas = new mongoose.Schema({
  name: String,
  qty: Number,
  description: String,
  createdAt: Date,
  updatedAt: Date,
  brand: String,
});
