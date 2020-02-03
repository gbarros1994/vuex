import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        contador: 0,
        tarefas: [],
        pessoas: [],
        teste: [],
        funcionarios: [],
        produtos:[]
    },
    getters: {
        tarefasConcluidas: (state) => {
            return state.tarefas.filter(t => t.concluido)
        },
        tarefasaFazer: state => state.tarefas.filter(t=> !t.concluido),
        totalDeTarefas: (state, getters) => getters.tarefas.tarefasConcluidas.length,
        buscarTarefasPorId: (state) => {
            return (id) => {
                return state.tarefas.find(t => t.id === id)
            }
        },
        buscarGerson: state => state.pessoas.filter(p => p.nome == 'gerson'),
        buscarAtarefados: state => state.funcionarios.filter(p => p.tarefa === true)
    },
    mutations: {
        listarTarefas: (state, payload) => {
            state.tarefas = payload.tarefas
        },
        listarPessoas: (state, payload) => {
            state.pessoas = payload.pessoas
        },
        listarFuncionarios: (state, payload) => {
            state.funcionarios = payload.funcionarios
        },
        listarProdutos: (state, payload) => {
            state.produtos = payload.produtos
        }
    },
    actions: {
        listarProdutos: (context, payload) => {
            setTimeout(() => {
                context.commit('listarProdutos', payload)
            }, 3000);
        }
    }
})