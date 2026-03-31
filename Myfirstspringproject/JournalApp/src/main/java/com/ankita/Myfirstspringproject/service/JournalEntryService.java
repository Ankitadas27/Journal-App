package com.ankita.Myfirstspringproject.service;

import com.ankita.Myfirstspringproject.entity.JournalEntry;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class JournalEntryService {

    private final Map<Long, JournalEntry> journalEntries = new HashMap<>();
    private long nextId = 1;

    public List<JournalEntry> getAll() {
        return new ArrayList<>(journalEntries.values());
    }

    public void saveEntry(JournalEntry entry) {
        entry.setId(nextId);
        journalEntries.put(nextId, entry);
        nextId++;
    }

    public JournalEntry findById(long id) {
        return journalEntries.get(id);
    }

    public JournalEntry deleteById(long id) {
        return journalEntries.remove(id);
    }

    public JournalEntry updateById(long id, JournalEntry updatedEntry) {
        if (!journalEntries.containsKey(id)) {
            return null;
        }
        updatedEntry.setId(id);
        journalEntries.put(id, updatedEntry);
        return updatedEntry;
    }
}