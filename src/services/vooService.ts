import axios from 'axios';
import { Voo } from '../types/voo';

// Base URL da API
const BASE_URL = 'http://localhost:3000/api/voos'; // Altere para a URL da sua API

// Função para buscar todos os voos
export const getVoos = async (): Promise<Voo[]> => {
  try {
    const response = await axios.get<Voo[]>(BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar voos:', error);
    throw error;
  }
};

// Função para buscar um voo por ID
export const getVooById = async (id: string): Promise<Voo> => {
  try {
    const response = await axios.get<Voo>(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar voo por ID:', error);
    throw error;
  }
};

// Função para criar um novo voo
export const createVoo = async (voo: Omit<Voo, 'id'>): Promise<Voo> => {
  try {
    const response = await axios.post<Voo>(BASE_URL, voo);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar voo:', error);
    throw error;
  }
};

// Função para atualizar um voo existente
export const updateVoo = async (id: string, voo: Partial<Voo>): Promise<Voo> => {
  try {
    const response = await axios.put<Voo>(`${BASE_URL}/${id}`, voo);
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar voo:', error);
    throw error;
  }
};

// Função para excluir um voo
export const deleteVooById = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${BASE_URL}/${id}`);
  } catch (error) {
    console.error('Erro ao excluir voo:', error);
    throw error;
  }
};
