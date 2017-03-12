import React from 'react';
import DelCategForm from './DelCategForm';

class CategList extends React.Component {
	
	componentWillMount(){
		this.setState({
			showDelCateg:false,
			toDel:-1
		});
	}
	
	showDelCateg(id){
		this.setState({
			showDelCateg:true,
			toDel:id
		});
	}
	
	hideDelCateg(){
		this.setState({
			showDelCateg:false,
			toDel:-1
		});
	}
	
  render() {
		const { categs, delCateg } = this.props;
		const { toDel, showDelCateg } = this.state;
		
		const delCategForm = showDelCateg ?
			<DelCategForm hideDelCateg={this.hideDelCateg.bind(this)}
				toDel={toDel} delCateg={delCateg} />
				: [];
		
		const categsList = categs.map((el)=>{
			return (
				<div className="row group-list" key={el.id}>
					<div className="col-xs-3">
						<button className="btn btn-default" onClick={() => {this.showDelCateg(el.id)}}>
							X
						</button>
					</div>
					<div className="col-xs-9 form-control-static"><a href="#">{el.name}</a></div>
				</div>
			);
		});
		
    return (
			<div>
				{delCategForm}
				{categsList}
				<div className="row">
					<div className="col-xs-offset-3 col-xs-9 form-control-static">
						<a href="#">Без категории</a>
					</div>
				</div>
			</div>
    );
  }
	
}

CategList.propTypes = {
	categs: React.PropTypes.array.isRequired,
	delCateg: React.PropTypes.func.isRequired,
}

export default CategList;