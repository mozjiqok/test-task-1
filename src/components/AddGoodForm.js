import React from 'react';

class AddGoodForm extends React.Component {
	
	componentWillMount(){
		this.setState({
			categ:'0',
			name:'',
			cost:'',
			price:''
		});
	}
	
	cancelAdd(){
		this.props.showAddGood(false);
	}
	
	updateInput(e){
		this.setState({[e.target.name]:e.target.value});
	}
	
	saveGood(e){
		e.preventDefault();
		const good = {...this.state};
		this.props.addGood({
			categ: parseInt(good.categ,10),
			name: good.name,
			price: isNaN(+good.price)?0:+good.price,
			cost: isNaN(+good.cost)?0:+good.price
		});
		this.props.showAddGood(false);
	}
	
  render() {
		const { name, cost, price, categ } = this.state;
		const { categs } = this.props;
		
		var opts = categs.map((el) => {
			return(
				<option key={el.id} value={el.id}>{el.name}</option>
			);
		});
		
		opts.unshift(
			<option key={0} value={0}>Без категории</option>
		);
		
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
							Добавить товар
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

AddGoodForm.propTypes = {
	showAddGood: React.PropTypes.func.isRequired,
	addGood: React.PropTypes.func.isRequired,
	categs: React.PropTypes.array.isRequired
}

export default AddGoodForm;