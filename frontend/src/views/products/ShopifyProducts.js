import React, { useEffect, useState } from 'react'
import axios, { AxiosRequestConfig } from 'axios'
import {
  CButton,
  CCard,
  CCardBody,
  CCardImage,
  CCardText,
  CCardTitle,
  CCol,
  CRow,
} from '@coreui/react'

import ReactImg from 'src/assets/images/react.jpg'

const ShopifyProducts = () => {
    const [products, setProducts] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        const getProducts = async ()=>{
            try{
                console.log('getProducts')
                const url = 'http://localhost:5000/shopify-product/list'
                const products = await axios.get(url)
                console.log(products)
                setProducts(products.data.products)
                setLoading(false);
            }catch(e){
                alert(e.message)
            }
        }
        getProducts()
    }, [])
  return (
    <CRow>
            {loading ?
                (<p>Loading</p>)
                :
                products.map(product=>(
                    <CCol>
                        <CCard style={{ width: '18rem' }}>
                            <CCardImage orientation="top" src={ReactImg} />
                            <CCardBody>
                            <CCardTitle>Card title</CCardTitle>
                            <CCardText>
                                Some quick example text to build on the card title and make up the bulk of the
                                card&#39;s content.
                            </CCardText>
                            <CButton href="#">Go somewhere</CButton>
                            </CCardBody>
                        </CCard>
                    </CCol>
                ))
            }


    </CRow>
  )
}

export default ShopifyProducts
