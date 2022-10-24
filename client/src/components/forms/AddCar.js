import { useEffect, useState } from 'react'
import { useMutation , useQuery} from '@apollo/client'
import { Button, Form, Input, InputNumber, Select } from 'antd'
import { v4 as uuidv4 } from 'uuid'
import { ADD_CAR, GET_PEOPLE, GET_CARS } from '../../queries'

const AddCar = () => {
    const [id] = useState(uuidv4())
    const [addCar] = useMutation(ADD_CAR)
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
        let { year, make, model, price, personId } = values
        console.log(typeof(year));
        year = year.toString();
        price = price.toString();
        addCar({
            variables: {
                id,
                year,
                make,
                model,
                price,
                personId
            }
            ,
            update: (cache, { data: { addCar } }) => {
                const data = cache.readQuery({ query: GET_CARS })
                cache.writeQuery({
                    query: GET_CARS,
                    data: {
                        ...data,
                        cars: [...data.cars, addCar]
                    }
                })
            }
        })
    }

    return (
        <Form
            form={form}
            name='add-car-form'
            layout='inline'
            onFinish={onFinish}
            size='large'
            style={{ marginBottom: '40px' }}
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
                        disabled={
                            !form.isFieldsTouched(true) ||
                            form.getFieldsError().filter(({ errors }) => errors.length).length
                        }
                    >
                        Add Car
                    </Button>
                )}
            </Form.Item>
        </Form>
    )
}

export default AddCar
