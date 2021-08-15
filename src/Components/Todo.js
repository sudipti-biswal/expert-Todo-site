import React, { useState ,useEffect} from "react";
import todo from "../img/todo.jpg"
import { RiCloseCircleLine } from "react-icons/ri";
import { TiEdit,TiPlus } from "react-icons/ti";



//Toget the data from LocalStorage

const getLocalItems= ()=>{
   
   let list = localStorage.getItem('lists')
   console.log(list);

   if(list){
    return JSON.parse( localStorage.getItem('lists'));
   }else{
    return[]
   }

}

const Todo = () => {
  
const [inputData,setInputData]=useState("");
const [items,setItems]=useState(getLocalItems());
const [toggleSubmit,settoggleSubmit]=useState(true);
const [isEditItem,setIsEditItem]=useState(null);

//add todos button onclick Here
const addItem =()=>{
  if(!inputData){
    alert("Please Fill Valid Todo !");
  }else if(inputData && !toggleSubmit){
    setItems(
      items.map((elem)=>{
        if (elem.id === isEditItem){
          return{...elem,name:inputData}
        }
        return elem;
      })
      )
    settoggleSubmit(true);
    setInputData('');
    setIsEditItem(null); 
  }

  else{
    const allInputData = {id: new Date().getTime().toString(), name:inputData }
    setItems([...items,allInputData]);
    setInputData('')
  }
 
}

//Delete todos button onclick here

const deleteItem =(index)=>{
 
const updateditems = items.filter((elem)=>{
  return index != elem.id;
});
setItems(updateditems);
}

//edit btn section 

const editItem =(id)=>{
  let newEditItem = items.find((elem)=>{
    return elem.id === id
  })
  settoggleSubmit(false);
  setInputData(newEditItem.name);
  setIsEditItem(id);
}

//remove all button onclick here

const removeAll =()=>{
setItems([]);

}

//local Storege data

useEffect(()=>{
  localStorage.setItem('lists',JSON.stringify(items));
  console.log(items);
},[items]);

// Store
localStorage.setItem("lastname", "Smith");



  return(
    <>
     <div className="main-div">
      <div className="child-div">

      //img section
        <figure>
          <img src={todo} alt="" />
          <figcaption> What's your Task for Today ? </figcaption>
        </figure>


        //input (add)section

        <div className="addItems">
           <input 
           type="text" 
           placeholder="Write Here Your Today Tasks" 
           title="Add Todo" 
           value={inputData}
           onChange={(e)=>setInputData(e.target.value)}
           />
           {toggleSubmit ?
           <TiPlus className=" plus-btn" onClick={addItem}/> :
            <TiEdit className="add-btn" title="update Todo" onClick={addItem}/>
           }
          
        </div>
           

         //Each item and all items section
        <div className="showItems">
        {
          items.map((elem)=>{
             return(
                  <div className="eachItem" key={elem.id}>
                      <h3>{elem.name}</h3>
                      <div className="todo-btn">
                       <TiEdit className="add-btn" title="edit Todo" onClick={()=>editItem(elem.id)}/>
                      <RiCloseCircleLine className=" add-btn btn-delete" title="Delete Todo" onClick={()=>deleteItem(elem.id)}/>
                      
                      </div>
                  </div>
              )
          })
        }
        </div>



       //delete section
        <div className="showItems">
          <button className="btn effect04" data-sm-link-text="Remove All" onClick={removeAll} >
          <span>Check List</span>
          </button>
        </div>
      </div>
     </div>

   </>
    )
};

export default Todo;
