import axios from "axios";
import React, { useEffect,useState } from "react";
import { Link, useParams } from "react-router-dom";
import logo from "../../img/logo.PNG";
import { Form, Input, Button } from "antd";

export default function ProductView() {
  const {productId} = useParams();

  const token = localStorage.getItem("accessToken");
 
  const config = {
   'headers': {
     'Authorization': `Bearer ${token}`,
     'Content-Type': 'application/json',
     'Access-Control-Allow-Origin': '*'
   }
  };


  const [product, setProduct] = useState({
    id: '',
    name: '',
    price: '',
    photo: '',
    enabled: ''
  });



  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = async () => {
    const result = await axios.get(`http://localhost:8080/api/v1/products/${productId}`,config);
    setProduct(result.data);
  };

  function getProducts() {
    window.location.href = "/home/productsActive";
  }
  function getProductsInActive() {
    window.location.href = "/home/productsInActive";
  }

  const handleDelete = () => {
    axios
    .delete(`http://localhost:8080/api/v1/products/delete/${productId}`, config)
    .then((res) => {
      alert(
        `InActive successfully!!!`
      );
    
      window.location.href = "/home/productsActive";
    })
    .catch((err) => {
      throw err;
    });
  }

  if(product.enabled === true){
    document.getElementById("inActive").style.display = "inline-block";
    document.getElementById("active").style.display = "none";
    document.getElementById("enabled").style.display = "inline-block";
    document.getElementById("disable").style.display = "none";
  }
  if(product.enabled === false){
    document.getElementById("active").style.display = "inline-block";
    document.getElementById("inActive").style.display = "none";
    document.getElementById("disable").style.display = "inline-block";
    document.getElementById("enabled").style.display = "none";
  }

  return (
    <div className="container">
    <div className ="form-wrapper" > 
      <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
        <Form
           labelCol={{ span: 6 }}
           wrapperCol={{ span: 12 }}
           layout="horizontal"
           style={{width:'40%',height:'20%',
             margin: 'auto',border:'solid' }}
               >
                <div style={{paddingTop: 10, display: 'flex', justifyContent: 'center', alignItems: "center"}}>
            <img
            
              alt="logo GMS"
              src={logo}
              style={{ marginBottom: 20, borderRadius:20}}
              width={150}
            />
            </div>
            <h1 style={{ textAlign: "center", marginTop: 5, color:"rgb(240, 227, 121)"}}>Product detail</h1>
              <Form.Item label="ID">
                <Input
                readOnly
                  className="form-control"
                  type="text"
                  value={product.id}
                  name="id" /> 
              </Form.Item>
              <Form.Item label="Product name">
                <Input
                readOnly
                    className="form-control"
                    type="text"
                    value={product.nameProduct}
                    name="nameProduct" /> 
              </Form.Item>
              <Form.Item label="Price">
                <Input
                readOnly
                  className="form-control"
                  type="text"
                  value={product.price}
                  name="price" /> 
              </Form.Item>
              <Form.Item label="photo">
                    <img src={"http://localhost:8080"+product.photo} width="70" height={50} alt="Selected File" />
                </Form.Item>
              <Form.Item label="enabled">
                <Input
                readOnly
                  className="form-control"
                  type="text"
                  value={product.enabled}
                  name="enabled" /> 
              </Form.Item>
                <div style={{textAlign:'center', paddingBottom:15}}>
                  <Button id="active" style={{width: 90,backgroundColor: "rgb(28, 28, 52)", color: "rgb(240, 227, 121)"}} onClick={handleDelete} type="primary" danger>Delete</Button>
                  <Button id="inActive"style={{width: 90,backgroundColor: "rgb(28, 28, 52)", color: "rgb(240, 227, 121)"}} onClick={handleDelete} type="primary" danger>Delete</Button>
                  &emsp; &emsp;
                  <Button id="enabled" style={{width: 90,backgroundColor: "rgb(28, 28, 52)", color: "rgb(240, 227, 121)"}}  onClick={getProducts}  type="primary" danger>Back</Button>
                  <Button id="disable"style={{width: 90,backgroundColor: "rgb(28, 28, 52)", color: "rgb(240, 227, 121)"}}  onClick={getProductsInActive}  type="primary" danger>Back</Button>
               </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
