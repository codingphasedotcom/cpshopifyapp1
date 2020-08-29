import React, {useState, useCallback} from 'react';
import {Page, Card, Layout, Link as PLink, Button, FormLayout, TextField, Heading, MediaCard, PageActions, ColorPicker, hsbToRgb} from '@shopify/polaris';
import { ResourcePicker } from '@shopify/app-bridge-react';
import store from 'store-js';
import { gql, useQuery } from '@apollo/client';


const GET_PRODUCTS = gql`
    query getProducts($ids: [ID!]!){
        nodes(ids: $ids) {
        ...on Product{
            title
            handle
            descriptionHtml
            id
            images(first: 1){
            edges{
                node{
                originalSrc
                altText
                }
            }
            }
            variants(first: 1){
            edges{
                node{
                price
                id
                }
            }
            }
        }
        }
    }
`;




export default function ProductInfo(props){
    const [state, setState] = useState({
        modalOpen: false
      })
    const [productChoice, setProductChoice] = useState(false);

    function handleResourcePicker(resources){
        const products = resources.selection.map((product) => product.id);
        store.set('productIds', products);
        setState({modalOpen: false})
        setProductChoice(true)
        const product = resources.selection[0]

        props.setProductInfoState({
            id: product.id,
            title: product.title,
            description: product.descriptionHtml,
            image_url: product.images[0].originalSrc
        })
    }
    
    const { loading, error, data } = useQuery(GET_PRODUCTS, {
        variables: {
            "ids": store.get('productIds')
          }
      });
      console.log(data)
    //   if (loading) return <p>Loading ...</p>;
    //   return <h1>Loaded Data Complete</h1>;
      function showMediaCard() {
          if(productChoice) {
            if(loading){
                return (<div>Loading Product...</div>)
              } else {
                  const product = {
                      title: data.nodes[0].title,
                      description: data.nodes[0].descriptionHtml,
                      image_url: data.nodes[0].images.edges[0].node.originalSrc
                  }
                  console.log(product)
                return(<MediaCard
                    title={product.title}
                    primaryAction={{
                        content: 'Choose another product',
                        onAction: () => setState({
                            modalOpen: true
                        }),
                    }}
                    description={product.description}
                    >
                    <img
                        alt=""
                        width="100%"
                        height="100%"
                        style={{
                        objectFit: 'cover',
                        objectPosition: 'center',
                        }}
                        src={product.image_url}
                    />
                </MediaCard>)
              }
          }
      }
    return (
        <>
            <ResourcePicker
            resourceType="Product"
            open={state.modalOpen}
            onCancel={()=> setState({modalOpen: false})}
            showVariants={false}
            onSelection={(resources) => handleResourcePicker(resources)}
            />
            <Layout.AnnotatedSection
                title="Product Information"
                description="Create a name for your banner"
            >
                <Card sectioned>
                    {!productChoice ? <Button onClick={() => setState({modalOpen: true})}>Choose A Product</Button> : ''}
                
                    {showMediaCard()}
                
                
                </Card>
            </Layout.AnnotatedSection>
        </>
    )
}