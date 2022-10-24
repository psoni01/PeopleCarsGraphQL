import { useState } from 'react'

import { EditOutlined } from '@ant-design/icons'
import { Button, Card } from 'antd'
import RemoveCar from '../buttons/RemoveCar'
import UpdateCar from '../forms/UpdateCar'

const getStyles = () => ({
  card: {
    width: '500px'
  }
})
const Car = props => {
  const { id, year, model, make, price, personId } = props
  const styles = getStyles()

  const [editMode, setEditMode] = useState(false)

  const handleButtonClick = () => setEditMode(!editMode)

  return (
    <>
      {editMode ? (
        <UpdateCar
          id={id}
          year={year}
          make={make}
          model={model}
          price={price}
          personId={personId}
          onButtonClick={handleButtonClick}
        />
        // <Button onClick={handleButtonClick}/>
      ) : (
       
         <Card type="inner" title={`${make} ${model}`}  actions={[
            <EditOutlined key='edit' onClick={handleButtonClick} />,
            <RemoveCar id={id} />
          ]}>
      Year: {year}
      Price: {price}

    </Card>   
          

      )}
    </>
  )
}

export default Car
