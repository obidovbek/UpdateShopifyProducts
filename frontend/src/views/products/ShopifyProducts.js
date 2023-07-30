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
  CForm,
  CFormInput
} from '@coreui/react'
import ReactImg from 'src/assets/images/react.jpg'

const ShopifyProducts = () => {
    const [products, setProducts] = useState();
    const [loading, setLoading] = useState(true)
    const [linkToProduct, setLinkToProduct] = useState({})
    const [linkToProductVar, setLinkToProductVar] = useState({})

    useEffect(()=>{
        const getProducts = async ()=>{
            try{
                const url = `${process.env.REACT_APP_API_URL}/shopify-product/list`
                const {data} = await axios.get(url)
                console.log(data)
                setProducts(data.products)
                setLinkToProduct(data.productsLink)
                setLoading(false);
                getNewPrices(data)
            }catch(e){
                alert(e.message)
            }
        }
        
        getProducts()
    }, []);
    
    const getNewPrices = async (datas)=>{
        const {products, productsLink} = datas;
        const url = `${process.env.REACT_APP_API_URL}/shopify-product/get-price`
        let link;
        for(let i=0; i<products.length; i++){
            link = productsLink[products[i].id]?.link
            if(link){
                const headers = {
                    'Content-type': 'application/json'
                }
                const params = { link }
                const {data} = await axios.get(url, {headers, params})
                products[i].newPrice = data;
                setProducts(products);
                setLoading(true);
                setTimeout(() => {
                    setLoading(false);
                });
                // await setTimeout(async ()=>{
                //     products[i].newPrice = Math.floor(Math.random() * 100);
                //     setProducts(products);
                //     setLoading(true);
                //     setTimeout(() => {
                //         setLoading(false);
                //     });
                // },2000)
            }
        }
    }
    
    const linkHyperlink = async(id)=>{
        try{
            const data = {id, link:linkToProductVar[id].link}
            const url = `${process.env.REACT_APP_API_URL}/shopify-product/link-product-url`
            const saveLink = await axios.post(url, data)
            window.location.reload()
            // setLinkToProduct({...linkToProduct, id: {link:linkToProductVar[id]}})
        }catch(e){alert(e.message)}
    }
    const updateProductPrice = async(product, i)=>{
        try{
            const url = `${process.env.REACT_APP_API_URL}/shopify-product/update-price`
            const {data} = await axios.put(url, 
                {
                    id: product.id, 
                    variants_id: product.variants[product.variants.length - 1].id,
                    newPrice: product.newPrice
                })
            console.log('res', data)
            const p = await products.map((pr, index)=>{if(index===i){ return {...pr, newPrice: product.newPrice}} return pr;})
            // products[i].newPrice = product.newPrice
            setProducts(p);
            setLoading(true);
            setTimeout(() => { setLoading(false);});
        }catch(e){alert(e.message)}

    }
  return (
    <CRow>
            {loading ?
                (<p>Loading</p>)
                :
                products.map((product, index)=>(
                    <CCol>
                        <CCard style={{ width: '18rem' }}>
                            <CCardImage orientation="top" src={product.image.src??ReactImg} />
                            <CCardBody>
                                <CCardTitle>{product.title}</CCardTitle>
                                <CCardText>
                                    Price: {product.variants[product.variants.length - 1].price}
                                </CCardText>
                                <CRow>
                                    {linkToProduct[product.id]
                                        ?
                                        (<div style={{display:'flex', justifyContent: 'space-between'}}>
                                            <div><a target={"_blank"} href={linkToProduct[product.id].link}>Link to product</a></div>
                                            <CButton color="primary" onClick={()=>{setLinkToProduct({...linkToProduct, [product.id]: ''})}}>Edit Link</CButton>
                                        </div>)
                                        :
                                        (<CForm>
                                            <CFormInput
                                                type="text"
                                                size="sm"
                                                onChange={(event)=>setLinkToProductVar({...linkToProductVar, [product.id]: {link:event.target.value}})}
                                                placeholder="Link to product"
                                                aria-label="sm input example"
                                            />
                                            <CButton color="primary" onClick={()=>{linkHyperlink(product.id)}}>Link hyperlink</CButton>
                                        </CForm>)
                                    }
                                </CRow>
                                <div style={{'marginTop': '10px'}}>
                                    {product.newPrice ? (<div style={{display:'flex', justifyContent: 'space-between'}}>
                                        <CCol>New Price is {product.newPrice}</CCol>
                                        <CButton color="primary" onClick={()=>{updateProductPrice(product, index)}}>Update price</CButton>
                                    </div>):(<div>getting new price ...</div>) }
                                </div>

                            </CCardBody>
                        </CCard>
                    </CCol>
                ))
            }


    </CRow>
  )
}

export default ShopifyProducts
