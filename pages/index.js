import Head from 'next/head'
import styles from '../styles/layout.module.css'
import ToDo from '../components/ToDo';
import Done from '../components/Done';
import Doing from '../components/Doing';
import Archived from '../components/Archived';
import axios from 'axios';



export default function Home({todos}) {
  return (
    <div >
    <Head>
      <title>Home Page</title>
      <meta name="description" content="todo list home page" />
    </Head>
   
    <h1 className={`text-center ${styles.title}`}>Todo List</h1>
    <div className="container-fluid">
      <div className="row justify-content-center mt-5 gap-3">
      
      <ToDo todos={todos}/>
      <Doing  />
      <Done />
      <Archived />
      

      </div>
    </div>
    </div>
  )
}

export const getStaticProps = async () => {
 const todos = await axios.get("https://front-end-todo-test.herokuapp.com/todos?key=sec-010");

  return{
    props:{
      todos:todos.data
    }
  }

}
