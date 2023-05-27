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

//MyForm
function MyForm({handleChange}) {
  return (
    <div>
      <form id="formInput">
        <label>First:</label><br />
        <input type="text" id="firstname" name="first" placeholder="Nguyen" onChange={handleChange('first')} /><br />
        <label>Last:</label><br />
        <input type="text" id="lastname" name="last" placeholder="Hai" onChange={handleChange('last')} /><br />
        <label>Email:</label><br />
        <input type="email" id="email" name="email" placeholder="abc@xyz.cd" onChange={handleChange('email')} /><br />
        <label>Phone:</label><br />
        <input type="number" id="phone" name="phone" placeholder="+84123465789" onChange={handleChange('phone')} /><br />
        <label>Location:</label><br />
        <input type="text" id="location" name="location" placeholder="Hanoi, Vietnam" onChange={handleChange('location')} /><br />
        <button type="button" form="formInput" className='addBtn'>Thêm</button>
      </form>      
    </div>
  );
};

function App() {

  const [data, setData] = useState(dataUser);
  const [formData, setFormData] = useState({
    first: '',
    last: '',
    email: '',
    phone: '',
    location: ''
  });
  const handleChange = (name) => (event) => {
    const { value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  useEffect(() => {
    const handleAddClick = () => {
      const newId = data.length > 0 ? data[data.length - 1].id + 1 : 1;
      const newItem = { id: newId, ...formData };
      console.log(newItem)
      setData((prevData) => [...prevData, newItem]);
    }
    const addButtons = document.querySelectorAll(".addBtn");
    addButtons.forEach((button) => {
      button.addEventListener("click", handleAddClick);
    });
    return () => {
      addButtons.forEach((button) => {
        button.removeEventListener("click", handleAddClick);
      });
    }
  },[data,formData])
 

  useEffect(() => {

    const handleEditClick = (id) => {
      setData((prevData) =>
        prevData.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              ...formData
            };
          }
          return item;
        })
      );
    };  
  
    const handleDeleteClick = (id) => {
      setData((prevData) => prevData.filter((item) => item.id !== id));
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
    deleteButtons.forEach((button) => {
      button.addEventListener("click", handleButtonClick);
    });

    const editButtons = document.querySelectorAll(".editBtn");
    editButtons.forEach((button) => {
      button.addEventListener("click", handleButtonClick1);
    });

    return () => {
      deleteButtons.forEach((button) => {
        button.removeEventListener("click", handleButtonClick);
      });
      editButtons.forEach((button) => {
        button.removeEventListener("click", handleButtonClick1);
      });
    };
});

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
           <MyForm            
            handleChange={handleChange}
           />           
        </div>
    </div>
  )
}

export default App;
