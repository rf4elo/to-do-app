import '../styles/App.css';

import { Header } from '../components/Header';
import { AddTaskField } from '../components/AddTaskField';
import { ListTasks } from '../components/ListTasks';
import { Footer } from '../components/Footer';


export function App() {

  return (
    <>
      <Header />

      <div className='app-content' >

        <AddTaskField />

        <ListTasks />

      </div>

      <Footer />
    </>
  )
}
