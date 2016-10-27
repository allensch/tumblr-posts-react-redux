import React from 'react'
import Form from './Form'

const FIELDS = [
    { name: 'name', label: 'Blog Name', type: 'text', placeholder: 'Blog Name', icon: <i className="fa fa-rss"></i> },
    { name: 'tag', label: 'Tag', type: 'text', placeholder: 'Tag', icon: <i className="fa fa-tag"></i> }
]

export default class InlineSearchForm extends Form {

    get className() {
        return 'form-inline pull-left'
    }

    handleSubmit(data) {
        if (!this.props.isLoading) {
            this.props.onSubmit(data)
        }
    }

    renderForm() {
        return [
            this.renderFieldsInline(FIELDS),
            this.renderButton('Search')
        ]
    }

}
