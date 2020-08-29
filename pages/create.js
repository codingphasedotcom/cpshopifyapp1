import React, {useState, useCallback} from 'react';
import Head from 'next/head'
import Link from 'next/link'
import {Page, Card, Layout, Link as PLink, FormLayout, TextField, PageActions, ColorPicker, hsbToRgb, Select, Toast, Frame} from '@shopify/polaris';
import store from 'store-js';
import ProductInfo from '../components/ProductInfo';
import axios from 'axios';



export default function CreatePage() {
  const [state, setState] = useState({
    modalOpen: false
  })

  const [formState, setFormState] = useState({
    title: '',
    percentage: '0'
  })

  function handleText(name, text, id){
      console.log(formState)
    let newState = {
        [name]: text
    }
    setFormState({
        ...formState,
        ...newState
    })
    console.log({
        ...formState,
        ...newState
    })
  }

  const [textColor, setTextColor] = useState({
      color:{
        hue: 120,
        brightness: 1,
        saturation: 0,
      },
      rgbColor: {
          red: 255,
          green: 255,
          blue: 255
      }
  });

//   const handleTextColor = useCallback(setTextColor, []);
  function handleTextColor (color) {
      console.log(color)
      let newRgbColor = hsbToRgb(color);
      let newState = {
          color: color,
          rgbColor: newRgbColor
      }
      setTextColor(newState)
  }

  const [bgColor, setBgColor] = useState({
    color:{
      hue: 0,
      brightness: 0,
      saturation: 0,
    },
    rgbColor: {
        red: 0,
        green: 0,
        blue: 0
    }
});

//   const handleTextColor = useCallback(setTextColor, []);
function handleBgColor (color) {
    console.log(color)
    let newRgbColor = hsbToRgb(color);
    let newState = {
        color: color,
        rgbColor: newRgbColor
    }
    setBgColor(newState)
}

  function handleResourcePicker(resources){
    const products = resources.selection.map((product) => product.id);
    store.set('productIds', products);
    setState({modalOpen: false})
    console.log(store.get('productIds'))
  }

  const [bannerLocation, setBannerLocation] = useState('top');

  const handleBannerLocation = useCallback((value) => setBannerLocation(value), []);

  const bannerLocationOptions = [
    {label: 'Top Of Page', value: 'top'},
    {label: 'Bottom Of Page', value: 'bottom'},
    {label: 'Custom', value: 'custom'},
  ]

  const [productInfoState, setProductInfoState] = useState({
      id: 'empty'
  });

  function showCustomCode(){
      return(
          <div>
                <p>Copy this code below where you want to show the sale banner</p>
                <textarea>&lt;div class=&quot;sale-banner-app&quot;&gt;&lt;/div&gt;
                </textarea>
          </div>
          
      )
  }

  const [toastActive, setToastActive] = useState(false);
  const toggleToastActive = () => setToastActive((active) => !active);

  const toastMarkup = toastActive ? (
    <Toast content="The Sale Banner Has Been Saved" onDismiss={toggleToastActive} />
  ) : null;

  return (
      <Frame>
    <Page
    breadcrumbs={[{content: 'Home', url: '/'}]}
    title="Create A Sale Banner">
        <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
        </Head>
        
    
    <Layout>
        <Layout.AnnotatedSection
            title="Banner Information"
            description="Create a name for your banner"
        >
            <Card sectioned>
            <FormLayout>
                <TextField type="text" label="Title" onChange={(text, id) => handleText('title', text, id)} value={formState.title} />
                <TextField type="text" label="Sale Percentage" onChange={(text, id) => handleText('percentage', text, id)} value={formState.percentage} />
                <div>
                    <div className="Polaris-Label"><label id="Polaris-ColorPickerLabel" htmlFor="Polaris-ColorPicker" className="Polaris-Label__Text">TextColor</label></div>
                    
                    <div style={{
                        display: 'flex'
                    }}>
                        <ColorPicker onChange={handleTextColor} color={textColor.color} />
                        <div style={{
                                padding: '0 10px'
                            }}>
                            <div className="Polaris-Label" ><label id="Polaris-ColorPickerLabel" htmlFor="Polaris-ColorPicker" className="Polaris-Label__Text">Selected Text Color</label></div>
                            <div style={{
                            width: '100px',
                            height: '40px',
                            backgroundColor: `rgba(${textColor.rgbColor.red}, ${textColor.rgbColor.green}, ${textColor.rgbColor.blue})`
                        }} />
                        </div>
                    </div>
                </div>
                <div>
                    <div className="Polaris-Label"><label id="Polaris-ColorPickerLabel" htmlFor="Polaris-ColorPicker" className="Polaris-Label__Text">Background Color</label></div>
                    
                    <div style={{
                        display: 'flex'
                    }}>
                        <ColorPicker onChange={handleBgColor} color={bgColor.color} />
                        <div style={{
                                padding: '0 10px'
                            }}>
                            <div className="Polaris-Label" ><label id="Polaris-ColorPickerLabel" htmlFor="Polaris-ColorPicker" className="Polaris-Label__Text">Selected Background Color</label></div>
                            <div style={{
                            width: '100px',
                            height: '40px',
                            backgroundColor: `rgba(${bgColor.rgbColor.red}, ${bgColor.rgbColor.green}, ${bgColor.rgbColor.blue})`
                        }} />
                        </div>
                    </div>
                </div>
                
                
            </FormLayout>
            </Card>
        </Layout.AnnotatedSection>
        <ProductInfo setProductInfoState={setProductInfoState} />
        <Layout.AnnotatedSection
            title="Banner Location"
            description="Choose where you want the banner to show"
        >
            <Card sectioned>
            <Select
                label="Location"
                options={bannerLocationOptions}
                onChange={handleBannerLocation}
                value={bannerLocation}
            />
            {bannerLocation == 'custom' ? showCustomCode() : ''}
            </Card>
        </Layout.AnnotatedSection>
        <Layout.Section>
            <Card title="Banner Preview" sectioned>
            <div style={{
                width: '100%',
                display: 'flex',
            }}>
                <div style={{
                    maxWidth: '1200px',
                    width: '100%',
                    display: 'flex',
                    padding: '40px 20px',
                    background: `rgba(${bgColor.rgbColor.red}, ${bgColor.rgbColor.green}, ${bgColor.rgbColor.blue})`
                }}>
                        <div style={{
                        width: '200px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'row',
                        flexGrow: 1
                    }}>
                        <img style={{
                        width: '200px'
                    }}src={`${productInfoState.id == 'empty' ? "https://cdn.shopify.com/s/files/1/0438/0187/0496/products/85cc58608bf138a50036bcfe86a3a362.jpg?v=1596234486" : productInfoState.image_url}`} />
                        <div style={{
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'column'
                            }}>
                            <h2 style={{
                                fontSize: '3rem',
                                marginBottom: '5.5rem',
                                fontWeight: '700',
                                color: `rgba(${textColor.rgbColor.red}, ${textColor.rgbColor.green}, ${textColor.rgbColor.blue})`
                            }}>{formState.title}</h2>
                            <span style={{
                                fontSize: '6rem',
                                color: `rgba(${textColor.rgbColor.red}, ${textColor.rgbColor.green}, ${textColor.rgbColor.blue})`
                            }}>{formState.percentage}% OFF</span>
                        </div>
                    </div>
                </div>
                
            </div>
            </Card>
        </Layout.Section>
        {toastMarkup}
    </Layout>
    <PageActions
        primaryAction={{
            content: 'Save',
            onAction: () => {
                console.log(`===================================================savedData`)
                const savedData = {
                    title: formState.title,
                    percentage: formState.percentage,
                    textColor: textColor.rgbColor,
                    bgColor: bgColor.rgbColor,
                    bannerLocation: bannerLocation,
                    productInfo: productInfoState
                }
                console.log(savedData)
                axios.post('/api/banners', savedData)
                  .then(function (response) {
                    console.log(response);
                    toggleToastActive()
                  })
                  .catch(function (error) {
                    console.log(error);
                  });
            }
        }}
        secondaryActions={[
            {
            content: 'Delete',
            destructive: true,
            },
        ]}
    />
      
    </Page>
    </Frame>
  )
}
