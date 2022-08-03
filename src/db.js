
import Dexie from 'dexie';

export const db = new Dexie('myDatabase');
db.version(1).stores({
  friends: '++id, name, age', // Primary key and indexed props  
});
// db.open();
// db.friends.add({name: "Peter", age: 23});
// MyDatabase (Storage/DevTools) - Refresh database




