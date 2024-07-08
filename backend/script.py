import sqlite3
import mysql.connector

# Configuration de la base de données SQLite
sqlite_db = '../arosaje.db'

# Configuration de la base de données MySQL
mysql_config = {
  'user': 'root',
  'password': 'root',
  'host': 'localhost',
  'port': 8888,
  'database': 'arosaje',
  'raise_on_warnings': True
}

# Connexion à la base de données SQLite
sqlite_conn = sqlite3.connect(sqlite_db)
sqlite_cursor = sqlite_conn.cursor()

# Connexion à la base de données MySQL
mysql_conn = mysql.connector.connect(**mysql_config)
mysql_cursor = mysql_conn.cursor()

# Fonction pour créer les tables dans MySQL
def create_mysql_tables():
    sqlite_cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
    tables = sqlite_cursor.fetchall()
    for table_name in tables:
        table_name = table_name[0]
        sqlite_cursor.execute(f"PRAGMA table_info({table_name});")
        columns = sqlite_cursor.fetchall()
        
        column_defs = []
        for column in columns:
            column_name = column[1]
            column_type = column[2]
            # Simplification : vous pouvez améliorer la conversion des types ici
            if 'INT' in column_type.upper():
                column_type = 'INT'
            elif 'CHAR' in column_type.upper() or 'TEXT' in column_type.upper():
                column_type = 'VARCHAR(255)'
            column_defs.append(f"`{column_name}` {column_type}")
        
        column_defs_str = ", ".join(column_defs)
        create_table_sql = f"CREATE TABLE `{table_name}` ({column_defs_str});"
        mysql_cursor.execute(create_table_sql)

# Fonction pour migrer les données des tables
def migrate_data():
    sqlite_cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
    tables = sqlite_cursor.fetchall()
    for table_name in tables:
        table_name = table_name[0]
        sqlite_cursor.execute(f"SELECT * FROM {table_name};")
        rows = sqlite_cursor.fetchall()
        column_names = [description[0] for description in sqlite_cursor.description]
        
        for row in rows:
            column_placeholders = ", ".join(["%s"] * len(row))
            insert_sql = f"INSERT INTO `{table_name}` ({', '.join(column_names)}) VALUES ({column_placeholders});"
            mysql_cursor.execute(insert_sql, row)
        
        mysql_conn.commit()

# Création des tables dans MySQL
create_mysql_tables()

# Migration des données
migrate_data()

# Fermeture des connexions
sqlite_conn.close()
mysql_conn.close()