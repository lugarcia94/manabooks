import React, { Component } from "react";

export default class Additional extends Component {

    render() {
        const { infos } = this.props;

        return <React.Fragment>
            Informações adicionais
            { infos.map((info) => <div key={ info.id }>
                { info.type === 'select' && <div>
                    <h3>{ info.name }</h3>
                    <select onChange={ this.props.handleChange } name="informacoesAdicionais[]" required={ info.required === '1' }>
                        <option value="">Selecione</option>
                        { info.options.map((option) => <option key={ option.id } value={ `${ info.info_id }:${ option.id }` }>{ option.name }</option>) }
                    </select> 
                </div>}
                { info.type === 'text' && <div>
                    <h3>{ info.name }</h3>
                    <input type="hidden" name="informacoesAdicionais[]" defaultValue={ info.info_id }/>
                    <input onChange={ this.props.handleChange } name={ `infoAdicional_${ info.info_id }` } required={ info.required === '1' } type="text" />
                </div>}
            </div>) }
        </React.Fragment>;
    }
}