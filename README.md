# 🎯 ActuaryHub - Professional Actuarial Career Platform

**ActuaryHub** is a comprehensive, production-ready job listing platform specifically designed for actuarial professionals. Built with modern React frontend, robust Flask backend, intelligent web scraping, and premium UI/UX design.

## 🌟 Key Features

### 🎨 **Frontend (React + Vite)**
- **Premium Design**: Modern glassmorphism effects with smooth animations
- **Fully Responsive**: Perfect experience across all devices
- **Advanced Search**: Real-time filtering by keywords, job type, location
- **Interactive UI**: Hover effects, transitions, and micro-interactions
- **Job Management**: Complete CRUD operations with intuitive forms

### 🔧 **Backend (Flask + SQLAlchemy)**
- **RESTful API**: Complete job management endpoints
- **Advanced Filtering**: Multi-parameter search and sorting
- **Database Support**: SQLite (dev) / PostgreSQL (production)
- **Error Handling**: Comprehensive error responses
- **CORS Enabled**: Cross-origin requests supported

### 🤖 **Web Scraper (Selenium)**
- **Automated Data Collection**: Scrapes jobs from ActuaryList.com
- **Smart Processing**: Extracts title, company, location, salary, skills
- **Duplicate Prevention**: Checks existing jobs before insertion
- **Fallback System**: Mock data when scraping unavailable

### 🎯 **Professional Features**
- **Company Directory**: Browse employers with job counts
- **Location Explorer**: Job markets by geographic location
- **Detailed Job Views**: Comprehensive job information
- **Real-time Statistics**: Dashboard with live job market data

## 🛠️ Technology Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Lucide Icons
- **Backend**: Flask, SQLAlchemy, Flask-CORS
- **Database**: SQLite (development) / PostgreSQL (production)
- **Scraping**: Selenium WebDriver, BeautifulSoup4
- **Deployment**: Vercel (frontend), Railway/Heroku (backend)

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- Python 3.8+
- Chrome Browser (for scraping)

### 1. Frontend Setup
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### 2. Backend Setup
```bash
# Navigate to backend
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run Flask server
python app.py
```

### 3. Web Scraper
```bash
# Run the scraper
cd backend
python run_scraper.py
```

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/jobs` | Get all jobs with filters |
| `GET` | `/api/jobs/<id>` | Get specific job |
| `POST` | `/api/jobs` | Create new job |
| `PUT` | `/api/jobs/<id>` | Update job |
| `DELETE` | `/api/jobs/<id>` | Delete job |
| `GET` | `/api/health` | Health check |

### Query Parameters
- `job_type`: Filter by type (Full-time, Part-time, Contract, Remote)
- `location`: Filter by location (partial match)
- `keyword`: Search in title, company, or tags
- `sort`: Sort results (posting_date_desc, posting_date_asc, title_asc, title_desc)

## 🌐 Deployment

### Frontend (Vercel)
1. Push code to GitHub
2. Connect repository to Vercel
3. Set build command: `npm run build`
4. Set output directory: `dist`
5. Add environment variable: `VITE_API_URL=your-backend-url`

### Backend Options

#### Option 1: Railway (Recommended)
1. Connect GitHub repository
2. Add PostgreSQL database
3. Set environment variables
4. Auto-deploy enabled

#### Option 2: Heroku
```bash
cd backend
heroku create your-app-name
heroku addons:create heroku-postgresql:hobby-dev
git push heroku main
```

## 🔧 Configuration

### Environment Variables

**Frontend (.env)**
```env
VITE_API_URL=https://your-backend-api.com/api
```

**Backend (.env)**
```env
DATABASE_URL=postgresql://username:password@host:port/database
FLASK_ENV=production
FLASK_DEBUG=False
```

## 🎮 Application Features

### 🏠 Home Dashboard
- Interactive statistics cards
- Advanced job filtering
- Beautiful job grid layout
- Floating action button for quick job creation

### 🏢 Company Directory
- Visual company profiles
- Job count per company
- Click-to-filter functionality
- Company descriptions and metrics

### 📍 Location Explorer
- Geographic job market data
- Cost of living indicators
- Market growth statistics
- Location-based filtering

### 📄 Job Details
- Comprehensive job information
- Skills and requirements breakdown
- Company information section
- Direct application links

## 🧪 Testing

### Manual Testing Checklist
- [ ] All API endpoints functional
- [ ] Frontend responsive design
- [ ] Job CRUD operations
- [ ] Search and filtering
- [ ] Navigation between pages
- [ ] Web scraper execution

## 📊 Database Schema

```sql
CREATE TABLE job (
    id INTEGER PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    company VARCHAR(200) NOT NULL,
    location VARCHAR(200) NOT NULL,
    posting_date DATE NOT NULL,
    job_type VARCHAR(50) DEFAULT 'Full-time',
    tags TEXT,  -- JSON array of skills
    description TEXT,
    salary VARCHAR(100),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## 🔮 Future Enhancements

- User authentication and profiles
- Job application tracking
- Email notifications
- Advanced analytics dashboard
- AI-powered job recommendations
- Resume matching system

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Submit Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- React team for the excellent framework
- Flask team for the lightweight backend solution
- Tailwind CSS for utility-first styling
- Lucide for beautiful icons
- ActuaryList.com for job data source

---

**ActuaryHub - Where Actuarial Careers Begin** 🎯

*Built with modern web technologies for the actuarial community*