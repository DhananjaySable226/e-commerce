// src/pages/ProductView.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductView.css';

export default function ProductView({ user }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);

    // Fetch product data by ID from the API
    useEffect(() => {
        fetch(`https://fakestoreapi.com/products/${id}`)
            .then(res => res.json())
            .then(data => {
                setProduct(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching product:', error);
                setLoading(false);
            });
    }, [id]);

    const handleChange = e => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleUpdate = () => {
        // In a real app, you would make an API call to update the product
        alert('Product updated!');
        console.log('Updated product:', product);
        setIsEditing(false);
    };

    const handleDelete = () => {
        // Only check for user if we're sure authentication state is loaded
        if (user !== undefined && !user) {
            alert('Please log in to delete products.');
            return;
        }
        
        if (window.confirm('Are you sure you want to delete this product?')) {
            alert('Product deleted!');
            console.log('Deleted product ID:', id);
            navigate('/products');
        }
    };

    if (loading) return <div className="product-view-container"><h2>Loading...</h2></div>;
    if (!product) return <div className="product-view-container"><h2>Product not found</h2></div>;

    return (
        <div className="product-view-container">
            <h2>{isEditing ? 'Edit Product' : 'Product Details'}</h2>
            <div className="product-view-form">
                <label>Title:</label>
                {isEditing ? (
                    <input
                        name="title"
                        value={product.title || ''}
                        onChange={handleChange}
                    />
                ) : (
                    <div>{product.title}</div>
                )}
                
                <label>Price:</label>
                {isEditing ? (
                    <input
                        name="price"
                        value={product.price || ''}
                        onChange={handleChange}
                    />
                ) : (
                    <div>${product.price}</div>
                )}
                
                <label>Description:</label>
                {isEditing ? (
                    <textarea
                        name="description"
                        value={product.description || ''}
                        onChange={handleChange}
                    />
                ) : (
                    <div>{product.description}</div>
                )}
                
                <label>Category:</label>
                {isEditing ? (
                    <input
                        name="category"
                        value={product.category || ''}
                        onChange={handleChange}
                    />
                ) : (
                    <div>{product.category}</div>
                )}
                
                {isEditing ? (
                    <div className="form-actions">
                        <button onClick={handleUpdate}>Save Changes</button>
                        <button onClick={() => setIsEditing(false)}>Cancel</button>
                    </div>
                ) : (
                    <div className="form-actions">
                        <button onClick={() => setIsEditing(true)} disabled={user !== undefined && !user}>
                            {user !== undefined && !user ? 'Login to Edit' : 'Edit Product'}
                        </button>
                        <button onClick={handleDelete} disabled={user !== undefined && !user}>
                            {user !== undefined && !user ? 'Login to Delete' : 'Delete Product'}
                        </button>
                        <button onClick={() => navigate('/products')}>Back to Products</button>
                    </div>
                )}
            </div>
        </div>
    );
}