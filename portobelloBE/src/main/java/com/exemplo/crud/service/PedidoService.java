package com.exemplo.crud.service;

import com.exemplo.crud.exception.PedidoException;
import com.exemplo.crud.model.Pedido;
import com.exemplo.crud.repository.PedidoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class PedidoService {

    private final PedidoRepository repository;

    @Autowired
    public PedidoService(PedidoRepository repository) {
        this.repository = repository;
    }

    public List<Pedido> listarTodos() {
        return repository.findAll();
    }

    public Optional<Pedido> buscarPorId(String id) {
        return repository.findById(id);
    }

    @Transactional
    public Pedido atualizar(String id, Pedido novoPedido) {
        return repository.findById(id)
                .map(pedido -> {
                    validarPedido(novoPedido);
                    pedido.setNome(novoPedido.getNome());
                    pedido.setPreco(novoPedido.getPreco());
                    pedido.setTipoProduto(novoPedido.getTipoProduto());
                    pedido.setAmbiente(novoPedido.getAmbiente());
                    pedido.setCodigo(novoPedido.getCodigo());
                    pedido.setStatus(novoPedido.getStatus());
                    return repository.save(pedido);
                })
                .orElseThrow(() -> new PedidoException("Pedido não encontrado com ID: " + id));
    }

    @Transactional
    public void deletar(String id) {
        try {
            repository.deleteById(id);
        } catch (EmptyResultDataAccessException e) {
            throw new PedidoException("Pedido não encontrado com ID: " + id);
        }
    }

    public Pedido criar(Pedido pedido) {
        validarPedido(pedido);
        pedido.setDataCriacao(LocalDateTime.now());
        return repository.save(pedido);
    }
    private void validarPedido(Pedido pedido) {
        if (repository.existsByNomeAndIdNot(pedido.getNome(), pedido.getId())) {
            throw new PedidoException("Já existe um pedido com este nome");
        }
        if (pedido.getPreco() <= 0) {
            throw new PedidoException("Preço deve ser maior que zero");
        }
    }
}