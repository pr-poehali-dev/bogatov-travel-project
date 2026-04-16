"""
Приём заявки с сайта BOGATOV TRAVEL: сохранение в БД и отправка в Telegram.
"""
import os
import json
import urllib.request
import psycopg2
import logging

logger = logging.getLogger()


def handler(event: dict, context) -> dict:
    headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        "Content-Type": "application/json",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": headers, "body": ""}

    try:
        body = json.loads(event.get("body") or "{}")
    except Exception:
        return {"statusCode": 400, "headers": headers, "body": json.dumps({"ok": False, "error": "Invalid JSON"})}

    name    = body.get("name", "").strip()
    phone   = body.get("phone", "").strip()
    email   = body.get("email", "").strip()
    tour    = body.get("tour", "").strip()
    message = body.get("message", "").strip()

    if not name or not phone:
        return {"statusCode": 400, "headers": headers, "body": json.dumps({"ok": False, "error": "Имя и телефон обязательны"})}

    schema = os.environ.get("MAIN_DB_SCHEMA", "public")

    # Сохраняем в БД
    db_ok = False
    try:
        conn = psycopg2.connect(os.environ["DATABASE_URL"])
        cur = conn.cursor()
        cur.execute(
            f"INSERT INTO {schema}.leads (name, phone, email, tour, message) VALUES (%s, %s, %s, %s, %s)",
            (name, phone, email or None, tour or None, message or None)
        )
        conn.commit()
        cur.close()
        conn.close()
        db_ok = True
    except Exception:
        db_ok = False

    # Отправляем в Telegram
    bot_token = os.environ.get("TELEGRAM_BOT_TOKEN", "")
    chat_id   = os.environ.get("TELEGRAM_CHAT_ID", "")

    text = "🏍 *Новая заявка — BOGATOV TRAVEL*\n\n"
    text += f"👤 *Имя:* {name}\n"
    text += f"📞 *Телефон:* {phone}\n"
    if email:
        text += f"📧 *Email:* {email}\n"
    if tour:
        text += f"🎯 *Формат:* {tour}\n"
    if message:
        text += f"💬 *Пожелания:* {message}\n"

    tg_ok = False
    logger.info(f"TG token present: {bool(bot_token)}, chat_id present: {bool(chat_id)}")
    if bot_token and chat_id:
        tg_payload = json.dumps({
            "chat_id": chat_id,
            "text": text,
            "parse_mode": "Markdown",
        }).encode("utf-8")
        tg_req = urllib.request.Request(
            f"https://api.telegram.org/bot{bot_token}/sendMessage",
            data=tg_payload,
            headers={"Content-Type": "application/json"},
            method="POST",
        )
        try:
            with urllib.request.urlopen(tg_req, timeout=10) as resp:
                tg_result = json.loads(resp.read())
                tg_ok = tg_result.get("ok", False)
                logger.info(f"TG response: {tg_result}")
        except Exception as e:
            logger.error(f"TG error: {e}")
            tg_ok = False
    else:
        logger.warning(f"TG skipped: token={bool(bot_token)}, chat_id={bool(chat_id)}")

    return {
        "statusCode": 200,
        "headers": headers,
        "body": json.dumps({"ok": True, "db": db_ok, "telegram": tg_ok}),
    }