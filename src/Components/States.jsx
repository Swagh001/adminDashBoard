import React,{useEffect, useState} from 'react'
import axios from "axios"

  let shirts=0;
  let Jeans=0
  let Trousers=0
  let Suits=0

  let Saree=0
  let Kurti=0
  let Lehenga=0
  let Jackets=0;
const States = () => {
  const [productdata,setProductData]=useState([]);
  const getdata=async()=>{
    try{
      const res= await axios.get(`http://localhost:8080/products`)
      const data=await res.data;
      // console.log(data);
      setProductData(data);
    }
    catch(err){
      console.log(err);
    }
  }

  function countAll(){
    productdata.map((elem,index)=>{
      if(elem.category=="shirts"){
        shirts+=1;
      }
      else if(elem.category=="jeans"){
        Jeans+=1;
      }
      else if(elem.category=="trousers"){
        Trousers+=1;
      }
      else if(elem.category=="suits"){
        Suits+=1;
      }
      else if(elem.category=="saree"){
        Saree+=1;
      }
      else if(elem.category=="kurti"){
        Kurti+=1;
      }
      else if(elem.category=="lehenga"){
        Lehenga+=1;
      }
      else if(elem.category=="jackets"){
        Jackets+=1;
      }
    })
  }

  useEffect(()=>{
    getdata()
    countAll();
  },[])

  return (
    <div>
      <p>Shirts:{shirts}</p>
      <p>Jeans:{Jeans}</p>
      <p>Trousers:{Trousers}</p>
      <p>Suits:{Suits}</p>
      <p>Saree:{Saree}</p>
      <p>Kurti:{Kurti}</p>
      <p>Lehenga:{Lehenga}</p>
      <p>Jackets:{Jackets}</p>
    </div>
  )
}

export default States
