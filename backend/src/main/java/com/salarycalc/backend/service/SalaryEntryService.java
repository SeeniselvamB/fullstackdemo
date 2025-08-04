package com.salarycalc.backend.service;

import com.salarycalc.backend.model.SalaryEntry;
import com.salarycalc.backend.repository.SalaryEntryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SalaryEntryService {

    @Autowired
    private SalaryEntryRepository repository;

    public SalaryEntry createSalaryEntry(SalaryEntry entry) {
        return repository.save(entry);
    }

    public List<SalaryEntry> getAllSalaryEntries() {
        return repository.findAll();
    }
}
