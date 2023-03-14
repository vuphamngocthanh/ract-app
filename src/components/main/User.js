import React, { useEffect, useState } from "react";
import axios from "axios";
import CustomTable from "../common/Table";
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Input } from 'antd';

function Users(){


  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (value) => {
    setSearchValue(value);
    // loadUsers();
  }

  const [users, setUsers] = useState([]);

  const token = localStorage.getItem("accessToken");
  console.log("token 3: " + token);

   const config = {
    'headers': {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/v1/users?name=${searchValue}`, config)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        throw err;
      });
  }, [searchValue]);
      

    // useEffect(() => {
    //     if (users.length === 0) {
    //         loadUsers();
    //     }
    // },[users]);

    // const loadUsers = async () => {
    //   let url = `http://localhost:8080/api/v1/users?name=${searchValue}`;
    //   // if (searchValue) {
    //   //   url += `/?name=${searchValue}`;
    //   // }
    //   const result = await axios.get(url, config);
    //   setUsers(result.data);
    //   console.log(result.data);
    // };
    

    // const loadUsers = async () => {
    //   console.log(config);
    //     const result = await axios.get("http://localhost:8080/api/v1/users",  config);
    //     setUsers(result.data);
    //     console.log(result.data);
    // };

    const columns = [
      { field: 'id', headerName: 'ID', width: 50 },
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
        field: 'fullname',
        headerName: 'Full name',
        width: 150,
        editable: true,
      },
      {
        field: 'email',
        headerName: 'Email',
        width: 150,
        editable: true,
      },
      {
        headerName: 'Roles',
        editable: true,
        width: 150,
        valueGetter: (params) =>
          params.value
            .map((productColorDto) => productColorDto.description)
            .join(', '),
        valueFormatter: (params) => params.value.toString(),
      },
      {
        field: 'username',
        headerName: 'Username',
        width: 150,
        editable: true,
      },
      {
        field: 'actions',
        headerName: 'Actions',
        width: 200,
        renderCell: (params) => (
          <div>
            <a href={`edit-user/${params.row.id}`}>
                <button danger>Update</button>
            </a>&emsp;
            <a href={`user-detail/${params.row.id}`}>
                <button ghost>Detail</button>
            </a>
          </div>
        ),
      },
    ];


  
    return (
      <div>
    <Input.Search placeholder="input search text" onSearch={handleSearch} />
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={users}
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
};

export default Users;
