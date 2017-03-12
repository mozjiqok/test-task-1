import React from 'react';

class EditGoodForm extends React.Component {
	
	componentWillMount(){
		this.setState(this.props.good);
	}
	
	cancelEdit(){
		this.props.showEditGood(false);
	}
	
	updateInput(e){
		this.setState({[e.target.name]:e.target.value});
	}
	
	saveGood(e){
		e.preventDefault();
		const good = {...this.state};
		this.props.editGood({
			id: good.id,
			categ: parseInt(good.categ,10),
			name: good.name,
			price: parseFloat(good.price.toString().replace(",","."),10),
			cost: parseFloat(good.cost.toString().replace(",","."),10)
		});
		this.props.showEditGood(false);
	}
	
  render() {
		const { name, cost, price, categ } = this.state;
		const { categs } = this.props;
		
		const opts = categs.map((el) => {
			return(
				<option key={el.id} value={el.id}>{el.name}</option>
			);
		});
		
    return (
			<div className="modal">
				<div className="modal-dialog modal-sm">
					<div className="modal-content">
						<div className="modal-header">
							<span className="pull-right btn btn-xs"
								onClick={this.cancelEdit.bind(this)}
							>
								X
							</span>
							Изменить товар
						</div>
						<div className="modal-body text-center">
							<form onSubmit={this.saveGood.bind(this)}>
								<div className="form-group">
									<select className="form-control" name="categ" value={categ}
										onChange={this.updateInput.bind(this)}
										placeholder="Категория"
										title="Категория"
									>
										{opts}
									</select>
								</div>
								<div className="form-group">
									<input className="form-control" name="name" type="text" value={name}
										onChange={this.updateInput.bind(this)}
										placeholder="Название"
										title="Название"
									/>
								</div>
								<div className="form-group">
									<input className="form-control" name="cost" type="text" value={cost}
										onChange={this.updateInput.bind(this)}
										placeholder="Закупочная стоимость"
										title="Закупочная стоимость"
									/>
								</div>
								<div className="form-group">
									<input className="form-control" name="price" type="text" value={price}
										onChange={this.updateInput.bind(this)}
										placeholder="Розничная цена"
										title="Розничная цена"
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

EditGoodForm.propTypes = {
	showEditGood: React.PropTypes.func.isRequired,
	editGood: React.PropTypes.func.isRequired,
	categs: React.PropTypes.array.isRequired,
	good: React.PropTypes.object.isRequired
}

export default EditGoodForm;