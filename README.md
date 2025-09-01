# Analytics Backend for Breezy Cottage

A simple Node.js/Express backend that connects to Google Analytics 4 Data API to provide analytics data for the Breezy Point Lakeview Cottage website.

## Features

- ✅ Real-time active users tracking
- ✅ Historical analytics (7, 30, 90 days)
- ✅ Top pages and traffic sources
- ✅ Device breakdown
- ✅ Daily traffic charts
- ✅ No database required - direct GA4 API access
- ✅ Simple REST API endpoints
- ✅ Beautiful analytics dashboard

## Quick Start

### 1. Install Dependencies

```bash
cd analytics-backend
npm install
```

### 2. Enable GA4 Data API

```bash
gcloud services enable analyticsdata.googleapis.com
```

### 3. Service Account Setup

A service account has already been created: `ga4-analytics-reader@gen-lang-client-0143173401.iam.gserviceaccount.com`

The credentials are saved in `ga4-service-account.json`.

**IMPORTANT**: To grant access to GA4 property:
1. Go to [Google Analytics](https://analytics.google.com)
2. Admin → Property Access Management
3. Add the service account email with "Viewer" role

### 4. Environment Variables

The `.env` file is already configured:
```
GA4_PROPERTY_ID=503230001
GOOGLE_APPLICATION_CREDENTIALS=./ga4-service-account.json
PORT=3001
```

### 5. Run the Server

```bash
# Development with auto-reload
npm run dev

# Production
npm start
```

Server will run on http://localhost:3001

## API Endpoints

### Overview Metrics
```
GET /api/analytics/overview?days=30
```
Returns total users, sessions, page views, avg duration, bounce rate

### Real-time Users
```
GET /api/analytics/realtime
```
Returns currently active users by country and device

### Top Pages
```
GET /api/analytics/top-pages?days=30
```
Returns most viewed pages with user counts

### Traffic Sources
```
GET /api/analytics/sources?days=30
```
Returns traffic sources and mediums

### Device Breakdown
```
GET /api/analytics/devices?days=30
```
Returns users by device category

### Health Check
```
GET /api/health
```
Returns server status and property ID

## Analytics Dashboard

Open `analytics.html` in your browser to view the dashboard.

For production, update the API_BASE in the script:
```javascript
const API_BASE = 'https://your-analytics-api.com/api';
```

## Deployment Options

### Option 1: Deploy to Vercel

```bash
npm i -g vercel
vercel
```

### Option 2: Deploy to Railway

```bash
railway login
railway init
railway up
```

### Option 3: Deploy to Google Cloud Run

```bash
# Create Dockerfile
cat > Dockerfile << EOF
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3001
CMD ["node", "server.js"]
EOF

# Build and deploy
gcloud run deploy analytics-api \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

### Option 4: Run on Same Server (PM2)

```bash
npm i -g pm2
pm2 start server.js --name analytics-api
pm2 save
pm2 startup
```

## Security Notes

1. **Never commit** `ga4-service-account.json` to public repos
2. Add CORS restrictions in production
3. Consider adding API authentication for public deployments
4. Use environment variables for all sensitive data

## Troubleshooting

### "Insufficient permissions" error
- Make sure service account has "Viewer" role in GA4 property
- Check that GA4 Data API is enabled in Google Cloud

### No data showing
- Verify GA4_PROPERTY_ID matches your property
- Check that the website has traffic (GA4 needs data to report)
- Ensure date ranges are within GA4 data retention period

### CORS errors
- Update ALLOWED_ORIGINS in .env file
- For local development, use http://localhost:5173

## Cost Considerations

GA4 Data API has generous free tier:
- 25,000 requests per day
- 250,000 requests per month

This backend makes ~6 requests per dashboard load, so you can handle:
- ~4,000 dashboard views per day
- ~40,000 dashboard views per month

## Future Enhancements

- [ ] Add caching layer (Redis) to reduce API calls
- [ ] Implement user authentication
- [ ] Add custom date range selector
- [ ] Export data to CSV/PDF
- [ ] Add more detailed funnel analytics
- [ ] Implement alerts for traffic spikes/drops
- [ ] Add comparison periods (vs last week/month)

## Resources

- [GA4 Data API Documentation](https://developers.google.com/analytics/devguides/reporting/data/v1)
- [GA4 Dimensions & Metrics](https://ga-dev-tools.google/ga4/dimensions-metrics-explorer/)
- [Express.js Documentation](https://expressjs.com/)

## Support

For issues with this specific implementation, check the main project documentation or contact the developer.