"""
Отправка заявки с сайта BOGATOV TRAVEL в Telegram и на email.
"""
import os
import json
import urllib.request
import urllib.parse


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

    name = body.get("name", "").strip()
    phone = body.get("phone", "").strip()
    message = body.get("message", "").strip()

    if not name or not phone:
        return {"statusCode": 400, "headers": headers, "body": json.dumps({"ok": False, "error": "Имя и телефон обязательны"})}

    bot_token = os.environ.get("TELEGRAM_BOT_TOKEN", "")
    chat_id = os.environ.get("TELEGRAM_CHAT_ID", "")

    text = (
        "🏍 *Новая заявка с сайта BOGATOV TRAVEL*\n\n"
        f"👤 *Имя:* {name}\n"
        f"📞 *Телефон:* {phone}\n"
    )
    if message:
        text += f"💬 *Пожелания:* {message}\n"

    tg_ok = False
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
        except Exception as e:
            tg_ok = False

    return {
        "statusCode": 200,
        "headers": headers,
        "body": json.dumps({"ok": True, "telegram": tg_ok}),
    }
