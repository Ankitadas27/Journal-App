package com.ankita.Myfirstspringproject.controller;

import com.ankita.Myfirstspringproject.entity.JournalEntry;
import com.ankita.Myfirstspringproject.service.JournalEntryService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/journal")
public class JournalEntryController {

    @Autowired
    private JournalEntryService journalEntryService;

    @GetMapping
    public ResponseEntity<List<JournalEntry>> getAll() {
        List<JournalEntry> entries = journalEntryService.getAll();
        return ResponseEntity.ok(entries);
    }

    @PostMapping
    public ResponseEntity<String> createEntry(@Valid @RequestBody JournalEntry myEntry) {
        journalEntryService.saveEntry(myEntry);
        return ResponseEntity.status(HttpStatus.CREATED).body("Journal entry created successfully!");
    }

    @GetMapping("id/{myId}")
    public ResponseEntity<JournalEntry> getJournalEntryById(@PathVariable long myId) {
        JournalEntry entry = journalEntryService.findById(myId);
        if (entry == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.ok(entry);
    }

    @DeleteMapping("id/{myId}")
    public ResponseEntity<String> deleteJournalEntryById(@PathVariable long myId) {
        JournalEntry removed = journalEntryService.deleteById(myId);
        if (removed == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Entry not found");
        }
        return ResponseEntity.ok("Entry deleted successfully");
    }

    @PutMapping("id/{id}")
    public ResponseEntity<JournalEntry> updateJournalById(
            @PathVariable long id,
            @Valid @RequestBody JournalEntry myEntry) {
        JournalEntry updated = journalEntryService.updateById(id, myEntry);
        if (updated == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.ok(updated);
    }
}