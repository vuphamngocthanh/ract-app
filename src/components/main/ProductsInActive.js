import React, { useEffect, useState } from "react";
import axios from "axios";
import CustomTable from "../common/Table";
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Input } from 'antd';

export default function ProductsInActive() {

  const [products, setProducts] = useState([]);
  const token = localStorage.getItem("accessToken");

  const config = {
    'headers': {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  };


  
  const columns = [
    { field: 'id', headerName: 'ID', width: 50 },
    {
      field: 'nameProduct',
      headerName: 'First name',
      editable: true,
    },
    {
      field: 'photo',
      headerName: 'Photo',
      width: 100,
      editable: true,
      renderCell: (params) => (
        <img
          src={"http://localhost:8080" + params.value}
          alt={"photo"}
          style={{ width: "100%", height: "auto" }}
        />
      ),
    },
    {
      field: 'fabricMaterial',
      headerName: 'Fabric Material',
      width: 150,
      editable: true,
    },
    {
      field: 'price',
      headerName: 'Price',
      editable: true,
    },
    {
      field: 'categoryDto',
      headerName: 'Category',
      width: 150,
      editable: true,
      valueGetter: (params) => params.value.name,
    },
    {
      field: 'productSizeDtos',
      headerName: 'Size',
      editable: true,
      width: 150,
      valueGetter: (params) =>
        params.value
          .map((productSizeDto) => productSizeDto.size)
          .join(', '),
      valueFormatter: (params) => params.value.toString(),
    },
    {
      field: 'productColorDtos',
      headerName: 'Color',
      editable: true,
      width: 150,
      valueGetter: (params) =>
        params.value
          .map((productColorDto) => productColorDto.color)
          .join(', '),
      valueFormatter: (params) => params.value.toString(),
    },
  
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => (
        <div>
          <a href={`edit-product/${params.row.id}`}>
            <button danger>Update</button>
          </a>&emsp;
          <a href={`view-product/${params.row.id}`}>
            <button danger>View</button>
          </a>
        </div>
      ),
    }
  ]
 

  useEffect(() => {
    if (products.length === 0) {
        loadProducts();
    }
  },[products]);

  const handleSearch = async (value) =>{
    const result = await axios.get(`http://localhost:8080/api/v1/products/disable?search=${value}`, config);
    setProducts(result.data);
  }

  const loadProducts = async () => {
    const result = await axios.get(`http://localhost:8080/api/v1/products/disable?search`, config);
    setProducts(result.data);
  };

  return (
    <div>
    <Input.Search placeholder="input search text" onSearch={handleSearch} />
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={products}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10]}
        // checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
    </div>
  );
  
}
