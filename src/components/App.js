import React from 'react';

class App extends React.Component {
	
  render() {
    return (
      <div className="container">
				<div className="">
					<div className="appLogo">
						My-app
					</div>
					<div className="">
						<button>Добавить товар</button>
						<button>Добавить категорию</button>
					</div>
				</div>
				<div className="">
					<div className="">
						Список категорий
					</div>
					<div className="">
						Таблица товаров
					</div>
				</div>
      </div>
    );
  }
	
}

export default App;
