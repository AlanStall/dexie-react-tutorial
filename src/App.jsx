import { useState } from 'react'
import { useLiveQuery } from 'dexie-react-hooks'
import './app.css'
import { db } from "./db";

function AddFriendForm({defaultAge} = {defaultAge: 21}) {
  const [name, setName] = useState("");
  const [age, setAge] = useState(defaultAge);
  const [status, setStatus] = useState("");

  async function addFriend() {
    try {
      // Add the new friend!
      const id = await db.friends.add({ 
        name,
        age
      });
      setStatus(
        `
        Friend ${name} successfully added. 
        Got id (registration number) ${id}. 
        Your age is ${age}
        `
        );
      setName("");
      setAge(defaultAge); 
    } catch (error) {
      setStatus(`Failed to add ${name}: ${error}`);
    }
  }

  return <>
    <p>
      {status}
    </p>
    Name:
    <input
      className="input-name"
      type="text"
      value={name}
      onChange={ev => setName(ev.target.value)}
    />
    <br></br>
    
    Age:
    <input
      className="input-age"
      type="number"
      value={age}
      onChange={ev => setAge(Number(ev.target.value))}
    />
    <br></br>
    <br></br>
    <button onClick={addFriend}>
      Add
    </button>
    <br></br>
    <br></br>
  </>
}


function FriendList({minAge, maxAge}) {
    const friends = useLiveQuery(
      async () => {
        //
        // Query Dexie's API
        //
        const friends = await db.friends
          .where('age')
          .between(minAge, maxAge)
          .toArray();

        // Return result
        return friends;
      },
      // specify vars that affect query:
      [minAge, maxAge] 
    );
  
    return <>
        {friends?.map(friend => <ul key={friend.id}>
          {friend.name} - {`Age: ${friend.age}`}
        </ul>)}
      </>;
}


export const App = () => <>

  <h1>My simple Dexie app - React - Tutorial</h1>

  <h2>Add Friend</h2>
  <AddFriendForm defaultAge={21} />

  <h2>Friend List</h2>
  <FriendList minAge={18} maxAge={66} />
</>;

