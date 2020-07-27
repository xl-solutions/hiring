import { shallowMount } from '@vue/test-utils'
import Home from '@/components/Home.vue'
import Vue from 'vue'
import ApiService from '@/service/ApiService';

Vue.prototype.$apiService = ApiService;

describe('Iniciando os testes unitários...',  () => {
  it('Testando função precoAtual', async () => {
    const wrapper = shallowMount(Home);
    const vm = wrapper.vm;
    const data = await vm.testePrecoAtual();
    expect(data).toBe(true);
  });
  it('Testando função precoHistorico', async () => {
    const wrapper = shallowMount(Home);
    const vm = wrapper.vm;
    const data = await vm.testePrecoHistorico();
    expect(data).toBe(true);
  });
  it('Testando função compararAcoes', async () => {
    const wrapper = shallowMount(Home);
    const vm = wrapper.vm;
    const data = await vm.testeCompararAcoes();
    expect(data).toBe(true);
  });
  it('Testando função projecaoGanhos', async () => {
    const wrapper = shallowMount(Home);
    const vm = wrapper.vm;
    const data = await vm.testeprojecaoGanhos();
    expect(data).toBe(true);
  });
})
