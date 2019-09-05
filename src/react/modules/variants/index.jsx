import React, { Component } from "react";
import Radios from './radios';
import { getVariants, skuFormat, slug } from "React:Actions";

export default class Variants extends Component {
    state = {
        variants: [],
        skus: [],
        selected: {},
        id: ''
    }

    async componentDidMount() {
        const variants                      = (await getVariants(this.props.id));
        const skus                          = skuFormat(variants.map((variant) => variant.Sku));
        this.setState({ variants, skus });
    }

    handle = (indexType, indexValue) => {
        const { selected, variants, skus }  = this.state;
        const type                          = skus[indexType].type;
        const value                         = skus[indexType].values[indexValue];

        let exist                           = variants.filter((variant) => variant.available === '1');
        let newSelected                     = {};
        let id                              = '';
        for(let i = 0; i < indexType ; i++) {
            newSelected[Object.keys(selected)[i]] = selected[Object.keys(selected)[i]];
        }
        newSelected[type]                   = value;

        Object.keys(newSelected).forEach((key) => {
            exist = exist.filter((variant)  => variant.Sku.filter((sku) => sku.type === key && sku.value === newSelected[key].value).length);
        });

        let newSkus = skus;
        newSkus[indexType].values = newSkus[indexType].values.map((item, i) => i === indexValue ? { ...item, selected: true } : { ...item, selected: false });

        for(let i = (indexType + 1); i < skus.length; i++) {
            newSkus[i].values = newSkus[i].values.map((item) => ({ ...item, selected: false }));
        }

        if(exist.length == 1) {
            id = exist[0].id;
        } 

        this.setState({ selected: newSelected, skus: newSkus, id });
        this.props.update(exist);
        this.props.handleChange({ target: { name: 'variacao', value: id } });

    }

    render() {
        const { skus, id } = this.state;

        return <React.Fragment>
            <input type="hidden" required name="variacao" value={ id } />
            { skus.map((sku, index) => <div key={ `${ slug(sku.type) }-${ index }` }>
                <h3>{ sku.type }</h3>
                <Radios onSelected={ (indexValue) => this.handle(index, indexValue) } values={ sku.values } />
            </div>) }

        </React.Fragment>;
    }
}