import React, { Component } from "react";

export default class Info extends Component {
    componentDidMount() {
        // console.log('mount', this.props);
    }

    componentDidUpdate() {
        // console.log('update', this.props);
    }

    render() {
        const { product } = this.props;
        return <React.Fragment>
            { !parseInt(product.promotional_price) ? <div>
                <div>{ product.price }</div>
            </div> : <div>
                <div>{ product.price }</div>
                <div>{ product.promotional_price }</div>
            </div>}
        </React.Fragment>;
    }
}