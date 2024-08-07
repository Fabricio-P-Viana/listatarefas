import React, { Component } from "react";

import Form from './Form';
import Tarefas from './Tarefas';

import './Main.css';

export default class Main extends Component {
    state = {
        novaTarefa:'',
        tarefas: [],
        index: -1,
    };

    componentDidMount(){ // é executado quando o componente é criado
        const tarefas = JSON.parse(localStorage.getItem('tarefas'));

        if(!tarefas) return;

        this.setState({
            tarefas,
        });
    }
    
    componentDidUpdate(prevProps,prevState){ // é executado quando atualzar o componente
        // prevState pega um estado anterior do atual
        const { tarefas } = this.state;
        // podemos comparar esse estados
        if (tarefas === prevState.tarefas) return;

        localStorage.setItem('tarefas',JSON.stringify(tarefas)); // salvando no localstorage
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const {tarefas,index} = this.state;
        let {novaTarefa} = this.state;
        novaTarefa = novaTarefa.trim();

        if (tarefas.indexOf(novaTarefa) !== -1) return;

        const novasTarefas = [...tarefas];

        if (index === -1) { // se for nova tarefa
           this.setState({
            tarefas: [...novasTarefas,novaTarefa],
            novaTarefa: '',
        }); 
        } else { // estado de edição de tarefa existente
            novasTarefas[index] = novaTarefa;
            this.setState({
                tarefas: [...novasTarefas],
                index: -1,
            })
        }
    }

    handleChange = (e) => {
        this.setState({
            novaTarefa: e.target.value,
        });
    }

    handleDelete = (e,index) =>{
        const {tarefas} = this.state;
        const novasTarefas = [...tarefas];
        novasTarefas.splice(index, 1);
        this.setState({
            tarefas: [...novasTarefas],
        })
    }

    handleEdit = (e,index) =>{
        const {tarefas} = this.state;
        
        this.setState({
            index,
            novaTarefa: tarefas[index],
        })
    }

    render(){
        const {novaTarefa, tarefas} = this.state; 
        return (
            <div className="main">
                <h1>Lista de Tarefas </h1>
                <Form 
                    handleSubmit={this.handleSubmit}
                    handleChange={this.handleChange}
                    novaTarefa={novaTarefa}
                />
                <Tarefas
                    tarefas={tarefas}
                    handleEdit={this.handleEdit}
                    handleDelete={this.handleDelete}
                />
            </div>
        );
    }
}