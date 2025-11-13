# Deployment Guide - AI Note-Taking App

## Quick Deploy Options

### Option 1: Docker Compose (Easiest)

```bash
# Clone the repository
git clone <repository-url>
cd ai-note-taking-app

# Start all services
docker-compose up -d

# Check status
docker-compose ps

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

Access:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs

### Option 2: Deploy to Cloud Platforms

#### Frontend (Vercel) - Recommended

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Configure:
   - Framework Preset: Next.js
   - Root Directory: `frontend`
   - Environment Variables:
     ```
     NEXT_PUBLIC_API_URL=https://your-backend-url.com
     ```
6. Deploy

#### Backend (Railway/Render)

**Railway:**
1. Go to [railway.app](https://railway.app)
2. Create new project
3. Add PostgreSQL and Redis from marketplace
4. Deploy from GitHub
5. Set root directory to `backend`
6. Add environment variables from `.env.example`

**Render:**
1. Go to [render.com](https://render.com)
2. Create new Web Service
3. Connect GitHub repository
4. Configure:
   - Environment: Python 3.12
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
   - Root Directory: `backend`
5. Add PostgreSQL and Redis databases
6. Set environment variables

### Option 3: AWS Deployment

#### Frontend (AWS Amplify or S3 + CloudFront)

**Amplify:**
```bash
npm install -g @aws-amplify/cli
amplify init
amplify add hosting
amplify publish
```

**S3 + CloudFront:**
```bash
cd frontend
npm run build
aws s3 sync out/ s3://your-bucket-name
# Configure CloudFront distribution
```

#### Backend (AWS ECS or Lambda)

**ECS with Fargate:**
1. Build Docker image
2. Push to ECR
3. Create ECS task definition
4. Deploy to Fargate cluster
5. Configure RDS (PostgreSQL) and ElastiCache (Redis)

**Lambda + API Gateway:**
- Use Mangum for FastAPI on Lambda
- Deploy with AWS SAM or Serverless Framework

### Option 4: Traditional VPS (DigitalOcean, Linode, etc.)

```bash
# SSH into your server
ssh user@your-server-ip

# Install dependencies
sudo apt update
sudo apt install docker docker-compose nginx

# Clone repository
git clone <repository-url>
cd ai-note-taking-app

# Configure environment variables
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env.local
# Edit the files with your production values

# Start services
docker-compose up -d

# Configure Nginx as reverse proxy
sudo nano /etc/nginx/sites-available/notes-app

# Nginx configuration:
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /api {
        proxy_pass http://localhost:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}

# Enable site and restart Nginx
sudo ln -s /etc/nginx/sites-available/notes-app /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

# Setup SSL with Let's Encrypt
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

## Database Setup

### Managed PostgreSQL Options

1. **Supabase** (Recommended)
   - Sign up at [supabase.com](https://supabase.com)
   - Create new project
   - Get connection string
   - Update DATABASE_URL in backend/.env

2. **Neon**
   - Sign up at [neon.tech](https://neon.tech)
   - Create database
   - Copy connection string

3. **AWS RDS**
   - Create PostgreSQL RDS instance
   - Configure security groups
   - Get endpoint and credentials

4. **DigitalOcean Managed Database**
   - Create PostgreSQL cluster
   - Get connection details

### Managed Redis Options

1. **Upstash** (Recommended for serverless)
   - Sign up at [upstash.com](https://upstash.com)
   - Create Redis database
   - Get connection URL

2. **Redis Cloud**
   - Sign up at [redis.com](https://redis.com)
   - Create database
   - Get connection string

3. **AWS ElastiCache**
   - Create Redis cluster
   - Configure VPC and security

## Environment Variables

### Backend (.env)

```env
# Required
DATABASE_URL=postgresql://user:password@host:5432/dbname
REDIS_URL=redis://host:6379
SECRET_KEY=generate-a-secure-random-key

# Optional (for AI features)
OPENAI_API_KEY=sk-...
PINECONE_API_KEY=your-pinecone-key
PINECONE_ENVIRONMENT=us-west1-gcp
```

### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=https://your-backend-api.com
```

## Security Checklist

- [ ] Change SECRET_KEY to a strong random value
- [ ] Use HTTPS in production (enable SSL)
- [ ] Configure CORS properly in backend
- [ ] Set up proper database backups
- [ ] Use environment variables for all secrets
- [ ] Enable database connection pooling
- [ ] Set up monitoring and logging
- [ ] Configure rate limiting
- [ ] Use strong passwords for database
- [ ] Keep dependencies updated

## Monitoring and Maintenance

### Health Checks

```bash
# Backend health
curl https://your-api.com/health

# Check logs
docker-compose logs backend
docker-compose logs frontend
```

### Database Backups

```bash
# Backup PostgreSQL
docker exec notes-postgres pg_dump -U user notesdb > backup.sql

# Restore
docker exec -i notes-postgres psql -U user notesdb < backup.sql
```

### Updating the Application

```bash
# Pull latest changes
git pull origin main

# Rebuild and restart
docker-compose down
docker-compose build
docker-compose up -d
```

## Performance Optimization

1. **Frontend:**
   - Enable Next.js image optimization
   - Configure CDN for static assets
   - Enable caching headers

2. **Backend:**
   - Enable Redis caching
   - Use connection pooling
   - Index database queries
   - Enable gzip compression

3. **Database:**
   - Create indexes on frequently queried fields
   - Regular VACUUM and ANALYZE
   - Monitor slow queries

## Scaling Considerations

### Horizontal Scaling

1. Load balancer for backend
2. Multiple backend instances
3. Read replicas for database
4. Redis Cluster for distributed cache

### Vertical Scaling

1. Upgrade server resources
2. Optimize database queries
3. Enable caching strategies
4. Use CDN for static assets

## Cost Estimation

### Free Tier (Development)

- Frontend: Vercel (Free)
- Backend: Railway (Free $5 credit)
- Database: Supabase (Free tier)
- Redis: Upstash (Free tier)

**Total: $0/month**

### Small Production

- Frontend: Vercel ($20/month)
- Backend: Railway/Render ($7-20/month)
- Database: Managed PostgreSQL ($15-25/month)
- Redis: Managed Redis ($10/month)

**Total: ~$50-75/month**

### Medium Production

- Frontend: Vercel Pro ($20/month)
- Backend: AWS ECS ($30-50/month)
- Database: RDS ($50-100/month)
- Redis: ElastiCache ($30/month)
- Load Balancer ($20/month)

**Total: ~$150-220/month**

## Troubleshooting

### Common Issues

**Frontend can't connect to backend:**
- Check NEXT_PUBLIC_API_URL
- Verify CORS settings in backend
- Check network connectivity

**Database connection failed:**
- Verify DATABASE_URL format
- Check database is running
- Verify credentials

**Redis connection failed:**
- Check REDIS_URL
- Verify Redis is running
- Check network access

**Build failures:**
- Clear Next.js cache: `rm -rf .next`
- Clear npm cache: `npm cache clean --force`
- Reinstall dependencies: `rm -rf node_modules && npm install`

## Support

For deployment issues:
1. Check logs first
2. Review environment variables
3. Verify all services are running
4. Check network connectivity
5. Review security groups/firewall rules

For feature requests or bugs:
- Open an issue on GitHub
- Check existing documentation
- Review API documentation at `/docs`
