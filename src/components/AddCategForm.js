import React from 'react';

class AddCategForm extends React.Component {
	
	componentWillMount(){
		this.setState({name:''});
	}
	
	cancelAdd(){
		this.props.showAddCateg(false);
	}
	
	updateName(e){
		this.setState({name:e.target.value});
	}
	
	saveCateg(e){
		e.preventDefault();
		this.props.addCateg(this.state.name);
		this.props.showAddCateg(false);
	}
	
  render() {
		const { name } = this.state;
		
    return (
			<div className="modal">
				<div className="modal-dialog modal-sm">
					<div className="modal-content">
						<div className="modal-header">
							<span className="pull-right btn btn-xs"
								onClick={this.cancelAdd.bind(this)}
							>
								X
							</span>
							Добавить категорию
						</div>
						<div className="modal-body text-center">
							<form onSubmit={this.saveCateg.bind(this)}>
								<div className="form-group">
									<input autoFocus type="text" value={name}
										onChange={this.updateName.bind(this)}
									/>
								</div>
								<button type="submit" className="btn btn-success">
									Сохранить
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
    );
  }
	
}

AddCategForm.propTypes = {
	showAddCateg: React.PropTypes.func.isRequired,
	addCateg: React.PropTypes.func.isRequired
}

export default AddCategForm;