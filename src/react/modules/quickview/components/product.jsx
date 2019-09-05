import React, { Component } from "react";
import Image from './image';
import Form from './form';
import Info from './info';
import Additional from './additional';
import { ProductContainer, ProductImage } from './styled';
import Variants from 'React:Modules/variants';

import axios from 'axios';


export default class Product extends Component {

    state = {
        avaliable: true,
        additional: [],
        form: { variacao: '' },
        hasVariants: false,
        hasAdditional: false,
        product: {
            ProductImage: []
        }
    }

    handleChange = (evt) => {
        const { name, value } = evt.target;
        this.setState({ form: {...this.state.form, [name]: value} }, () => {
            console.log('Handle Change: ', this.state);
        });
    }

    componentDidMount() {
        const { product } = this.props;
        let additional = [];

        if(product.AdditionalInfos) additional = product.AdditionalInfos.filter((info) => info.active === '1')

        this.setState({ product, additional });

        let hasVariants                 = false;
        let hasAdditional               = false;
        if(product.AdditionalInfos)     hasAdditional   = product.AdditionalInfos.filter((add) => add.active === '1').length > 0 ? true : false;
        if(product.Variant)             hasVariants     = product.Variant.length > 0 ? true : false;

        this.setState({ hasVariants, hasAdditional });
    }

    update = (products) => {
        const { product } = this.props;
        let { avaliable } = this.state;

        if(product.AdditionalInfos) this.setState({ additional: product.AdditionalInfos.filter((info) => info.active === '1') });

        if(products.length) {
            avaliable = true;
            if(products.length === 1) this.setProduct(products[0]);
            else this.setProduct( product );
        } else {
            avaliable = false;
            this.setProduct( product );
        }
        
        this.setState({ avaliable });
    }

    setProduct = (product) => {
        this.setState({ product });
    }

    finished = (data) => {
        const el = document.createElement("div"); 
        el.innerHTML = data;
        const empty = el.querySelector('.cart-preview-empty');
    }

    handleSubmit = (evt) => {
        evt.preventDefault();
        const formData = new FormData(evt.target);
        const { product } = this.state;
        let id = product.product_id;
        if(!id) id = product.id;

        axios.post(`/mvc/store/element/snippets/cart_preview/?loja=405085&callback=${ encodeURIComponent(`/loja/carrinho.php?loja=405085&acao=incluir&IdProd=${ id }`) }`, formData, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
            .then((data) => data.data)
            .then(data => this.finished(data));
    }

    render() {
        const { avaliable, product, additional, hasAdditional, hasVariants, form } = this.state;
        let disabled = true;

        if(!hasAdditional && !hasVariants) 
            disabled = false;

        if(hasVariants) {
            if(form.variacao) {
                disabled = false;
            }
        }

        if(hasAdditional) {

        }

        disabled = false;


        return <ProductContainer>
            <ProductImage>
                <Image images={ product.ProductImage ? product.ProductImage : product.VariantImage } />
            </ProductImage>
            <form action="" onSubmit={ this.handleSubmit }>
                { product.id && <Variants handleChange={ this.handleChange } update={ this.update }  id={ product.id } /> }
                { additional.length > 0 && <Additional handleChange={ this.handleChange } infos={ additional } /> }
                { avaliable && <Info product={ product } /> }
                { avaliable && <div><input type="text" name="quant" defaultValue="1"/><button type="submit" disabled={ disabled } >Comprar</button></div> }
            </form>
            { !avaliable && <Form /> }
        </ProductContainer>;
    }
}