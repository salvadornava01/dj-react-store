import React, { Component } from "react";
// import { Image } from "semantic-ui-react";
import { Carousel } from 'antd';

class ProductImages extends Component {
  render() {
    const { image_url } = this.props;
    return <img src={image_url} style={{display:'block',width:'450px',maxWidth:'100%', marginLeft:'auto', marginRight:'auto' }} />;
    // return (
    //   <Carousel autoplay dots={{dotsClass:'circle-dots'}}>
    //     <div>
    //       <img src={image_url} style={{display:'block',width:'450px',maxWidth:'100%', marginLeft:'auto', marginRight:'auto' }} />
    //     </div>
    //     <div>
    //       <img src={image_url} style={{display:'block',width:'450px',maxWidth:'100%', marginLeft:'auto', marginRight:'auto' }} />
    //     </div>
    //     <div>
    //       <img src={image_url} style={{display:'block',width:'450px',maxWidth:'100%', marginLeft:'auto', marginRight:'auto' }} />
    //     </div>
    //     <div>
    //       <img src={image_url} style={{display:'block',width:'450px',maxWidth:'100%', marginLeft:'auto', marginRight:'auto' }} />
    //     </div>
    //   </Carousel>
      
    // )
  }
}

export default ProductImages;
