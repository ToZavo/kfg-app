import os
import psycopg2
import psycopg2.extras

DATABASE_URL = os.environ.get("DATABASE_URL")

def get_connection():
    return psycopg2.connect(DATABASE_URL)

def init_db():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS entries (
            id SERIAL PRIMARY KEY,
            date TEXT NOT NULL,
            content TEXT NOT NULL,
            clean_days INTEGER
        )
    """)
    conn.commit()
    cursor.close()
    conn.close()

def save_entry(date, content, clean_days):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO entries (date, content, clean_days)
        VALUES (%s, %s, %s)
    """, (date, content, clean_days))
    conn.commit()
    cursor.close()
    conn.close()

def get_all_entries():
    conn = get_connection()
    cursor = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    entries = cursor.fetchall()
    cursor.close()
    conn.close()
    return [dict(row) for row in entries]