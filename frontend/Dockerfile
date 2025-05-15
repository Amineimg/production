# استخدم صورة Node الرسمية
FROM node:18

# حدّد مجلد العمل داخل الحاوية
WORKDIR /app

# نسخ ملفات الباكيج فقط
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000


CMD ["npm", "start"]
