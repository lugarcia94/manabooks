import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import './css/index.styl';

class remove extends Component {

    remove(event) {
        let url = '/web_api/carts/' + this.props.session + '/' + this.props.id;

        if(this.props.variant)
            url = '/web_api/carts/' + this.props.session + '/' + this.props.id + '/' + this.props.variant;

        axios.delete(url)
            .then(response =>  {
                const UPDATECART = new CustomEvent('UPDATECART', { detail: response.data });
                window.dispatchEvent(UPDATECART);
            });

        console.log('[ Minicart ] DELETE PRODUCT ID | VARIANT ID', this.props.id, this.props.variant);
    }

    render() {

        return  <button className="minicart__delete" type="button" onClick={(e) => this.remove(e)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 30">
                    <title>Remover</title>
                    <g data-name="Camada 2"><path d="M18.32 3.84h-3.14v-.68A3.16 3.16 0 0 0 12 0h-2a3.16 3.16 0 0 0-3.18 3.16v.67H3.68A3.69 3.69 0 0 0 0 7.53v.94h22v-.94a3.69 3.69 0 0 0-3.68-3.69zm-4.92 0H8.59v-.68A1.38 1.38 0 0 1 10 1.78h2a1.38 1.38 0 0 1 1.38 1.38v.67zM1.23 10.25v17.94A1.81 1.81 0 0 0 3 30h16a1.81 1.81 0 0 0 1.8-1.81V10.25zm6.36 17.06H5.82V12.94h1.77v14.37zm4.3 0h-1.78V12.94h1.77zm4.3 0h-1.78V12.94h1.77z" data-name="Layer 1"/></g>
                </svg>
                Remover
            </button>;
    }

}

remove.propTypes = {
};

const mapStateToProps = (state) => {
    return {
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(remove);
