import './App.css';
import uuid4 from "uuid4";

import { useEffect, useState, createContext, useContext } from 'react'


//React context 

/*
level 0- App {state}
level 1 - MyComponentLevel1
level 2 - MyComponentLevel2 {state -> count}

useMemo useCallback useRef
*/

const MyCountContext = createContext()

const MyComponentLevel1 = () => {
  console.log('I`m render 1')
  const {show} = useContext(MyCountContext)
  return <>
    <MyComponentLevel2  />
    <p>Some text: {show?'Enabled':'Disabled'}</p>
  </>
}
const MyComponentLevel2 = () => {
  console.log('I`m render 2')
  const {count} = useContext(MyCountContext)
  return <span style={{
    background: 'red'
  }}>&nbsp;{count}&nbsp;</span>;
}


function App() {
  console.log('I`m render App')

  const [count, setCount] = useState({
    count: 0
  });
  const [isShowUsers, setShowUsers] = useState(false);

  return (
    <div className="container" onClick={() =>setCount((prevState) => {
      console.log(prevState)
      prevState.count +=1
      return {...prevState}
      } )}>
      <button onClick={() => { setShowUsers(prevState => !prevState)}}>Toggle users</button>
      <MyCountContext.Provider value={{count: count.count, show: isShowUsers}}>
      HOOKS (<MyComponentLevel1  />):
      </MyCountContext.Provider>
      {isShowUsers?<Users />:null}
    </div>
  );
}

export default App;

/** Life circle component:
 * 
 * mount
 * update
 * unmount
 * 
 * mount/update , unmount
 * */

/**
 * state
 * 
 */

//16.8 -> 18



const UserProfiler = (props) => {
  const { user } = props;
  //console.log(user)



  return <div className='userCard'>
    <div>Full name: {user.name}</div>
    <div>Phone: {user.phone}</div>
    <div>Address: {user.address.street} : {user.address.city}</div>
  </div>
}


const Users = () => {

const [myUsers, setMyUsers] = useState([])

  
  
  useEffect(() => {
    console.log('fetch')
    const intervalID = setInterval(() => {
      fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then((data) => { 
        setMyUsers(data)
      })
    } , 5000)
    
    return () => {
      //unmount
      console.log('I`m unmount')
      clearInterval(intervalID);
      
    }
  }, [])

  useEffect(() => {
    console.log('users: ', myUsers)
  }, [myUsers])

  return myUsers.map((myUser) =>  <UserProfiler key={myUser.id} user={myUser} />)
}



const myUsers2 = [
  {
    id: uuid4(),
    firstName: 'Josh',
    lastName: 'Smit',
    address: {
      street: "Backer",
      house: 8
    },
    age: 28
 },
 {
  id: uuid4(),
  firstName: 'Sara',
  lastName: 'Smit',
  address: {
    street: "Kreshatuk",
    house: 8
  },
  age: 25
}]


const MyComponent = () => {

  
  let [count,setCount] = useState(0);
  

  const changeCountHandler = () => {
    setTimeout(() => {
      setCount((prevState) => prevState + 1)
    }, Math.random()*10000)
    
  }

  

  console.log(count)
  

  return <div className='my-component'>
    <div>MyComponent count:  {count} </div>
    <div>
      <button onClick={() => {
        setCount(count - 1)
       }}>-</button>
      <button onClick={changeCountHandler}>+</button>
      <button onClick={() => {
        setCount(0)
  
       }}>reset</button>
       
    </div>
  </div>
}