<template>
    <div>

        <div class="row">
            <div class="col-sm-10">
                <h1 class="font-weight-light">Lista de Tarefas</h1>
            </div>
            <div class="col-sm-2">
                <button 
                    class="btn btn-primary float-right" 
                    @click="exibirFormularioCriarTarefa">
                        <i class="fa fa-plus mr-2"></i>
                        <span>Criar</span>
                </button>
            </div>
        </div>
        
        <ul class="list-group" v-if="tarefas.length > 0">
            <TarefasListaIten
                v-for="tarefa in tarefasaFazer"
                :key="tarefa.id"
                :tarefa="tarefa"
                @editar="selecionarTarefaParaEdicao" />
        </ul>

        <p v-else>Nenhuma tarefa criada.</p>

        <TarefaSalvar
            v-if="exibirFormulario"
            :tarefa="tarefaSelecionada" />

            <br>
            <h4>Tarefas Concluidas: {{tarefasConcluidas.length}}</h4>
            <h4>Tarefas a fazer:</h4>
            <h4>Total de tarefas:</h4>
            quantidade: {{pessoas}} <br>
            achou: {{buscarGerson}}
            ue: {{teste}}

            <hr>
            <template 
            v-for="func in funcionarios">
                <div :key="func.id">
                    {{func.nome}}
                </div>
            </template>
            <hr>
            <template v-for="tar in buscarAtarefados">
                <div :key="tar.id">
                    Atarefados: {{tar.nome}} <br>
                </div>
            </template>
            <hr>
{{produtos}}

    </div>
</template>

<script>

import {mapState, mapGetters} from 'vuex'

import TarefaSalvar from './TarefaSalvar.vue'
import TarefasListaIten from './TarefasListaIten.vue'
import axios from 'axios'

export default {
    components: {
        TarefaSalvar,
        TarefasListaIten
    },
    data() {
        return {
            exibirFormulario: false,
            tarefaSelecionada: undefined
        }
    },
    computed: {
        ...mapState(['tarefas', 'pessoas', 'funcionarios', 'produtos']),
        ...mapGetters(['tarefasaFazer', 'totalDeTarefas', 'buscarTarefasPorId', 'tarefasConcluidas', 'buscarGerson', 'buscarAtarefados'])
    },
    created() {
        this.$store.commit('listarTarefas', {
            tarefas: [
                { id: 1, titulo: 'Aprender Vue', concluido: true },
                { id: 2, titulo: 'Aprender Vue Router', concluido: true },
                { id: 3, titulo: 'Aprender Vuex', concluido: false }
            ]
        }),
        this.$store.commit('listarPessoas', {
            pessoas: [
                {id: 1, nome: 'gerson'},
                {id: 2, nome: 'carlos'}
            ]
        }),
        this.$store.commit('listarFuncionarios', {
            funcionarios: [
                {id: 1, nome: 'gerson barros', cargo: 'programador', tarefa: false},
                {id: 1, nome: 'matheus gay', cargo: 'programador', tarefa: true},
                {id: 1, nome: 'andrelo', cargo: 'front', tarefa: true},
                {id: 1, nome: 'raul', cargo: 'gerente', tarefa: false},
                {id: 1, nome: 'rodrigo', cargo: 'boss', tarefa: true}
            ]
        }),
        this.$store.dispatch('listarProdutos', {
            produtos: [
                {id: 1, nome: 'Computador'},
                {id: 2, nome: 'Mouse'}
            ]
        })
        // this.$store.commit('listarProdutos', {
        //     produtos: [
        //         {id: 1, nome: 'Computador'},
        //         {id: 2, nome: 'Mouse'}
        //     ]
        // })
    },

    methods: {
        exibirFormularioCriarTarefa(event) {
            if (this.tarefaSelecionada) {
                this.tarefaSelecionada = undefined
                return
            }
            this.exibirFormulario = !this.exibirFormulario
        },
        selecionarTarefaParaEdicao(tarefa) {
            this.exibirFormulario = true
            this.tarefaSelecionada = tarefa
        },
        resetar() {
            this.exibirFormulario = false
            this.tarefaSelecionada = undefined
        }
    }
}
</script>
