import React from 'react';
import ListErrors from '../ListErrors';

const Form = ({errors, children}) => (
    <div className="editor-page">
        <div className="container page">
        <div className="row">
            <div className="col-md-10 offset-md-1 col-xs-12">
            <ListErrors errors={errors}></ListErrors>
            <form>
                <fieldset>
                { children }
                </fieldset>
            </form>
            </div>
        </div>
        </div>
    </div>
)

export default Form;