'use client'
import React from 'react'
import Button from 'react-bootstrap/Button'
import Link from 'next/link'
import Form from 'react-bootstrap/Form';
import { MdCancelPresentation } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import InputGroup from 'react-bootstrap/InputGroup';

import useWindowDimensions from '../../hooks/customeHookWindow'

import ModalTask from '@/components/ModalTask'
import SpinnerComponent from '@/components/SpinnerComponent'

import { type ReadListTasks, ToDoFetch } from '@/utils'

import './tasks.css'

const toDoFetch = new ToDoFetch();

export type DictionaryPriority = Record<string, string>;;

const dictionary: DictionaryPriority = {
  low:'Baja',
  medium: 'Media',
  high: 'Alta'
}

const stateFilteredHelper={
  Completada:true,
  Pendiente:false
}

const contacts: React.FC = () => {

  const [contactsArray, setContactsArray] = React.useState<ReadListTasks[]>([])

  const [spinnerAction, setSpinnerAction] = React.useState<boolean>(true)
  const [modeModal, setModeModal] = React.useState<boolean>(false)
  const [modalOn, setModalOn] = React.useState<boolean>(false)
  const [data, setData] = React.useState<ReadListTasks>()

  const [filteredBy, setFilteredBy] = React.useState<ReadListTasks[]>([])
  const [filterState, setFilterState] = React.useState('Filtrar Todo')
  const screenWidth = useWindowDimensions()
  
  const getData = async (): Promise<void> => {
    const res = await toDoFetch.read();
    setSpinnerAction(true)
    setContactsArray(res)
    setFilteredBy(res)
    setSpinnerAction(false)
    
  }

  const deleteContact = async (_id: string): Promise<void> => {
    await toDoFetch.delete(_id);
    const deletedItem = contactsArray.filter((item) => item._id !== _id)
    setContactsArray(deletedItem)
    setFilteredBy(deletedItem)
  }

  const updateStatus = async (item: ReadListTasks): Promise<void> => {
    await toDoFetch.update({
      _id: item._id,
      taskName: item.task,
      priority: item.priority,
      state: !item.state
    });
    const deletedItem = contactsArray.map((element) => {
      let state = element.state;
      if(element._id === item._id){state = !item.state}
      return {...element, state};
    })
    setContactsArray(deletedItem)
    setFilteredBy(deletedItem)
  }

  const editContact = (item: ReadListTasks): void => {
    // console.log({editContact: item});
    setData(item)
    setModeModal(true)
    setModalOn(true)
  }
  const addContact = (): void => {
    setModeModal(false)
    setModalOn(true)
    setData(undefined);
  }

  const modalShow = (state: boolean): void => {
    setModalOn(state)
    if(!state){
    void getData()}
  }

  const filterBy = (input: string): void => {
    let newFiltered
    if (input!==''){
    newFiltered = filteredBy.filter(
      (item) => item.task.includes(input)
    )}
    else{
      newFiltered= contactsArray
    }
    setFilteredBy(newFiltered)
  }
  
  
  const filterByState = (input:string):void=>{
    let taskArrayStateFiltered = contactsArray
    setFilterState(input)
    
    if (input === 'Completada'){
      taskArrayStateFiltered = contactsArray.filter((item)=> item.state===stateFilteredHelper[input]) 
    }
    else if(input === 'Pendiente'){ 
      taskArrayStateFiltered = contactsArray.filter((item)=> item.state===stateFilteredHelper[input]) 
    }
    setFilteredBy(taskArrayStateFiltered)
  }

  
 

  React.useEffect(() => {
    void getData()
  }, [modalOn])

  return (
    <div className="container-sm mx-auto
    ">
      <div className="container my-4">
     
          <InputGroup className="mb-3"
          >
        <DropdownButton
          variant="outline-secondary"
          title={filterState}
          id="input-group-dropdown-1"
        >
          <Dropdown.Item onClick={()=>{filterByState('Todo')}} href="#">Filtrar Todo</Dropdown.Item>
          <Dropdown.Item onClick={()=>{filterByState('Completada')}} href="#">Filtrar Completada</Dropdown.Item>
          <Dropdown.Item onClick={()=>{filterByState('Pendiente')}} href="#">Filtrar Pendiente</Dropdown.Item>
        </DropdownButton>
        <Form.Control aria-label="Text input with dropdown button" 
        type="search"
        placeholder="Tarea"
        onChange={(e): void => {
          filterBy(e.target.value)
        }}
        />
      </InputGroup>

      </div>

      {!spinnerAction ? (
        <table className="table table-striped mt-3">
          <thead>
            <tr>
              
              <th scope="col">Tarea</th>
              <th scope="col">Estado</th>
             { 

             (screenWidth?.width ?? 0) >= 760 ? <th scope="col">Prioridad</th>:null
             }
              <th scope="col">Controles</th>
            </tr>
          </thead>
          <tbody>
            {filteredBy.map((item, index) => (
              <tr key={index}>
               
                <td>
                  <Link className={item.priority==='high'? 'text-danger':item.priority==='medium'? 'text-warning':'text-success'}
                    href={`/tasks/${item.task}*${item.priority}*${item.state?'true':'false'}`}
                  >
                    <h5>
                    {item.task}
                      </h5>
                  </Link>{' '}
                </td>
                <td>
                <Form>
                  <Form.Check // prettier-ignore
                    type="switch"
                    id="custom-switch"
                    label={item.state ? 'Completada':'Pendiente'}
                    checked={item.state}
                    onChange={(e)=>{
                      // console.log(e.target.checked, item)
                      void updateStatus(item)
                    }
                    }
                  />
               </Form>
                </td>
               
               { 
               (screenWidth?.width ?? 0)>= 760 ? <td className={item.priority==='high'? 'text-danger':item.priority==='medium'? 'text-warning':'text-success'}>
                {dictionary[item.priority]}
                </td>:null
               }
                <td>
                 <div className='controls-container'>
                  <div className='control-container delete' onClick={()=>{void deleteContact(item._id)}}>
                    <MdCancelPresentation size={25}/>
                  </div>
                  
                  <div className='control-container edit' onClick={()=>{
                     editContact(item)
                    // console.log('Editar')
                  }}>
                    <FaEdit size={25}/>
                  </div>
                 </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>
          <SpinnerComponent />
        </div>
      )}
      <div className="position-relative">
        <Button className="position-absolute top-0 end-0" variant="primary" onClick={addContact}>
          +
        </Button>
      </div>

      {
        modalOn && 
        <ModalTask
        modeModal={modeModal}
        data={data}
        modalOn={modalOn}
        modalShow={modalShow}
        />
      }
    </div>
  )
}

export default contacts
