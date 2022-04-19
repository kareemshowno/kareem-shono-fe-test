import Link from 'next/link';
import React,{useId} from 'react';
import styles from '../styles/layout.module.css';
import axios from 'axios';
import Draggable from 'react-draggable';
const ToDo = ({todos}) => {
  const nodeRef = React.useRef(null);
  //ADD MODAL STATE
  const [showModal, setShowModal] = React.useState(false);
  const toggleModal = () => {
    setShowModal(!showModal);

  }
  //END ADD MODAL STATE
     

  //EDIT MODAL STATE
  const [showModalEdit,setShowModalEdit] = React.useState({
    show:false,
    task:null
  });
  const openModalEdit = (task) => {
    setShowModalEdit({
      show:true,
      task:task
    })

  }
  const closeModalEdit = () => {
    setShowModalEdit({
      show:false,
      task:null
    })
    
  }
//END EDIT MODAL STATE 

 //DELETE MODAL STATE
 const [showModalDelete,setShowModalDelete]= React.useState({
  show:false,
  task:null
})
const openModalDelete = (t) => {
 
  setShowModalDelete({
    show:true,
    task:t
    
  });

 

}
const closeModalDelete = () => {
  setShowModalDelete({
    show:false,
    task:null
  })
}
//END DELETE MODAL STATE

  

  //submit add form 

  const handleSubmit = async (event) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault();

    // Get data from the form.
    
  
    
     axios.post(`https://front-end-todo-test.herokuapp.com/todos/?key=sec-010`, { 
      title: event.target.task_title.value,
      subject: event.target.task_subject.value,
     })
  
   
    alert("Task Added Succesfuly")
    event.target.task_title.value = '';
    event.target.task_subject.value ='';
    window.location.reload();
  }
  //end submit form
//delete submit form
const handleDeleteSubmit = async (e) => {
  e.preventDefault();
  
   axios.delete(`https://front-end-todo-test.herokuapp.com/todos/${showModalDelete.task._id}?key=sec-010`);

  alert('DELETED !!');
  window.location.reload();

}

//end delete submit form
//edit submit form 
const handleEditSubmit = async (e) => {
  e.preventDefault();
  axios.patch(`https://front-end-todo-test.herokuapp.com/todos/${showModalEdit.task._id}?key=sec-010`,{
    title:e.target.task_title_edit.value,
    subject:e.target.task_subject_edit.value
  })

  alert("Task Updated succesfuly")
  e.target.task_title_edit.value = '';
  e.target.task_subject_edit.value ='';
  window.location.reload();
}



 //ADD TASK MODAL
  const AddModal = () => {
   
   
    return(
      <div className={`${styles.modal}`}>
        <div className={`${styles.modalContent}`}>
          <div className={`${styles.modalHeader}`}>
            <h4>Add a New Task</h4>
            <i onClick={toggleModal} className={` bi bi-x-lg ${styles.closeModalBtn}`}></i>
          </div>
          <div className={`${styles.modalBody}`}>
            <form onSubmit={handleSubmit}>
              <div className="form-group my-2">
                <input   className={`form-control ${styles.formControl}`} type="text" name="task_title" id="task_title" placeholder='Title' required />
               
              </div>
              <div className="form-group my-2">
                <textarea  className={`form-control ${styles.formControl}`} rows={5} type="text" name="task_subject" id="task_subject" placeholder='Subject' required  />
              </div>
              <div className={`${styles.modalBtn}`}>
              <button className={` btn ${styles.addBtn}`}>ADD</button>
              </div>
              
            </form>
          </div>
        </div>
      </div>
    )
  }
  //END ADD TASK MODEL
  ///////
  //////////
  //EDIT TASK MODAL 
  const EditModal = () => {
    return(
      <div className={`${styles.modal}`}>
        <div className={`${styles.modalContent}`}>
          <div className={`${styles.modalHeader}`}>
            <h4>Edit Task</h4>
            <i onClick={closeModalEdit} className={` bi bi-x-lg ${styles.closeModalBtn}`}></i>
          </div>
          <div className={`${styles.modalBody}`}>
            <form onSubmit={handleEditSubmit} >
              <div className="form-group my-2">
                <input   defaultValue={showModalEdit.task.title}  className={`form-control ${styles.formControl}`} type="text" name="task_title_edit" id="task_title_edit" placeholder='Title'/>
              </div>
              <div className="form-group my-2">
                <textarea  defaultValue={showModalEdit.task.subject} className={`form-control ${styles.formControl}`} rows={5} type="text" name="task_subject_edit" id="task_subject_edit" placeholder='Subject'/>
              </div>
              <div className={`${styles.modalBtn}`}>
              <button className={` btn ${styles.editBtn}`}>Edit</button>
              </div>
              
            </form>
          </div>
        </div>
      </div>
    )
  }
  //END EDIT TASK MODAL

 //DELETE MODAL 
 const DeleteModal = () => {
   return (
    <div className={`${styles.modal}`}>
    <div className={`${styles.modalContent}`}>
      <div className={`text-center justify-content-center ${styles.modalHeader}`}>
        <h4 className=' my-5'>Are you sure you want to delete this Task ?</h4>
        <i onClick={closeModalDelete} className={` bi bi-x-lg ${styles.closeModalBtn}`}></i>
      </div>
      <div className={`${styles.modalBody}`}>
        <form onSubmit={handleDeleteSubmit}>
       
        <div className='text-center'>
        <Link href="/">Back</Link>
          <button type='submit' className='mx-3  btn btn-success'>Yes</button>
        </div>
 
          
         
          
        </form>
      </div>
    </div>
  </div>
   )
 }
  return (
    
    <>
    
    {showModal ? <AddModal />:''}
    {showModalEdit.show ? <EditModal />:''}
    {showModalDelete.show ? <DeleteModal />:''}
    
         <div className={`col-md-3 titleBorder ${styles.card} `}>
        <div className={`${styles.cardHead} ${styles.borderRed}`} >
            <h4>To Do</h4>
            <p className='d-inline-block'>Things that needs to be done.</p>
            <i onClick={toggleModal} className={`${styles.addIcon} bi bi-plus-circle-fill`}></i>
        </div>
   
        <div className={styles.cardBody}>
            <ul className={styles.cardList}>
           
            {todos.map(todo => {
              return(
                <Draggable  nodeRef={nodeRef} key={todo._id}>
                <li  ref={nodeRef} className={`my-2 ${styles.cardListItem}`}>
              
             <Link href='/todos/[id]' as={`/todos/${todo._id}`}>{todo.title}</Link>   
              <div>
              <i  onClick={() => openModalEdit(todo)} className={`bi bi-pencil-square mx-1 ${styles.editIcon}`}></i> 
             <i onClick={() => openModalDelete(todo)} className={`bi bi-trash mx-1 ${styles.deleteIcon}`}></i>
              </div>
          
                </li></Draggable>
              )
            })}
           
            </ul>
           
        </div>
    </div>
    </>
 
  )
}

export default ToDo;