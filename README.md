# OHRS — Offsite Human Resources System

**OHRS** (Offsite Human Resources System) هو نظام إدارة موارد بشرية مخصص للبيئات التشغيلية خارج المواقع المركزية مثل المصافي، ساحات الخزن، وحدات الإنتاج، وغيرها من مواقع العمل الصناعية.  
تم تصميم النظام ليكون قابلًا للتوسع، مرنًا، وقويًا من ناحية التحكم بالصلاحيات، مع دعم مستقبلي للذكاء الاصطناعي.

---

## 📌 Features

### 🎯 Core HR
- إدارة الموظفين (Employees)
- الوحدات التشغيلية (Units)
- العناوين الوظيفية الحكومية (Job Titles)
- الاختصاصات التشغيلية (Job Specifications)
- بيانات الموظف التفصيلية (الاتصال، الموقع، الشهادة، الدرجة…)
- تتبع حالة الموظف (ملاك، عقد، أجر يومي)

---

### 📝 Evaluations & Rewards (Future)
- التقييمات الشهرية (Monthly Evaluations)
- نظام المكافآت (Remuneration System)
- ربط تقييمات الوحدة مع المدير المباشر
- صلاحيات دقيقة لإضافة/عرض التقييمات

---

### 🔐 Authentication & Authorization
- تسجيل الدخول باستخدام JWT
- PBAC — Permission-Based Access Control
- أدوار متعددة (Root, Admin, Manager, User)
- صلاحيات دقيقة (employee.read, evaluation.create, …)

---

### ⚙️ Architecture & Design
- Clean Architecture  
- Models → Services → Controllers → Middlewares  
- PostgreSQL + Sequelize ORM  
- دعم TypeScript (مستقبلاً)  
- بنية قوية قابلة للتطوير

---

### 🤖 AI Assistant Integration (Future)
- دعم Microservice منفصل لخدمة LLM
- تحليل PDF / تقارير تشغيلية
- استخدام RAG (Retrieval-Augmented Generation)
- تكامل مع البيانات التشغيلية
- مساعد ذكي لإدارة الموارد البشرية

---

## 🧱 Project Structure

يستخدم المشروع بنية احترافية واضحة:

```
src/
 ├─ models/          # Sequelize models
 ├─ services/        # Business logic (core)
 ├─ controllers/     # Route handlers (thin)
 ├─ middlewares/     # Auth, validation, permissions
 ├─ utils/           # Helper functions
 ├─ routes/          # API routes
 └─ app.js           # Express application
```

---

## 🗄️ Database Schema (ERD Overview)

### **Core Tables**
- employees  
- units  
- job_titles  
- job_specifications  

### **Authentication Tables**
- users  
- roles  
- permissions  
- role_permissions  

### **Transactional Tables (Future)**
- monthly_evaluations  
- remunerations  

### ERD (Text Summary)

```
employees (FK → job_titles, job_specifications, units)
users (FK → roles, optional FK → employees)
roles (M:N) permissions via role_permissions
employees (1:M) monthly_evaluations
employees (1:M) remunerations
```

> ERD سيتم توفير نسخة رسومية لاحقًا.

---

## 🚀 Installation

### 1) Clone the repository

```bash
git clone https://github.com/rushdy87/ohrs.git
cd ohrs
```

### 2) Install dependencies

```bash
npm install
```

### 3) Configure environment variables

قم بإنشاء ملف `.env`:

```
PORT=5000
DATABASE_URL=postgres://user:password@localhost:5432/ohrs
JWT_SECRET=your_jwt_secret_key
```

### 4) Run migrations (if using Sequelize CLI)

```bash
npm run migrate
```

### 5) Start the server

```bash
npm run dev
```

---

## 🧰 Tech Stack

- **Node.js**  
- **Express**  
- **PostgreSQL**  
- **Sequelize ORM**  
- **JWT Authentication**  
- **PBAC Authorization**  
- **TypeScript (Planned)**  
- **Docker (Future)**  
- **LLM Integration (Future)**  

---

## 📍 Roadmap

### Phase 1 — Core HR
- [ ] Employee CRUD  
- [ ] Units CRUD  
- [ ] Job Titles CRUD  
- [ ] Job Specifications CRUD  

### Phase 2 — Authentication
- [ ] JWT Login  
- [ ] Roles  
- [ ] Permissions  
- [ ] PBAC Middleware  

### Phase 3 — Evaluation & Rewards
- [ ] Monthly Evaluations  
- [ ] Remuneration System  
- [ ] Unit-based access  

### Phase 4 — Frontend
- [ ] React Admin Dashboard  
- [ ] UI for evaluations  
- [ ] Permissions UI  

### Phase 5 — AI Assistant (Microservice)
- [ ] LLM Server  
- [ ] RAG Pipeline  
- [ ] Vector Database  
- [ ] HR Assistant Interface  

---

## 📜 License

This project is licensed under the **MIT License**.  
See the `LICENSE` file for more details.

---

## 🤝 Contributing

المساهمات مرحّب بها في جميع المراحل:

- تحسينات تصميم  
- بناء واجهات  
- كتابة Tests  
- توسيع نظام الصلاحيات  

---

## 👤 Author

**Rushdy (@rushdy87)**  
Creator & Architect of OHRS — Offsite Human Resources System

