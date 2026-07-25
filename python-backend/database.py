import sqlite3

def init_db():
    conn = sqlite3.connect("journal.db") # open or creates database file
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS entries (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            date TEXT NOT NULL,
            content TEXT NOT NULL,
            clean_days INTEGER
        )
    """)
    conn.commit()
    conn.close()

def save_entry(date, content, clean_days):
    conn = sqlite3.connect("journal.db")
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO entries (date, content, clean_days)
        VALUES (?, ?, ?)
    """, (date, content, clean_days))
    conn.commit()
    conn.close()