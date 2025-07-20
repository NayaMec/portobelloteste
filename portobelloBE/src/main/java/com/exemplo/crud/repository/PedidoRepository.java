package com.exemplo.crud.repository;

import com.exemplo.crud.model.Pedido;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface PedidoRepository extends MongoRepository<Pedido, String> {
    boolean existsByNome(String nome);
    boolean existsByNomeAndIdNot(String nome, String id);

    @Query("{'status': ?0}")
    List<Pedido> findByStatus(String status);

    List<Pedido> findByTipoProduto(String tipoProduto);
}