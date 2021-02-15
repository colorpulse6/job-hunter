import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const confirmDelete = (item, func, index) => {
    confirmAlert({
        
        message: `Are you sure to delete this ${item}?`,
        buttons: [
          {
            label: 'Yes',
            onClick: () => func(index)
          },
          {
            label: 'No',
            onClick: () => {}
          }
        ]
      });
    
}

export default confirmDelete