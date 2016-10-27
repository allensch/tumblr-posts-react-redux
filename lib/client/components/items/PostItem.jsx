import React, { Component, PropTypes } from 'react'

export default class PostItem extends Component {

	static propTypes = {
		data: PropTypes.object.isRequired,
		onClick: PropTypes.func.isRequired
	}

	onButtonClick() {
		this.props.onClick(this.props.data)
	}

	renderButton() {
		return (
			<button className="btn btn-primary" onClick={this.onButtonClick.bind(this)}>
				Add to Favorites
			</button>
		)
	}

	renderDefault() {
		const { summary } = this.props.data
		return (
			<div className="card-block">
				<p className="card-text text-truncate">{summary}</p>
				{this.renderButton()}
			</div>			
		)
	}

	renderImage() {
		const { photos = [{}], summary = '' } = this.props.data
		const { original_size = {}, caption ='' } = photos[0]
		const style = {
			backgroundImage: `url(${original_size.url})`
		}
		return [
			<div className="card-img-top" style={style} alt={caption} key="img" />,
			<div className="card-block" key="block">
				<p className="card-text text-truncate">{summary}</p>
				{this.renderButton()}
			</div>
		]
	}

	renderText() {
		const { summary, title } = this.props.data
		return (
			<div className="card-block">
				<h4 className="card-title text-truncate">{title}</h4>
				<p className="card-text text-truncate">{summary}</p>
				{this.renderButton()}
			</div>			
		)
	}


	render() {
		var content
		const { type } = this.props.data
		switch (type) {
			case 'photo':
				content = this.renderImage()
				break
			case 'text':
				content = this.renderText()
				break
			default:
				content = this.renderDefault()
		}
		return (
			<div className="card">
				{content}
			</div>
		)
	}

}
