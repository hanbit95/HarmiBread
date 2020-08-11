import React, { useState } from 'react'
import { Typography, Form, Input } from 'antd';
import 'bootstrap/dist/css/bootstrap.css';
import FileUpload from'../../Utils/FileUpload';
import Axios from 'axios';
const { Title } = Typography;
const { TextArea } = Input;


const Categories = [
    { key: 1, value: "Please select..." },
    { key: 2, value: "Brekkie Cakes" },
    { key: 3, value: "Chickpea Spread" },
]

const ExpirationDate = [
    { key: 1, value: "Please select..." },
    { key: 2, value: "within a week" },
    { key: 3, value: "within two weeks" },
    { key: 4, value: "within a month" }
]

const DaysAvailbe = [
    { key: 1, value: "Please select..." },
    { key: 2, value: "on Mondays" },
    { key: 3, value: "on Tuesdays" },
    { key: 4, value: "on Wednesdays" },
    { key: 5, value: "on Thursdays" },
    { key: 6, value: "on Fridays" },
    { key: 7, value: "on Saturdays" },
    { key: 8, value: "on Sundays" }

]

const SellingQuantity = [
    { key: 1, value: "Please select..." },
    { key: 2, value: "0" },
    { key: 3, value: "5" },
    { key: 4, value: "10" },
    { key: 5, value: "15" },
    { key: 6, value: "20" },
    { key: 7, value: "25" },
    { key: 8, value: "30" }

]


function UploadProductPage(props) {

    const [Title, setTitle] = useState("")
    const [CategoriesValue, setCategoriesValue] = useState(1)
    const [Description, setDescription] = useState("")
    const [Price, setPrice] = useState(0.00)
    const [Ingredient, setIngredient] = useState("")
    const [StoringMethod, setStoringMethod] = useState("")
    const [ExpirationDateValue, setExpirationDate] = useState(1)
    const [DaysAvailableValue, setDaysAvailableValue] = useState(1)
    const [SellingQuantityValue, setSellingQuantityValue] = useState(0)

    const [Images, setImages] = useState([])
    


    

    const titleChangeHandler = (event) => {
        setTitle(event.currentTarget.value)
    }

    const descriptionChangeHandler = (event) => {
        setDescription(event.currentTarget.value)
    }

    const priceChangeHandler = (event) => {
        setPrice(event.currentTarget.value)
    }

    const categoriesChangeHandler = (event) => {
        setCategoriesValue(event.currentTarget.value)
    }

    const ingredientChangeHandler = (event) => {
        setIngredient(event.currentTarget.value)
    }

    const storingMethodChangeHandler = (event) => {
        setStoringMethod(event.currentTarget.value)
    }

    const expirationDateChangeHandler = (event) => {
        setExpirationDate(event.currentTarget.value)
    }
    
    const daysAvailableChangeHandler = (event) => {
        setDaysAvailableValue(event.currentTarget.value)
    }

    const sellingQuantityChangeHandler = (event) => {
        setSellingQuantityValue(event.currentTarget.value)
    }

    const updateImages = (newImages) => {
        setImages(newImages)
    } 

    const submitHandler = (event) => {
        event.preventDefault(); //submit버튼 눌렀을때 refresh되지 말라고 해준 코드

    
        if(!Title || !CategoriesValue || !Description || !Price || !Ingredient || !StoringMethod 
            || !ExpirationDateValue || !DaysAvailableValue || !SellingQuantityValue || !Images) {
                return alert("Hey, you must complete all parts before moving on.")
            }


        //서버에 채운 값은 request로 보낸다.
        const body ={
            //로그인된 사람의 ID
            writer: props.user.userData._id,
            title: Title,
            category: CategoriesValue,
            description: Description,
            price: Price,
            ingredient: Ingredient,
            storingMethod: StoringMethod,
            expiration: ExpirationDateValue,
            daysAvailable: DaysAvailableValue,
            initialQuantity: SellingQuantityValue,
            images: Images,

        }
        Axios.post("/api/product", body)
            .then(response => {
                if(response.data.success) {
                    alert('You successfully uploaded a new product. Congrats!')
                    props.history.push('/')
                }else {
                    alert('Failed. Try again :(')
                }
            })


    }


    return (
        <div style = {{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style ={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h2> Product Uploading Page </h2>  
            <p>Please select an option or fill out the forms below to upload your product.</p>  
            </div>

            <Form onSubmit={submitHandler}>
                <FileUpload refreshFunction={updateImages}/><br /><br />
                <label>Product name</label>
                <Input 
                    onChange={titleChangeHandler} 
                    value={Title} 
                />
                <br />
                <br />
                <label>Description</label>
                <TextArea 
                    onChange={descriptionChangeHandler} 
                    value={Description}
                />
                <br />
                <br />
                <label>Price(<b>USD</b>)</label>
                <Input type="number" onChange={priceChangeHandler} value={Price}/>
                <br />
                <br />
                <label>Ingredients</label>
                <TextArea
                    onChange={ingredientChangeHandler}
                    Value={Ingredient}
                />
                <br />
                <br />
                <label>Storing method</label>
                <TextArea
                    onChange={storingMethodChangeHandler}
                    Value={StoringMethod}
                />
                <br />
                <br />
                <label>Product category:</label> <span></span>
                <select onChange={categoriesChangeHandler} value={CategoriesValue}>
                    {Categories.map(item => (
                      <option key={item.key} value={item.key}>{item.value}</option>  
                    ))}
                </select>
                <br />
                <br />
                <label> Expiration date:</label> <span></span>
                <select onChange={expirationDateChangeHandler} value={ExpirationDateValue}>
                    {ExpirationDate.map(item => (
                      <option key={item.key} value={item.key}>{item.value}</option>  
                    ))}
                </select>
                <br />
                <br />
                <label> Days available:</label> <span></span>
                <select onChange={daysAvailableChangeHandler} value={DaysAvailableValue}>
                    {DaysAvailbe.map(item => (
                      <option key={item.key} value={item.key}>{item.value}</option>  
                    ))}
                </select>
                <br />
                <br />
                <label> Selling quantity :</label> <span></span>
                <select onChange={sellingQuantityChangeHandler} value={SellingQuantityValue}>
                    {SellingQuantity.map(item => (
                      <option key={item.key} value={item.key}>{item.value}</option>  
                    ))}
                </select>
                <br />
                <br />
                <button class = "btn btn-primary btn-md btn-block" type="submit">
                    Submit!
                </button>


            </Form>

        </div>
    )
}

export default UploadProductPage
