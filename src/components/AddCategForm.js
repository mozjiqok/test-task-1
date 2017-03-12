import React from 'react';

class GoodsItem extends React.Component {
	
	componentWillMount(){
		this.setState({name:''});
	}
	
	cancelAdd(){
		this.props.showAddCateg(false);
	}
	
	updateName(e){
		this.setState({name:e.target.value});
	}
	
	saveCateg(){
		console.log('Saving categ ' + this.state.name);
		this.props.showAddCateg(false);
	}
	
  render() {
		const { name } = this.state;
		
    return (
			<div className="modal">
				<div className="modal-dialog modal-sm">
					<div className="modal-content">
						<div className="modal-header">
							<span className="pull-right btn btn-xs" onClick={this.cancelAdd.bind(this)}>X</span>
							Добавить категорию
						</div>
						<div className="modal-body text-center">
							<div className="form-group">
								<input type="text" value={name} onChange={this.updateName.bind(this)} />
							</div>
							<button type="button" className="btn btn-success" onClick={this.saveCateg.bind(this)}>Сохранить</button>
						</div>
					</div>
				</div>
			</div>
    );
  }
	
}

GoodsItem.propTypes = {
	showAddCateg: React.PropTypes.func.isRequired
}

export default GoodsItem;