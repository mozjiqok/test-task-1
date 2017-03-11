import React from 'react';

class App extends React.Component {
	
  render() {
    return (
      <div className="container">
				<div className="appTop">
					<div className="appLogo">
						My-app
					</div>
					<div className="appTopButtons">
						<button>Добавить товар</button>
						<button>Добавить категорию</button>
					</div>
				</div>
				<div className="appBottom">
					<div className="appCatList">
						Список категорий
					</div>
					<div className="appGoods">
						Таблица товаров
					</div>
				</div>
      </div>
    );
  }
	
}

export default App;
