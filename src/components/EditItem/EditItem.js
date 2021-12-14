import { Grid, Paper, Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import { blueGrey } from '@material-ui/core/colors';
import { useProducts } from '../../contexts/ProductsContext';

const EditItem = () => {
  const { productDetails, fetchOneProduct, editItem } = useProducts();
  console.log(productDetails);
  const [form, setForm] = useState({
    title: productDetails.title,
    image: productDetails.image,
    price: productDetails.price,
    description: productDetails.description,
  });

  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    fetchOneProduct(id);
  }, []);

  useEffect(() => {
    setForm({
      title: productDetails.title,
      image: productDetails.image,
      price: productDetails.price,
      description: productDetails.description,
    });
  }, [productDetails]);

  const handleChange = (e) => {
    const values = {
      ...form,
      [e.target.name]: e.target.value,
    };
    setForm(values);
  };

  const handleEdit = () => {
    editItem({ ...form, id });
    navigate('/');
  };
  return (
    <>
      <h1 align="center">Edit my product</h1>

      <Grid container className="main">
        <Grid item md={5}>
          <Paper className="paper">
            <form action="">
              <input
                type="text"
                placeholder="Title"
                name="title"
                onChange={handleChange}
                value={form.title}
              />
              <input
                type="text"
                placeholder="Image"
                name="image"
                onChange={handleChange}
                value={form.image}
              />
              <input
                type="text"
                placeholder="Price"
                name="price"
                onChange={handleChange}
                value={form.price}
              />
              <Button
                variant="contained"
                style={{ backgroundColor: blueGrey[500] }}
                className="btn-add"
                onClick={handleEdit}
              >
                Save changes
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default EditItem;
