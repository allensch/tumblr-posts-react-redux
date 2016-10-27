import React, { Component, PropTypes } from 'react'
import Serialize from 'form-serialize'

export default class Form extends Component {

	static Inline(props) {
		return (
			<ul className="nav nav-inline">
				{props.children.map((child, index) => (
					<li className="nav-item" key={index}>
						{child}
					</li>
				))}
			</ul>
		)
	}

	static propTypes = {
		onSubmit: PropTypes.func.isRequired,
		isLoading: PropTypes.bool,
		message: PropTypes.object
	}

	get className() {
		return ''
	}

	get isButtonDisabled() {
		return false
	}

	focus(ref, value) {
		setTimeout(() => {
			if (this.refs[ref]) {
				this.refs[ref].focus()
				if (value) {
					this.refs[ref].value = value
				}
			}
		}, 1)
	}

	handleSubmit() {
		throw new Error('Form.handleSubmit must be implemented.')
	}

    handleFormSubmitEvent(event) {
        event.preventDefault()
		this.handleSubmit(Serialize(event.target, { hash: true }))
    }

	renderButton(value) {
		if (this.props.isLoading) {
			return <input key="submitbtn" type="submit" value="One moment..." className="btn" disabled={true} />
		}
		return <input key="submitbtn" type="submit" value={value} className="btn btn-primary" disabled={this.isButtonDisabled} />
	}

	renderLabel(field, klass) {
		const { name, label } = field
		if (!field.name || !field.label) {
			throw new Error(`Missing name or label for field: ${JSON.stringify(field)}`)
		}
		return <label htmlFor={name} className={`form-control-label ${klass}`}>{label}</label>
	}

	renderInput(field, klass) {
		const { icon, name, description, type, options } = field
		if (!field.name || !field.type) {
			throw new Error(`Missing name or type for field: ${JSON.stringify(field)}`)
		}
		if (type === 'select' && Array.isArray(options)) {
			return this.renderSelect(field, klass)
		} else if (type === 'textarea') {
			return this.renderTextarea(field, klass)
		} else if (!!icon) {
			return this.renderIconInput(field, klass)
		} else if (klass) {
			return (
				<div className={klass}>
					<input {...field} className="form-control" ref={name} />
					{description ? <small>{description}</small> : null}
				</div>
			)
		}
		return <input {...field} className="form-control" ref={name} />
	}

	renderIconInput(field, klass = '') {
		const { icon, name } = field
		const style = { paddingRight: 10 }
		const atts = { className: `input-group ${klass}`, style }
		delete field.icon
		return (
			<div {...atts}>
				<div className="input-group-addon">{icon}</div>
				<input {...field} className="form-control" ref={name} />
			</div>
		)
	}	

	renderSelect(field, klass) {
		const { defaultValue, name, description } = field
		const options = field.options.map((item, index) => {
			return <option value={item.value} key={index}>{item.label}</option>
		})
		return (
			<div className={klass}>
				<select name={name} ref={name} className="form-control" defaultValue={defaultValue}>
					{options}
				</select>
				{description ? <small>{description}</small> : null}
			</div>
		)
	}

	renderTextarea(field, klass) {
		const { name, description, cols = 55, rows = 5 } = field
		return (
			<div className={klass}>
				<textarea name={name} ref={name} className="form-control" cols={cols} rows={rows} />
				{description ? <small>{description}</small> : null}
			</div>
		)
	}

	renderMessage() {
		if (this.props.message) {
			const { type, value } = this.props.message
			switch (type) {
				case 'error':
					return <div key="alert" className="alert alert-danger">{value}</div>
				case 'success':
					return <div key="alert" className="alert alert-success">{value}</div>
				case 'warning':
					return <div key="alert" className="alert alert-warning">{value}</div>
				default:
					return <div key="alert" className="alert alert-info">{value}</div>
			}
		}
		return null
	}

	renderFieldsInline(fields) {
		return fields.map((field, index) => {
			return (
				<div className="form-group" key={index}>
					{this.renderLabel(field, 'sr-only')}
					{this.renderInput(field)}
				</div>
			)
		})
	}	

	renderFieldsAndLabels(fields) {
		return fields.map((field, index) => {
			return (
				<div className="form-group" key={index}>
					{this.renderLabel(field)}
					{this.renderInput(field)}
				</div>
			)
		})
	}

	renderHorizontalFieldsAndLabels(fields) {
		return fields.map((field, index) => {
			return (
				<div className="form-group row" key={index}>
					{this.renderLabel(field, 'col-sm-2 textright')}
					{this.renderInput(field, 'col-sm-10')}
				</div>
			)
		})
	}

	renderForm() {
		throw new Error('Form.renderForm must be implemented.')
	}

	render() {
		const { className } = this
		const atts = { className }
		return (
			<form ref="form" onSubmit={this.handleFormSubmitEvent.bind(this)} {...atts}>
				{this.renderForm()}
				<input ref="hiddenSubmit" type="submit" style={{ visibility: 'hidden' }} />
			</form>
		)
	}

	submit() {
		try {
			this.refs.hiddenSubmit.click()
		} catch (error) {
			console.error(error)
			return false
		}
		return true
	}

}
