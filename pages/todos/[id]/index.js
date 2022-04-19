import { useRouter } from "next/router";
import Head from 'next/head';
import styles from '../../../styles/layout.module.css'
import  Link  from "next/link";
import axios from "axios";


const todos = ({todo}) => {
 
    const router = useRouter();
    const {id} = router.query
  return (
      <>
           <Head>
        <title>Task Details</title>
        <meta name="description" content="todo list task details" />
    </Head>
    <h1 className={`text-center ${styles.title}`}>Todo List</h1>
    <div className={`text-center ${styles.taskDetails}`}>
    
        <div className={`${styles.taskDetailsSection}`}>
       <h4>Task Details</h4> 
       <hr />
       <div className={`${styles.taskDetailsCard}`}>
          <div className={`my-3 ${styles.taskDetailsCardName}`}>
          <h6 className="fw-bold">Name</h6>
          </div> 
           <p>{todo.title}</p>
       
          <div className={`my-3 ${styles.taskDetailsCardSubject}`}><h6 className="fw-bold">Subject</h6></div> 
           <p>{todo.subject}</p>
       </div>
          <div className={` ${styles.taskDetailsCardStatus}`}><h6 className="fw-bold">Status</h6></div> 
           <p className={`ms-3 ${styles.taskDetailsCardStatusP}`}>{todo.status}
           <span className={styles.circle}></span></p>
       </div>
        
    
    
    </div>
    <div className={`text-end w-75 btn mt-5 `}>
    <Link  href='/'>Back</Link>
    </div>
    
      </>
   
  )
}


export default todos;
export const getServerSideProps = async (context) => {
    const response = await axios.get(`https://front-end-todo-test.herokuapp.com/todos/${context.params.id}?key=sec-010`);
    return{
        props:{
            todo:response.data
        }
    }
}