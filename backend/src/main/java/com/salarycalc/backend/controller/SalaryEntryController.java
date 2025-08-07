package com.salarycalc.backend.controller;

import com.salarycalc.backend.model.SalaryEntry;
import com.salarycalc.backend.service.SalaryEntryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;


import java.util.List;

@RestController
@RequestMapping("/api/salary")
@CrossOrigin(origins = "*")
public class SalaryEntryController {

    @Autowired
    private SalaryEntryService salaryEntryService;

    // @PostMapping
    // public SalaryEntry createSalaryEntry(@RequestBody SalaryEntry entry) {
    //     return salaryEntryService.createSalaryEntry(entry);
    // }
    // @PostMapping
    // public SalaryEntry createOrUpdateSalaryEntry(@RequestBody SalaryEntry entry) {
    //     return salaryEntryService.createOrUpdateSalaryEntry(entry); // ✅ Updated
    // }
    @PostMapping
public ResponseEntity<SalaryEntry> createOrUpdateSalaryEntry(@RequestBody SalaryEntry entry) {
    SalaryEntry saved = salaryEntryService.createOrUpdateSalaryEntry(entry);
    return ResponseEntity.ok(saved); // Or .created(location).body(saved) if you're tracking URI
}


    @GetMapping
    public List<SalaryEntry> getAllSalaryEntries() {
        return salaryEntryService.getAllSalaryEntries();
    }
    @DeleteMapping
public ResponseEntity<String> deleteAllEntries() {
    salaryEntryService.deleteAllEntries();
    return ResponseEntity.ok("All entries deleted");
}

}