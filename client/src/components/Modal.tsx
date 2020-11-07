import React, { useState, useEffect } from 'react';
import Rodal from 'rodal';
import AddJob from '../components/job-board/AddJob'
// include styles
import 'rodal/lib/rodal.css';


const Modal = (props) => {

    const [visible, setVisible] = useState(false)

    const show = () => {
        setVisible(true)
    }

    const hide = () => {
        setVisible(false)
    }

    useEffect(()=>{
        if(props.jobAdded){
            hide()
        }
    }, [props.jobAdded])
        
  console.log(props.jobAdded)

    return (
        <div>
        <button onClick={show}>Add Job</button>

        <Rodal visible={visible} onClose={hide}>
          <div>{props.content}</div>
        </Rodal>
      </div>
    )
}

export default Modal
