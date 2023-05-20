import logo from './logo.svg';
import './App.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { useState, useEffect } from 'react';
var dataAPI = "https://raw.githubusercontent.com/tuandq2112/trainning-fe/api/api/user.json";
var dataUser = [
  {
    "id": 1,
    "first": "Ngô",
    "last": "Hiếu",
    "email": "Ngohieu1811@gmail.com",
    "phone": "0961745160",
    "location": "Hai bà trưng"
  },
  {
    "id": 2,
    "first": "Đỗ",
    "last": "Tuấn",
    "email": "tuando@gmail.com",
    "phone": "012345678",
    "location": "Hà Nội"
  },
  {
    "id": 3,
    "first": "Quang",
    "last": "Hiếu",
    "email": "quanghieu@gmail.com",
    "phone": "0988888888",
    "location": "Lê Duẩn"
  },
  {
    "id": 4,
    "first": "Quốc",
    "last": "Tuấn",
    "email": "tuanquoc@gmail.com",
    "phone": "016222222222",
    "location": "Trần Đại Nghĩa"
  },
  {
    "id": 5,
    "first": "Hiếu",
    "last": "Bắp",
    "email": "quanghieu@gmail.com",
    "phone": "0988888888",
    "location": "Xã Đàn"
  },
  {
    "id": 6,
    "first": "Tuấn",
    "last": "Đỗ",
    "email": "tuando@gmail.com",
    "phone": "099992828282",
    "location": "Giải Phóng"
  }
]
//Truyền property name vào dòng table header
var dataUserKey = Object.keys(dataUser[0]);
console.log(dataUserKey)

//Header.js
function HeaderTable({header}){
  return(
      <th>{header}</th>        
  )
}

//UserItem.js
function UserItem({person}){
  return(
    <React.Fragment>
      <tr className="trData" id={person.id}> 
        <td>{person.id}</td>    
        <td>{person.first}</td>    
        <td>{person.last}</td>    
        <td>{person.email}</td>    
        <td>{person.phone}</td>    
        <td>{person.location}</td>
        <td><button className="editBtn" id={person.id}>Edit</button></td>
        <td><button className="deleteBtn" id={person.id}>Delete</button></td>
      </tr>
      <tr><td className="dividerRow"></td></tr>          
      </React.Fragment> 
  )
}

function App() {

  const [data,setData] = useState(dataUser);
  
  useEffect(() => {

    const handleEditClick = (id) => {
        
      const first = document.getElementById("firstname").value;
      const last = document.getElementById("lastname").value;
      const email = document.getElementById("email").value;
      const phone = document.getElementById("phone").value;
      const location = document.getElementById("location").value;

      setData(prevData =>
        prevData.map(item => {
          if (item.id === id) {
            return {
              ...item,
              first,
              last,
              email,
              phone,
              location
            };
          }
          return item;
        })
      );
    };   

    const handleDeleteClick = (id) => {
      setData(prevData => prevData.filter(item => item.id !== id));
    };

    const handleButtonClick = (event) => {
      const id = parseInt(event.currentTarget.id);
      handleDeleteClick(id);
    };

    const handleButtonClick1 = (event) => {
      const id = parseInt(event.currentTarget.id);
      handleEditClick(id);
    };

    const deleteButtons = document.querySelectorAll(".deleteBtn");
    deleteButtons.forEach(button => {
      button.addEventListener("click", handleButtonClick);
    });

    const editButtons = document.querySelectorAll(".editBtn");
    editButtons.forEach(button => {
      button.addEventListener("click", handleButtonClick1);
    });

    return () => {
      deleteButtons.forEach(button => {
        button.removeEventListener("click", handleButtonClick);
      });
      editButtons.forEach(button => {
        button.removeEventListener("click", handleButtonClick1);
      });
    };
  }, []);

  return(
    <div className="App">
        <h1 id="heading">THÊM SỬA XÓA VỚI HTML + CSS + JS</h1>
        <div className="divider">.</div>
        <div id="bgForm">
          <table id="dataTable">
              <thead>
                <tr>
                  {
                    dataUserKey.map((header,index) => (
                      <HeaderTable
                        key={index}
                        header={header}                    
                      />                    
                    ))
                  }
                </tr>                            
              </thead>
              <tbody id = "data">
                {
                  data.map(arr => (
                    <UserItem
                      key={arr.id}
                      person={arr}                
                    />
                  ))                  
                }           
              </tbody>
              <tfoot>
              </tfoot>
          </table>
           {/* Form điền và sửa thông tin  */}
        <form id="formInput">
            <label>First:</label><br />
            <input type="text" id="firstname" name="fname" placeholder="Nguyen" /><br />
            <label>Last:</label><br />
            <input type="text" id="lastname" name="lname" placeholder="Hai" /><br />
            <label>Email:</label><br />
            <input type="email" id="email" placeholder="abc@xyz.cd" /><br />
            <label>Phone:</label><br />
            <input type="number" id="phone" placeholder="+84123465789" /><br />
            <label>Location:</label><br />
            <input type="text" id="location" placeholder="Hanoi, Vietnam" /><br />
        </form>
        </div>
    </div>
  )
}

export default App;
