const users=[]


function adduser(id,username,room){
  const user={id,username,room}


  users.push(user)
  return user;
}


function getcurrent(id){
 return users.find(user=> user.id === id)
}

function userleave(id){
   let index=users.findIndex(user => user.id === id);




   if(index !==  -1){
       return users.splice(index,1)[0]
   }

}

function getroomusers(r){

     let x=users.filter((hamada)=>{
         return hamada.room === r
     })
     
     return x;
  
}

module.exports={
    adduser,
    getcurrent,
    userleave,
    getroomusers
}