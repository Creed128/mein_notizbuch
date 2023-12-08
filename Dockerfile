# syntax=docker/dockerfile:1

# Use the specific Python version
ARG PYTHON_VERSION=3.11.3
FROM python:${PYTHON_VERSION}-slim as base

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set the working directory
WORKDIR /app

# Create a non-privileged user
ARG UID=10001
RUN adduser \
    --disabled-password \
    --gecos "" \
    --home "/nonexistent" \
    --shell "/sbin/nologin" \
    --no-create-home \
    --uid "${UID}" \
    appuser

# Install Python dependencies
RUN --mount=type=cache,target=/root/.cache/pip \
    --mount=type=bind,source=requirements.txt,target=requirements.txt \
    python -m pip install -r requirements.txt

# Switch to the non-privileged user
USER appuser

# Copy the source code into the container
COPY . .

# Expose the port that the application listens on
EXPOSE 8000

# Run the application
CMD ["python", "app.py"]  # Replace "app.py" with the actual entry point of your application

