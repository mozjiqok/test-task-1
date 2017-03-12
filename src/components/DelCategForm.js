import React from 'react';

class DelCategForm extends React.Component {
	
	cancelDel(){
		this.props.hideDelCateg();
	}
	
	delCateg(){
		this.props.delCateg(this.props.toDel);
		this.props.hideDelCateg();
	}
	
  render() {
    return (
			<div className="modal">
				<div className="modal-dialog modal-sm">
					<div className="modal-content">
						<div className="modal-header">
							<span className="pull-right btn btn-xs"
								onClick={this.cancelDel.bind(this)}
							>
								X
							</span>
							Хотите удалить категорию?
						</div>
						<div className="modal-body text-center">
							<p>
								Все товары в этой категории будут помечены "Без категории"
							</p>
							<div className="form-group">
								<button autoFocus className="btn btn-warning"
									onClick={this.delCateg.bind(this)}
								>
									Да
								</button>{" "}
								<button className="btn btn-default"
									onClick={this.cancelDel.bind(this)}
								>
									Нет
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
    );
  }
	
}

DelCategForm.propTypes = {
	hideDelCateg: React.PropTypes.func.isRequired,
	delCateg: React.PropTypes.func.isRequired,
	toDel: React.PropTypes.number.isRequired
}

export default DelCategForm;