import React,{Component} from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

import './app.css';

export default class App extends Component  {

   maxid=0

  state ={
      todoData:[
        this.createTodoItem('Drink Coffee'),
        this.createTodoItem('Make Awesome App'),
        this.createTodoItem('Have a lunch'),
      ],
      term:'',
      filter:'all'
    }

  createTodoItem(label) {
    return {
      label,
      important:false,
      done:false,
      id:this.maxid++
    }
  }
  
  deleteItem = (id) => {
    this.setState(({todoData}) =>{
      const newArray= todoData.filter( (el) => el.id !==id );
      return {
        todoData:newArray
      }
    })
  }

  itemAdded = (name) => {
    const newTask= this.createTodoItem(name)
  this.setState( ({todoData}) => {
    const newArray=[...todoData,newTask];
    return{
      todoData:newArray
    }
  })
  }

  onToggleImportant = (id) =>{
    this.toggleProperty(this.state.todoData,id,'important')
     }
  

  onToggleDone = (id) =>{
      this.toggleProperty(this.state.todoData,id,'done')
     }
  
  toggleProperty = (arr,id,propName) =>{
    this.setState( () =>{
      const newData=arr.map( (el) =>{
        if (el.id===id) el[propName]= !el[propName]
        return el
      })
      return{
        todoData:newData
      }
    })
  }

  search =(items,terms) =>{
    if (terms.length===0){
      return items
    }
   return items.filter( (el) => el.label.toLowerCase().indexOf(terms.toLowerCase()) >-1)
  }

  updateSearch =(name) =>{
    this.setState({
      term:name
    })
  }

  updateButton = (filter) =>{
    this.setState({
      filter
    })
  }

  filter =(items,mode) =>{
    switch (mode){
      case 'all':
        return items
      case 'active':
       return  items.filter( (el) => !el.done)
      case 'done':
          return  items.filter( (el) => el.done)
      default:
        return items
    }
  }

  visibleItems =(items,terms,mode) =>{
    const searcedItems=this.search(items,terms);
    return this.filter(searcedItems,mode)
    
    
  }



  render() {
    const {todoData,term,filter}=this.state;

    const visibleItems=this.visibleItems(todoData,term,filter);
    const doneCount=todoData.filter( (el) => el.done ).length;
    const todoCount=todoData.length-doneCount;
    

    return(
    <div className="todo-app">
      <AppHeader toDo={todoCount} done={doneCount} />
      <div className="top-panel d-flex">
        <SearchPanel 
        updateSearch = {this.updateSearch}/>
        <ItemStatusFilter 
        updateButton ={this.updateButton}/>
      </div>
      <TodoList 
      todos={visibleItems} 
      onDeleted={ this.deleteItem}
      onToggleDone={ this.onToggleDone}
      onToggleImportant={this.onToggleImportant}/>
      <ItemAddForm 
      onItemAdded={ this.itemAdded}/>
    </div>
    );
   };
};

