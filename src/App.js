import './App.css';
import foods from './foods.json';
import { useEffect, useState } from 'react';
import { Row, Divider, Card, Col, Button, Input, Image } from 'antd';
import feedbackMsgImg from './FeedbackMsgImg.png';

function App() {
  const [foodList, setFoodList] = useState([...foods]);
  const [filter, setFilter] = useState('');
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="App">
      {showForm ? <AddFoodForm addFoodFunction={setFoodList} /> : null}
      <Button type="primary" ghost onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Hide Form' : 'Add New Food'}
      </Button>
      <Search filterFoodList={setFilter}></Search>

      <Divider>Food List</Divider>
      {foodList.length === 0 ? (
        <div>
          <h2>Oops! There is no more content to show.</h2>
          <img style={{ width: '400px' }} src={feedbackMsgImg}></img>
        </div>
      ) : (
        <Row style={{ width: '100%', justifyContent: 'center' }}>
          {foodList
            .filter((food) => food.name.toLowerCase().includes(filter))
            .map((food) => {
              return (
                <FoodBox
                  key={food.name}
                  food={food}
                  removeFoodOnDelete={setFoodList}
                />
              );
            })}
        </Row>
      )}
    </div>
  );
}

function FoodBox({ food, removeFoodOnDelete }) {
  const { name, calories, image, servings } = food;

  return (
    <Col>
      <Card title={name} style={{ width: 230, height: 300, margin: 10 }}>
        <img src={image} height={60} alt="food" />
        <p>Calories: {calories}</p>
        <p>Servings: {servings}</p>
        <p>
          <b>Total Calories: {calories * servings} </b> kcal
        </p>
        <Button
          type="primary"
          onClick={() => {
            removeFoodOnDelete((arr) =>
              arr.filter((dish) => dish.name !== name)
            );
          }}
        >
          {' '}
          Delete{' '}
        </Button>
      </Card>
    </Col>
  );
}

function AddFoodForm({ addFoodFunction }) {
  const [newFood, setNewFood] = useState({
    name: '',
    image: '',
    calories: 0,
    servings: 0,
  });
  // console.log('NEW FOOD: ', newFood);

  return (
    <form
      onSubmit={(evt) => {
        evt.preventDefault();
      }}
    >
      <Divider>Add Food Entry</Divider>

      <label>Name</label>
      <Input
        value={newFood.name}
        type="text"
        onChange={(e) => setNewFood({ ...newFood, name: e.target.value })}
      />

      <label>Image</label>
      <Input
        value={newFood.image}
        type="text"
        onChange={(e) => {
          setNewFood({ ...newFood, image: e.target.value });
        }}
      />

      <label>Calories</label>
      <Input
        value={newFood.calories}
        type="number"
        onChange={(e) => {
          setNewFood({ ...newFood, calories: e.target.value });
        }}
      />

      <label>Servings</label>
      <Input
        value={newFood.servings}
        type="number"
        onChange={(e) => {
          setNewFood({ ...newFood, servings: e.target.value });
        }}
      />
      <button
        type="submit"
        onClick={() => {
          // console.log('New Food: ', newFood);
          addFoodFunction((kira) => [newFood, ...kira]);
          setNewFood({ name: '', image: '', calories: 0, servings: 0 });
        }}
      >
        Create
      </button>
    </form>
  );
}

function Search({ filterFoodList }) {
  const [search, setSearch] = useState('');
  // console.log('SEARCH: ', search);
  return (
    <>
      <Divider>Search</Divider>

      <label>Search</label>
      <Input
        value={search}
        type="text"
        onChange={(event) => {
          setSearch(event.target.value.toLowerCase());
        }}
      />
      {filterFoodList(search)}
    </>
  );
}

export default App;
