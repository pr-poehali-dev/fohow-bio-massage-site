import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event, context):
    """Отправка заявки на запись на почту специалиста"""
    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }

    cors = {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}

    if event.get('httpMethod') != 'POST':
        return {'statusCode': 405, 'headers': cors, 'body': json.dumps({'error': 'Method not allowed'})}

    raw_body = event.get('body') or '{}'
    body = json.loads(raw_body) if isinstance(raw_body, str) else raw_body
    name = body.get('name', '').strip()
    phone = body.get('phone', '').strip()

    if not name or not phone:
        return {'statusCode': 400, 'headers': cors, 'body': json.dumps({'error': 'Имя и телефон обязательны'})}

    recipient = 'Ludmila16_92@mail.ru'
    sender = 'Ludmila16_92@mail.ru'
    smtp_password = os.environ.get('SMTP_PASSWORD', '')

    msg = MIMEMultipart()
    msg['From'] = sender
    msg['To'] = recipient
    msg['Subject'] = f'Новая заявка на БЭМ от {name}'

    html = f"""
    <div style="font-family:Arial,sans-serif;max-width:500px;padding:20px;background:#FDFAF3;border:1px solid #E8D9B8;border-radius:8px;">
        <h2 style="color:#4A3520;margin-top:0;">Новая заявка с сайта FOHOW</h2>
        <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:8px 0;color:#7A5C3A;font-weight:bold;">Имя:</td><td style="padding:8px 0;color:#4A3520;">{name}</td></tr>
            <tr><td style="padding:8px 0;color:#7A5C3A;font-weight:bold;">Телефон:</td><td style="padding:8px 0;color:#4A3520;"><a href="tel:{phone}">{phone}</a></td></tr>
        </table>
        <p style="margin-top:16px;font-size:12px;color:#7A5C3A;">Клиент ожидает обратный звонок</p>
    </div>
    """
    msg.attach(MIMEText(html, 'html'))

    server = smtplib.SMTP_SSL('smtp.mail.ru', 465)
    server.login(sender, smtp_password)
    server.sendmail(sender, recipient, msg.as_string())
    server.quit()

    return {'statusCode': 200, 'headers': cors, 'body': json.dumps({'success': True})}