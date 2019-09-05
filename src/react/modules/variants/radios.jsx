import React, { Component } from "react";

import { Radio } from './styled';

export default class Radios extends Component {

    render() {
        const { values, onSelected } = this.props;
        
        return <React.Fragment>
            { values.map((value, index) => <Radio onClick={ () => onSelected(index) } key={ `-${ index }` } selected={ value.selected }>{ value.value }</Radio>) }
        </React.Fragment>;
    }
}