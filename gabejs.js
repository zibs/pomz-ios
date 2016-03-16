var List = React.createClass({
  getInitialState: function () {
    return {
      favorite: 'Eli',
      items: [
               { id: 1, name: 'Eli'},
               { id: 2, name: 'Bob'},
               { id: 3, name: 'Gabe'}
             ]
    }
  },

  removeItem: function (item) {
  	var index = this.state.items.findIndex(i => i === item);
    var items = this.state.items.concat([]);
    items.splice(index, 1);

    this.setState({items: items});
  },

  makeFavorite: function (name) {
    this.setState({favorite: name})
  },

  render: function() {
  	return (
      <div>
        Current Fav: {this.state.favorite}
    	<ul>
      	  {this.state.items.map((item) =>
            <ListItem key={item.id} item={item} onClick={this.removeItem} onMakeFav={this.makeFavorite} />
          )}
        </ul>
      </div>
    )
  }
});

var ListItem = React.createClass({
  handleClick: function (ev) {
    this.props.onClick(this.props.item)
  },

  handleNameChange: function (ev) {
    ev.stopPropagation()
      this.props.onMakeFav(this.props.item.name)
  },

  render: function () {
    return (
      <li onClick={this.handleClick}>
        {this.props.item.name}
        <button onClick={this.handleNameChange}>Make Fav</button>
      </li>
    )
  }
})

ReactDOM.render(
  <List />,
  document.getElementById('container')
);
