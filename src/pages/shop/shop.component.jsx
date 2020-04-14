import React, { Component } from 'react';
import SHOP_DATA from './shop.data';
import COllectionPreview from '../../components/preview-collection/collection-preview.component';

class ShopPage extends Component{
    constructor(props){
        super(props);

        this.state = {
            collections: SHOP_DATA
        }
    }
    render() {
        const {collections} = this.state;
        return (<div className='shop-page'>
        {
            collections.map(({id, ...otherCollectionProps}) => (
                <COllectionPreview key={id} {...otherCollectionProps}></COllectionPreview>
            ))
        }
        </div>);
    }
}

export default ShopPage;