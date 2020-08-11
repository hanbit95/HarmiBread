import React, { useEffect, useState } from 'react'
import { FaCode } from "react-icons/fa";
import Axios from "axios";
import { Icon, Col, Card, Row, Carousel } from 'antd'; 
import Meta from 'antd/lib/card/Meta';
import { FireOutlined  } from '@ant-design/icons';
import ImageSlider from '../../Utils/ImageSlider';
import CheckBox from './Sections/CheckBox';
import Radiobox from './Sections/RadioBox';
import SearchFeature from './Sections/SearchFeature';
import { category, price } from './Sections/Datas';
import './LandingPage.css';

function LandingPage() {

    const [Products, setProducts] = useState([])
    const [Skip, setSkip] = useState(0) // 더보기 페이지용. 
    const [Limit, setLimit] = useState(3)
    const [PostSize, setPostSize] = useState()
    const [Filters, setFilters] = useState({
        category: [],
        price: []
    })
    const [SearchTerm, setSearchTerm] = useState("")

    useEffect(() => {

        let body = {
            skip: Skip,
            limit: Limit
        } 

        getProducts(body)

    }, [])

    const getProducts = (body) => {
        Axios.post('/api/product/products', body)
            .then(response => {
                if (response.data.success) {
                    if (body.loadMore) {
                        setProducts([...Products, ...response.data.productInfo])
                    } else {
                        setProducts(response.data.productInfo)
                    } 
                    setPostSize(response.data.postSize)   
                } else {
                    alert("Failed to bring the products :(")
                }
            })

    }

    const loadMoreHandler = () => {
        //let use when declaring variable. 

        let skip = Skip + Limit; 
      
        let body = {
            skip: Skip,
            limit: Limit,
            loadMore: true //더보기 버튼 눌렀을때 되는애라고 말해주기
        }
        
        getProducts(body)
        setSkip(skip)
    }

    const renderCards = Products.map((product, index) => {

        return <Col lg={6} md={8} xs={24} key={index}>
            <Card
                cover={<a href={`/product/${product._id}`}><ImageSlider images={product.images} /></a>}
            >   
                <Meta
                    title={product.title}
                    description={`$${product.price}`}
                />
            </Card>
        </Col>
    })

    const showFilteredResults = (filters) => {

        let body = {
            skip: 0,
            limit: Limit,
            filters: filters
        }

        getProducts(body)
        setSkip(0)

    }

    const handlePrice = (value) => {
        const data = price;
        let array = [];

        for (let key in data) {

            if(data[key]._id === parseInt(value, 10)) {
                array = data[key].array;
            }
        }
        return array;
    }

    const handleFilters = (filters, category) => {

        const newFilters = { ...Filters }

        newFilters[category] = filters 

        if(category === "price") {
            let priceValues = handlePrice(filters)
            newFilters[category] = priceValues
        }

        showFilteredResults(newFilters)
        setFilters(newFilters)

    }

    const updateSearchTerm = (newSearchTerm) => {

        let body ={
            skip: 0,
            limit: Limit,
            filters: Filters,
            searchTerm: newSearchTerm
        }
        setSkip(0)
        setSearchTerm(newSearchTerm)
        getProducts(body)
    }



    return (
        
        <div style={{ width: '75%', margin: '3rem auto' }}>

           
            
            <div style={{ textAlign: 'center'}}>
                <h2> <FireOutlined /> <span> </span>Start your day with Harmi Brekkie Cakes! </h2>
                <p> Hey yo, try our new Brekkie trio </p>

            </div>

            {/* Filter */}

            <Row gutter={[16,16]}>
                <Col lg={12} xs={24} >
                    {/* Checkbox */}
                    <CheckBox list={ category } handleFilters={filters => handleFilters(filters, "category")}/> 
                </Col>
                <Col lg={12} xs={24} >
                    {/* Radiobox */}
                    <Radiobox list={price} handleFilters={filters => handleFilters(filters, "price")}/>
                </Col>
            </Row>

            

            {/* Search */}

            <div style={{ display:'flex', justifyContent: 'flex-end', margin: '1rem auto' }}>
                <SearchFeature 
                    refreshFunction={updateSearchTerm}
                />
            </div>
            

            {/* Card */}

            <Row gutter={[16, 16]}>
                {renderCards}
            </Row>

            <br />

            {PostSize >= Limit &&
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button onClick={loadMoreHandler}> 더보기 </button>
                </div>
            }
            
        </div>
    
    )
}
export default LandingPage
