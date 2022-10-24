import { useMutation , useQuery} from '@apollo/client'
import { Button, Form, Input , InputNumber, Select} from 'antd'
import { useEffect, useState } from 'react'
import { UPDATE_CAR , GET_PEOPLE} from '../../queries'


const UpdateCar = props => {
  const { id, year, make, model, price, personId} = props
  const [updateCar] = useMutation(UPDATE_CAR)
  const { Option } = Select

  const [form] = Form.useForm()
  const [, forceUpdate] = useState()

  useEffect(() => {
    forceUpdate({})
  }, [])

  const { loading, error, data } = useQuery(GET_PEOPLE)
  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`


  const onFinish = values => {
    const { year, make, model, price, personId} = values

    updateCar({
      variables: {
        id,
        year,
        make,
        model,
        price,
        personId
      }
    })

    props.onButtonClick()
  }

  return (
    <Form
      form={form}
      name='update-car-form'
      layout='inline'
      onFinish={onFinish}
      initialValues={{
        year: year,
        make: make,
        model: model,
        price: price,
        personId: personId
      }}
    >
      <Form.Item
                label="Year"
                name='year'

                rules={[{ required: true, message: 'Please input car year!' }]}
            >
                <InputNumber  max={2022} />
            </Form.Item>
            <Form.Item
                label="Make"
                name='make'
                rules={[{ required: true, message: 'Please input car make' }]}
            >
                <Input placeholder='i.e. Honda' />
            </Form.Item>

            <Form.Item
                label="Model"
                name='model'
                rules={[{ required: true, message: 'Please input car model' }]}
            >
                <Input placeholder='i.e. Accord' />
            </Form.Item>

            <Form.Item
                label="Price"
                name='price'
                rules={[{ required: true, message: 'Please input price make' }]}
            >
                <InputNumber precision={2} />
            </Form.Item>

            <Form.Item
                label="Owner"
                name='personId'
                rules={[{ required: true, message: 'Please input owner name' }]}
            >
                <Select
                    style={{
                        width: 120,
                    }}
                >
                    {data.people.map(({ id, firstName, lastName }) => (
                        <Option value={id} key={id}>{firstName} {lastName}</Option>
                    ))}</Select>
            </Form.Item>
      <Form.Item shouldUpdate={true}>
        {() => (
          <Button
            type='primary'
            htmlType='submit'
            // disabled={
              
            //   form.getFieldsError().filter(({ errors }) => errors.length).length
            // }
          >
            Update Car
          </Button>
        )}
      </Form.Item>
      <Button type='danger' onClick={props.onButtonClick}>
        Cancel
      </Button>
    </Form>
  )
}

export default UpdateCar
