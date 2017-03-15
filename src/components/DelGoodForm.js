import React from 'react';

class DelGoodForm extends React.Component {
	
	cancelDel(){
		this.props.showDelGood(false);
	}
	
	delGood(){
		this.props.delGood(this.props.good.id);
		this.props.showDelGood(false);
	}
	
  render() {
		const { good } = this.props;
		
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
							Точно удалить товар id{good.id}?
						</div>
						<div className="modal-body text-center">
							<div className="form-group">
								<button autoFocus className="btn btn-warning"
									onClick={this.delGood.bind(this)}
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

DelGoodForm.propTypes = {
	showDelGood: React.PropTypes.func.isRequired,
	delGood: React.PropTypes.func.isRequired,
	good: React.PropTypes.object.isRequired
}

export default DelGoodForm;