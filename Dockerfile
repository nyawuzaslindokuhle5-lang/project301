# SEB-XRIF FastAPI Production Dockerfile (Phase 12)
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
COPY api/ ./api/
COPY eval/ ./eval/
COPY models/ ./models/
EXPOSE 8000
CMD ["python", "-m", "api.main", "--port", "8000"]
