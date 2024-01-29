/* eslint-disable @typescript-eslint/no-misused-promises */
import React from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import { type ReadListTasks, ToDoFetch } from '@/utils'

const todoFetch = new ToDoFetch();

// eslint-disable-next-line @typescript-eslint/no-unused-expressions
// 'use client'
interface Props {
  modeModal: boolean
  modalOn: boolean
  data: ReadListTasks | undefined
  modalShow: (state: boolean) => void
}

const ModalContacts: React.FC<Props> = (props) => {
  const isCreation = !props.modeModal;
  
  const [name, setName] = React.useState(props.data?.task)
  const [priority, setPriority] = React.useState(props.data?.priority ?? 'low')
  const [state, setState] = React.useState(props.data?.state ?? false)

  const [textButton, setTextButton] = React.useState('')

  const nameValidations = (nameV: string): void => {
    setName(nameV)
  }
  
  const setData = async (): Promise<void> => {
    try {
      if (isCreation) {
        await todoFetch.create({
          taskName: name ?? '',
          priority
        });
      } else {
        const argsUpdate = {
          _id: props.data?._id ?? '',
          taskName: name ?? '',
          priority,
          state
        };
        await todoFetch.update(argsUpdate);
      }
      props.modalShow(false)
    } catch (e) {
      console.error('Error adding document: ', e)
    }
  }

  React.useEffect(() => {
    if (isCreation) {
      setTextButton('AGREGAR TAREA')
    } else {
      setTextButton('EDITAR TAREA')
    }

    props.modalShow(props.modalOn)
  }, [isCreation, props.modalOn])

  return (
    <>
      <Modal
        show={props.modalOn}
        onHide={() => {
          props.modalShow(false)
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>{textButton}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <>
            <InputGroup size="sm" className="mb-2">
              <InputGroup.Text id="inputGroup-sizing-sm">TAREA</InputGroup.Text>
              <Form.Control
                onChange={(e) => {
                  nameValidations(e.target.value)
                }}
                aria-label="Small"
                aria-describedby="inputGroup-sizing-sm"
                defaultValue={props.data?.task}
              />

            </InputGroup>
            
            <br />



            {
              !isCreation && (
                <Form>
                  <Form.Check
                  type="switch"
                  id="custom-switch"
                  label="Estado"
                  defaultChecked={props.data?.state}
                  onChange={(e)=>{
                    console.log(e.target.checked)
                    setState(e.target.checked)
                  }
                  }
                  />
                </Form>
              )
            }

            <br />


            <InputGroup>

                </InputGroup>


           


            <Form.Group controlId="formBasicSelect">
            <InputGroup>
            <InputGroup.Text>PRIORIDAD</InputGroup.Text>
              <Form.Control
                as="select"
                onChange={e => { setPriority(e.target.value);}}
                defaultValue={props.data?.priority}
                >
                <option value="low">Baja</option>
                <option value="medium">Media</option>
                <option value="high">Alta</option>
              </Form.Control>
              </InputGroup>
            </Form.Group>
            

              </>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              props.modalShow(false)
            }}
          >
            Cerrar
          </Button>
          <Button
            variant="primary"
            onClick={setData}
            // disabled={!nameValidation}
          >
            {textButton}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ModalContacts
