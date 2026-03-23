from pathlib import Path
import sys

from fastapi import FastAPI
from fastapi.testclient import TestClient

sys.path.append(str(Path(__file__).resolve().parents[1]))

from app.routers import contact as contact_router_module


def build_test_client(monkeypatch):
    app = FastAPI()
    app.include_router(contact_router_module.router, prefix="/api/v1")

    async def fake_email_task(*args, **kwargs):
        return None

    monkeypatch.setattr(contact_router_module, "process_emails_in_background", fake_email_task)
    return TestClient(app)


def test_submit_contact_form_success(monkeypatch):
    client = build_test_client(monkeypatch)
    response = client.post(
        "/api/v1/contact/submit",
        json={
            "name": "Alice Tester",
            "email": "alice@example.com",
            "project_type": "website",
            "message": "Need a modern website with scalable backend architecture.",
        },
    )

    assert response.status_code == 201
    payload = response.json()
    assert payload["success"] is True
    assert isinstance(payload["submission_id"], int)
    assert payload["submission_id"] > 0


def test_submit_contact_form_validation_error(monkeypatch):
    client = build_test_client(monkeypatch)
    response = client.post(
        "/api/v1/contact/submit",
        json={
            "name": "",
            "email": "not-an-email",
            "project_type": "website",
            "message": "short",
        },
    )

    assert response.status_code == 422
    payload = response.json()
    assert "detail" in payload
