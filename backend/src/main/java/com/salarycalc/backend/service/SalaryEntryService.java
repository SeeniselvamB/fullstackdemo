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
    // public SalaryEntry createOrUpdateSalaryEntry(SalaryEntry entry) {
    //     SalaryEntry existing = repository.findByDay(entry.getDay());
    //     if (existing != null) {
    //         // Update fields
    //         existing.setInTime(entry.getInTime());
    //         existing.setOutTime(entry.getOutTime());
    //         existing.setTotalHours(entry.getTotalHours());
    //         existing.setSalary(entry.getSalary());
    //         existing.setLeave(entry.isLeave());
    //         existing.setRate(entry.getRate()); // 👈 Add this line


    //         return repository.save(existing); // update
    //     } else {
    //         return repository.save(entry); // create new
    //     }
    // }

    public SalaryEntry createOrUpdateSalaryEntry(SalaryEntry entry) {
    SalaryEntry existing = repository.findByDay(entry.getDay());
    if (existing != null) {
        // Update all fields
        existing.setInTime(entry.getInTime());
        existing.setOutTime(entry.getOutTime());
        existing.setInAmPm(entry.getInAmPm());       // ✅ new
        existing.setOutAmPm(entry.getOutAmPm());     // ✅ new
        existing.setTotalHours(entry.getTotalHours());
        existing.setSalary(entry.getSalary());
        existing.setLeave(entry.isLeave());
        existing.setRate(entry.getRate());

        return repository.save(existing); // update
    } else {
        return repository.save(entry); // create new
    }
}

    public List<SalaryEntry> getAllSalaryEntries() {
        return repository.findAll();
    }
    public void deleteAllEntries() {
    repository.deleteAll();
}

}