import React, { Component } from 'react';
import {EventEmitter} from 'fbemitter';
import Locatii from './Locatii/Locatii'

const emitter=new EventEmitter()
const cupon=new Locatii(emitter)

const adaugareCupon=(locatie)=>{
    locatie.adaugareCupon(cupon)
}


class ListaCupoane extends Component {
    constructor(props){
        super(props)
        this.state={
        nume: [],
        cuponNume: '',
        cuponLocatie: ''
        }
        this.handleInputChange=this.handleInputChange.bind(this)
    }
    componentDidMount(){
      cupon.getAll()
      emitter.addListener('Cupon incarcat',()=>{
        this.setState({
          nume:cupon.content
        })
      })
    }
    handleInputChange(event){
        let value=event.target.value
        let name=event.target.name
        this.setState({
            [name]:value
        })
    }
  render() {
    return (
      <div className="App">
        <ul>
        {this.state.nume.map((e)=> 
            <li>{e.nume+ ' '+e.locatie}</li>
        )}
        </ul>
        <form>
        Nume cupon: <input type="text" onChange={
        this.hadleInputChange} name="Nume cupon: "/>
        Locatie cupon:<input type="text" onChange={
        this.hadleInputChange} name="Nume locatie: "/>
        <input type="button" value="Adaugare" onClick=
        {()=>adaugareCupon({nume: this.state.cuponNume, locatie: this.state.cuponLocatie})}/>
        </form>
      </div>
    );
  }
}

export default ListaCupoane;
