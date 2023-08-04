import React, { useState,useEffect } from 'react'
import { Input,Select,Button,
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  filter
  } from '@chakra-ui/react'

  import EditModel from "./EditModel.jsx"
  
  import axios from "axios"
const Dashboard = () => {
  let dataObj={
    image:"",
    name: "",
    description: "",
    gender: "",
    category: "",
    price: ""
  }
  let [id,setid]=useState(0);
  let [page,setPage]=useState(1);
  // let [male,setMale]=useState(true);

  let male=true;

  const [data,setData]=useState(dataObj)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [productdata,setProductData]=useState([]);
  // http://localhost:3000/products

  const [state,setState]=useState(false)

  const getdata=async()=>{
    try{
      const res= await axios.get(`http://localhost:8080/products?_page=${page}?_limit=10`)
      const data=await res.data;
      // console.log(data);
      setProductData(data);
    }
    catch(err){
      console.log(err);
    }

  }

  const postdata=async(data)=>{
    try{
      const res= await axios.post("http://localhost:8080/products",data)
      // const data=await res.data;
      // console.log(data)
    }
    catch(err){
      console.log(err);
    }
  }

  const deletedata=async(id)=>{
    try{
      const res= await axios.delete(`http://localhost:8080/products/${id}`)
      alert("data deleted")
      // console.log("data delted");
    }
    catch(err){
      console.log(err);
    }
  }

  const handleChange=(event)=>{
    setData({
      ...data,
      [event.target.name]:event.target.value
    })
  }

  const handleSubmit=(event)=>{
    // event.preventDefault();
    // console.log(data);
    postdata(data);
  }

  useEffect(()=>{
    getdata();
  },[productdata,page])

  if(data.gender=="female"){
    male=false;
  }

  const handlezfilterGender=()=>{
    let filter_id=document.getElementById("filer-id").value;
    console.log(filter_id)
    const getdata2=async()=>{
      try{
        const res= await axios.get(`http://localhost:8080/products?gender=${filter_id}`)
        const data=await res.data;
        console.log(data);
        setProductData(data);
      }
      catch(err){
        console.log(err);
      }
  
    }
    getdata2();
  }

  const handlezfilterCategory=()=>{
    let category_id=document.getElementById("category-id").value;
    console.log(category_id)
    const getdata2=async()=>{
      try{
        const res= await axios.get(`http://localhost:8080/products?category=${category_id}`)
        const data=await res.data;
        console.log(data);
        setProductData(data);
      }
      catch(err){
        console.log(err);
      }
  
    }
    getdata2();
  }

  return (
    <div>
      
      <Input variant='outline' placeholder='Search for Product' />
      
      <Select placeholder='Filter By Gender' onChange={handlezfilterGender} id="filer-id">
        <option value='male' >Male</option>
        <option value='female'>Female</option>
      </Select>

      <Select placeholder='Filter By Category' onChange={handlezfilterCategory} id="category-id">
        <option value='shirts'>Shirts</option>
        <option value='jeans'>Jeans</option>
        <option value='trousers'>Trousers</option>
        <option value='suits'>Suits</option>
      </Select>

      <Select placeholder='Sort By Price'>
        <option value='ascending'>Ascending</option>
        <option value='descending'>Descending</option>
      </Select>

      <Button onClick={onOpen}>Add Product</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          
          <input type="file" name="image" id="file" onChange={handleChange}/>

          <Input placeholder='Enter Product Name' name="name" onChange={handleChange}></Input>
          <Input placeholder='Enter Product Description' name="description" onChange={handleChange}></Input>
          <Select placeholder='Select Gender' name="gender" onChange={handleChange} >
            <option value='male'>Male</option>
            <option value='female'>Female</option>
          </Select>

          <Select placeholder='Select Category'name="category" onChange={handleChange}>
            {male?
            <>
            <option value='shirts'>Shirts</option>
            <option value='jeans'>Jeans</option>
            <option value='trousers'>Trousers</option>
            <option value='suits'>Suits</option>
            </>
            :
            <>
            <option value='saree'>Saree</option>
            <option value='kurti'>Kurti</option>
            <option value='lehenga'>Lehenga</option>
            <option value='jackets'>Jackets</option>
            </>
            }
          </Select>

          <Input placeholder='Enter Product Price' name="price" onChange={handleChange}></Input>

            <Button onClick={handleSubmit}>Add Product Button</Button>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}> Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Box style={{margin:"50px"}}>
      <TableContainer>
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>Image</Th>
              <Th>Product Name</Th>
              <Th>Product Description</Th>
              <Th>Gender</Th>
              <Th>Category</Th>
              <Th>Price</Th>
              <Th>Edit</Th>
              <Th>Delete</Th>
            </Tr>
          </Thead>
          <Tbody>
            {
              productdata && productdata.map((elem,index)=>{
                return <Tr key={index}>
                  <Td>{elem.image}</Td>
                  <Td>{elem.name}</Td>
                  <Td>{elem.description}</Td>
                  <Td>{elem.gender}</Td>
                  <Td>{elem.category}</Td>
                  <Td>{elem.price}</Td>
                  <Td><Button onClick={()=>{setState(true)
                    setid(elem.id)}} >Edit</Button></Td>
                  <Td><Button onClick={()=>deletedata(elem.id)}>Delete</Button></Td>
                </Tr>
              })
            }
            {state?<EditModel id={id} state={state} modelState={()=>setState(false)}/>:""}
          </Tbody>  
        </Table>
        </TableContainer>

      </Box>

      <Button onClick={()=>setPage(page-1)}>PREV</Button><Button>{page}</Button>
      <Button onClick={()=>setPage(page+1)}>Next</Button>

    </div>
  )
}

export default Dashboard
