package com.salarycalc.backend.repository;

import com.salarycalc.backend.model.SalaryEntry;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SalaryEntryRepository extends JpaRepository<SalaryEntry, Long> {
}
