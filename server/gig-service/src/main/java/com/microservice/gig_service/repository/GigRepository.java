package com.microservice.gig_service.repository;

import com.microservice.gig_service.model.Gig;
import com.microservice.gig_service.model.GigDTO;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface GigRepository extends JpaRepository<Gig , Long> {
    List<Gig> findByUserId(Long freelancerId);
    List<Gig> findByCategoryContainingIgnoreCase(String category);
    List<Gig> findByTitleContainingIgnoreCaseOrDescriptionContainingIgnoreCase(String query, String query1);

}
