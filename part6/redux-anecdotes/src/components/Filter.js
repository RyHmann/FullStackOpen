import { filterChange } from '../reducers/filterReducer'
import { useDispatch } from 'react-redux'

const Filter = () => {

    const dispatch = useDispatch()


    const handleChange = (event) => {
      const filter = event.target.value
      console.log('filter: ', filter)
      dispatch(filterChange(filter))
    }

    const style = {
      marginBottom: 10
    }
  
    return (
      <div style={style}>
        filter <input name='filter' onChange={handleChange} />
      </div>
    )
  }
  
  export default Filter