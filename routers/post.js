const app = require('express');
const BlogPost = require('../models/BlogPost');

const routers = app.Router();

// Create a blog post
routers.post('/posts', async (req, res) => {
 
    const newPost = await BlogPost.create(req.body);
    res.status(201).json(newPost);

});

// Get all blog posts or filter by category/tags
routers.get('/posts', async (req, res) => {
    try {
        const { category, tags } = req.query;
        const query = {};

        if (category) query.category = category;
        if (tags) query.tags = { $all: tags.split(',') };

        const posts = await BlogPost.find(query);
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a single blog post by ID
routers.get('/posts/:id', async (req, res) => {
    try {
        const post = await BlogPost.findById(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a blog post
routers.put('/posts/:id', async (req, res) => {
    try {
        const updatedPost = await BlogPost.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPost) return res.status(404).json({ message: 'Post not found' });
        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a blog post
routers.delete('/posts/:id', async (req, res) => {
    try {
        const deletedPost = await BlogPost.findByIdAndDelete(req.params.id);
        if (!deletedPost) return res.status(404).json({ message: 'Post not found' });
        res.status(200).json({ message: 'Post deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = routers;