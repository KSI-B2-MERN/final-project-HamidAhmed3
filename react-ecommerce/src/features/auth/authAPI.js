export function createUser(userData) {
  return new Promise(async (resolve) => {
   const response = await fetch(' http://localhost:8008/users',{
          method:'POST',
          body: JSON.stringify(userData),
          headers:{'content-type':'application/json'}
        }) 
        const data = await response.json()
        resolve({data})
        }
);
}

export function checkUser(loginInfo) {
  return new Promise(async (resolve,reject) => {
    const email = loginInfo.email;
    const password = loginInfo.password;
   const response = await fetch(' http://localhost:8008/users?email='+email)
        const data = await response.json();
        console.log({data})
        if(data.length) {
          if(password===data[0].password) {
          resolve({data:data[0]})
          } else{
            reject({message: 'invalid email or password'})
          }
        } else{
          reject({message: 'invalid email or password'})
        }
        }
);
}

export function updateUser(update) {
  return new Promise(async (resolve) => {
   const response = await fetch(' http://localhost:8008/users/'+ update.id,{
          method:'PATCH',
          body: JSON.stringify(update),
          headers:{'content-type':'application/json'}
        }) 
        const data = await response.json()
        resolve({data})
        }
);
}

export function signOut(userId) {
  return new Promise(async (resolve) => {
    // TODO: on server we will remove user session info
    resolve({ data: 'success' });
  });
}