package com.exemplo.crud.service;

import com.exemplo.crud.exception.PedidoException;
import com.exemplo.crud.model.Pedido;
import com.exemplo.crud.repository.PedidoRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.dao.EmptyResultDataAccessException;

import java.time.LocalDateTime;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class PedidoServiceTest {

    private PedidoRepository repository;
    private PedidoService service;

    @BeforeEach
    void setUp() {
        repository = mock(PedidoRepository.class);
        service = new PedidoService(repository);
    }

    @Test
    void deveListarTodosOsPedidos() {
        List<Pedido> pedidos = List.of(new Pedido(), new Pedido());
        when(repository.findAll()).thenReturn(pedidos);

        List<Pedido> resultado = service.listarTodos();

        assertEquals(2, resultado.size());
        verify(repository, times(1)).findAll();
    }

    @Test
    void deveBuscarPedidoPorIdExistente() {
        Pedido pedido = new Pedido();
        pedido.setId("123");
        when(repository.findById("123")).thenReturn(Optional.of(pedido));

        Optional<Pedido> resultado = service.buscarPorId("123");

        assertTrue(resultado.isPresent());
        assertEquals("123", resultado.get().getId());
    }

    @Test
    void deveCriarPedidoComDadosValidos() {
        Pedido pedido = new Pedido();
        pedido.setId("1");
        pedido.setNome("Produto X");
        pedido.setPreco(100.0);

        when(repository.existsByNomeAndIdNot("Produto X", "1")).thenReturn(false);
        when(repository.save(any(Pedido.class))).thenAnswer(invocation -> invocation.getArgument(0));

        Pedido criado = service.criar(pedido);

        assertNotNull(criado.getDataCriacao());
        verify(repository).save(any(Pedido.class));
    }

    @Test
    void naoDeveCriarPedidoComPrecoZero() {
        Pedido pedido = new Pedido();
        pedido.setId("1");
        pedido.setNome("Produto Y");
        pedido.setPreco(0.0);

        PedidoException ex = assertThrows(PedidoException.class, () -> service.criar(pedido));
        assertEquals("Preço deve ser maior que zero", ex.getMessage());
    }

    @Test
    void naoDeveCriarPedidoComNomeDuplicado() {
        Pedido pedido = new Pedido();
        pedido.setId("1");
        pedido.setNome("Duplicado");
        pedido.setPreco(10.0);

        when(repository.existsByNomeAndIdNot("Duplicado", "1")).thenReturn(true);

        PedidoException ex = assertThrows(PedidoException.class, () -> service.criar(pedido));
        assertEquals("Já existe um pedido com este nome", ex.getMessage());
    }

    @Test
    void deveAtualizarPedidoExistente() {
        Pedido existente = new Pedido();
        existente.setId("1");
        existente.setNome("Antigo");

        Pedido novo = new Pedido();
        novo.setId("1");
        novo.setNome("Atualizado");
        novo.setPreco(100.0);

        when(repository.findById("1")).thenReturn(Optional.of(existente));
        when(repository.existsByNomeAndIdNot("Atualizado", "1")).thenReturn(false);
        when(repository.save(any())).thenAnswer(inv -> inv.getArgument(0));

        Pedido atualizado = service.atualizar("1", novo);

        assertEquals("Atualizado", atualizado.getNome());
    }

    @Test
    void naoDeveAtualizarPedidoInexistente() {
        Pedido novo = new Pedido();
        novo.setId("1");
        novo.setNome("Novo");
        novo.setPreco(50.0);

        when(repository.findById("1")).thenReturn(Optional.empty());

        PedidoException ex = assertThrows(PedidoException.class, () -> service.atualizar("1", novo));
        assertTrue(ex.getMessage().contains("Pedido não encontrado com ID"));
    }

    @Test
    void deveDeletarPedidoExistente() {
        doNothing().when(repository).deleteById("1");

        assertDoesNotThrow(() -> service.deletar("1"));
        verify(repository).deleteById("1");
    }

    @Test
    void naoDeveDeletarPedidoInexistente() {
        doThrow(new EmptyResultDataAccessException(1)).when(repository).deleteById("1");

        PedidoException ex = assertThrows(PedidoException.class, () -> service.deletar("1"));
        assertTrue(ex.getMessage().contains("Pedido não encontrado com ID"));
    }
}
