import React, { useEffect,useState } from 'react'
import { Input,Select,Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure
    } from '@chakra-ui/react'
    import axios from "axios"

function EditModel({state,modelState,id}) {
    let dataObj={
        image:"",
        name: "",
        description: "",
        gender: "",
        category: "",
        price: ""
      }

      const [data,setData]=useState(dataObj)
      const { isOpen, onOpen, onClose } = useDisclosure()

      const [productdata,setProductData]=useState({});

      const getdata=async()=>{
        // console.log(id)
        try{
          const res= await axios.get(`http://localhost:8080/products/${id}`)
          const data=await res.data;
          console.log(res);
          setProductData(data);
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
    
      const editdata=async()=>{
        try{
          const res= await axios.put(`http://localhost:8080/products/${id}`,data)
          alert("data update")
          // console.log("data delted");
        }
        catch(err){
          console.log(err);
        }
      }

      useEffect(()=>{
        getdata();
        // onOpen
      },[])
    
  return <Modal isOpen={state} onClose={onClose}>
  <ModalOverlay />
  <ModalContent>
    <ModalHeader>Add Product</ModalHeader>
    <ModalCloseButton />
    <ModalBody>
    
    <input type="file" name="image" id="file" onChange={handleChange}/>

    <Input placeholder='Enter Product Name' name="name" value={productdata.name} onChange={handleChange}></Input>
    <Input placeholder='Enter Product Description' name="description" onChange={handleChange}></Input>
    <Select placeholder='Select Gender' name="gender" onChange={handleChange}>
      <option value='male'>Male</option>
      <option value='female'>Female</option>
    </Select>

    <Select placeholder='Select Category'name="category" onChange={handleChange}>
      {true?
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

      <Button onClick={editdata}>Add Product Button</Button>
    </ModalBody>

    <ModalFooter>
      <Button colorScheme='blue' mr={3} onClick={modelState}> Close</Button>
    </ModalFooter>
  </ModalContent>
</Modal>
}

export default EditModel
