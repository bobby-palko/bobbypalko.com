FROM postgres:latest

# Copy the initialization SQL script into the container
COPY init.sql /docker-entrypoint-initdb.d/

# Optional: Set any additional PostgreSQL configuration here
# Example: COPY postgresql.conf /etc/postgresql/postgresql.conf

# Optional: Set environment variables for additional configuration
# Example: ENV PGDATA=/var/lib/postgresql/data

# Optional: Customize the PostgreSQL data directory
# Example: VOLUME /var/lib/postgresql/data
