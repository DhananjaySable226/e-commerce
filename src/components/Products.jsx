import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Products.css';

export default function Products({ user }) {
    const [list, setList] = useState([]);
    const [search, setSearch] = useState('');
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [newProduct, setNewProduct] = useState({
        title: '',
        price: '',
        description: '',
        category: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        if (user !== undefined && !user) {
            navigate('/auth');
        }
    }, [user, navigate]);

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(data => setList(data));
    }, []);

    if (user !== undefined && !user) {
        return null;
    }

    if (user === undefined) {
        return <div className="product-container">Loading...</div>;
    }

    const filtered = list.filter(item =>
        item.title.toLowerCase().includes(search.toLowerCase())
    );

    const handleCreateClick = () => {
        setShowCreateForm(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCreateSubmit = (e) => {
        e.preventDefault();
        alert('Product created successfully!');
        console.log('New product:', newProduct);
        
        setNewProduct({
            title: '',
            price: '',
            description: '',
            category: ''
        });
        setShowCreateForm(false);
        
    };

    const handleView = (product) => {
        navigate(`/product/${product.id}`);
    };

    const handleUpdate = (product) => {
        navigate(`/product/${product.id}`);
    };

    const handleDelete = (id, title) => {
        if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
            alert(`Product "${title}" deleted!`);
            console.log('Deleted product ID:', id);
        }
    };

    const closeCreateForm = () => {
        setShowCreateForm(false);
    };

    return (
        <div className="product-container">
            <div className="header-section">
                <h1 className="product-heading">Products</h1>
                <button className="create-btn" onClick={handleCreateClick}>
                    Create Product
                </button>
            </div>
            
            {showCreateForm && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <h2>Create New Product</h2>
                        <form onSubmit={handleCreateSubmit}>
                            <div className="form-group">
                                <label>Product Title:</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={newProduct.title}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Product Price:</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={newProduct.price}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Product Description:</label>
                                <textarea
                                    name="description"
                                    value={newProduct.description}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Product Category:</label>
                                <input
                                    type="text"
                                    name="category"
                                    value={newProduct.category}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-actions">
                                <button type="submit">Create Product</button>
                                <button type="button" onClick={closeCreateForm}>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <input
                placeholder="Search..."
                onChange={(e) => setSearch(e.target.value)}
                className="search-input"
            />

            <table className="product-table">
                <thead>
                    <tr>
                        <th>Product Title</th>
                        <th>Product Price</th>
                        <th>Product Description</th>
                        <th>Product Category</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filtered.map((p) => (
                        <tr key={p.id}>
                            <td>{p.title}</td>
                            <td>${p.price}</td>
                            <td>{p.description.substring(0, 50)}...</td>
                            <td>{p.category}</td>
                            <td className="action-buttons">
                                <button className="view-btn" onClick={() => handleView(p)}>View</button>
                                <button 
                                    className="update-btn" 
                                    onClick={() => handleUpdate(p)}
                                >
                                    Update
                                </button>
                                <button 
                                    className="delete-btn" 
                                    onClick={() => handleDelete(p.id, p.title)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}