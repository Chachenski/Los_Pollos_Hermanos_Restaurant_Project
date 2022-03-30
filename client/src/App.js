import './App.css';
import axios from "axios"
import React, { useEffect, useState } from "react"
import Home from "./Home"
import Search from "./Search"
import Dish from "./Dish"
import { Routes, Route } from "react-router-dom"
import Error from "./components/Error"
import Nav from "./components/Nav"
// import staticData from "./components/staticData"
import blankDish from "./components/dishBlank"

function App() {
  const [dishes, setDishes] = useState([])
  const [isBlankDish, setIsBlankDish] = useState(false)
  const [isChef, setIsChef] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [actionMessage, setActionMessage] = useState(null)

  // DEFAULT DISH ON DISH PAGE
  const [selectDish, setSelectDish] = useState(dishes[0])

  // GET ALL AXIOS BACKEND
  useEffect(() => {
    axios.get("/menu")
      .then(res => setDishes(res.data))
      .catch(err => console.log(err))
  }, [])

  // ALLOW INDIVIDUAL MAP WHEN DISH IS SELECTED 
  function clickedDish(id) {
    dishes.filter(item => {
      if (item._id === id) {
        return (setSelectDish(item))
      }
    })
  }

  // DELETE DISH
  function deleteDish(_id) {
    axios.delete(`/${_id}`)
    .then(res => console.log(res))
    // const newArr = dishes.filter(dish => {
    //   if (_id !== dish._id) {
    //     return dish
    //   }
    // })
    // setDishes(newArr)
  }

  // ADD DISH
  function addDish(updatedDish) {
    setDishes(prevInput => [...prevInput, updatedDish])
  }

  // UPDATE DISH
  function updateDish(id, updatedDish) {
    const newArr = dishes.map(dish => {
      if (dish._id === id) {
        return updatedDish
      }
      return dish
    })
    setDishes(newArr)
  }

  return (
    console.log(dishes),
    <>
      <Nav isEdit={isEdit} setIsEdit={setIsEdit} setActionMessage={() => setActionMessage(null)} />
      <div className='background-image'>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                setIsChef={setIsChef} />} />
          <Route
            path="/search"
            element={
              <Search
                dishes={dishes}
                isChef={isChef}
                isEdit={isEdit}
                setIsEdit={() => setIsEdit(true)}
                setIsBlankDish={() => setIsBlankDish(true)}
                clickedDish={(id) => { return (clickedDish(id), setActionMessage(null)) }}
                actionMessage={actionMessage}
                setActionMessage={setActionMessage}
              />} />
          <Route
            path="/dish"
            element={
              <Dish
                dish={selectDish}
                isChef={isChef}
                isEdit={isEdit}
                setIsEdit={() => setIsEdit(!isEdit)}
                setIsBlankDish={() => setIsBlankDish(false)}
                deleteDish={(_id) => deleteDish(_id)}
                updateDish={(id, updatedDish) => updateDish(id, updatedDish)}
                setActionMessage={setActionMessage}
              />} />
          <Route
            path="/dishform"
            element={
              <Dish
                dish={blankDish}
                isChef={isChef}
                isEdit={isEdit}
                isBlankDish={isBlankDish}
                setIsBlankDish={() => setIsBlankDish(false)}
                addDish={(updatedDish) => addDish(updatedDish)}
                setIsEdit={() => setIsEdit(!isEdit)}
                setActionMessage={setActionMessage}
              />} />
          <Route
            path="*"
            element={(
              <>
                <Error />
                <Home setIsChef={setIsChef} />
              </>)} />
        </Routes>
      </div>
    </>
  )
}

export default App
