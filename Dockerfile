FROM python:3.10-slim

# Sistem güncellemeleri ve gerekli paketler
RUN apt-get update && apt-get install -y \
    gcc \
    g++ \
    libglib2.0-0 \
    libsm6 \
    libxext6 \
    libxrender-dev \
    libgl1-mesa-glx \
    libglib2.0-0 \
    wget \
    && rm -rf /var/lib/apt/lists/*

# Çalışma dizini
WORKDIR /app

# Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# ML pipeline dosyalarını kopyala
COPY ml-pipeline/ ./ml-pipeline/
COPY model-service/ ./model-service/

# Models dizini oluştur
RUN mkdir -p models

# Port açığa çıkar
EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:8000/health || exit 1

# Servis başlat
CMD ["uvicorn", "model-service.app:app", "--host", "0.0.0.0", "--port", "8000"] 