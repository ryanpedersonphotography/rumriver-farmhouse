import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { BetaAnalyticsDataClient } from '@google-analytics/data';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize GA4 client
const analyticsDataClient = new BetaAnalyticsDataClient();
const propertyId = process.env.GA4_PROPERTY_ID || '503230001';

// Middleware
app.use(cors());
app.use(express.json());

// Helper function to format date range
const getDateRange = (days = 30) => {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);
  
  return {
    startDate: startDate.toISOString().split('T')[0],
    endDate: endDate.toISOString().split('T')[0]
  };
};

// Main analytics endpoint
app.get('/api/analytics/overview', async (req, res) => {
  try {
    const { days = 30 } = req.query;
    const dateRange = getDateRange(parseInt(days));
    
    // Run report for main metrics
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [dateRange],
      dimensions: [
        { name: 'date' }
      ],
      metrics: [
        { name: 'activeUsers' },
        { name: 'sessions' },
        { name: 'screenPageViews' },
        { name: 'averageSessionDuration' },
        { name: 'bounceRate' }
      ],
      orderBys: [
        {
          dimension: {
            dimensionName: 'date'
          }
        }
      ]
    });

    // Format the response
    const formattedData = {
      dateRange,
      summary: {
        totalUsers: 0,
        totalSessions: 0,
        totalPageViews: 0,
        avgSessionDuration: 0,
        avgBounceRate: 0
      },
      dailyData: []
    };

    if (response.rows) {
      response.rows.forEach(row => {
        const date = row.dimensionValues[0].value;
        const users = parseInt(row.metricValues[0].value);
        const sessions = parseInt(row.metricValues[1].value);
        const pageViews = parseInt(row.metricValues[2].value);
        const sessionDuration = parseFloat(row.metricValues[3].value);
        const bounceRate = parseFloat(row.metricValues[4].value);

        formattedData.summary.totalUsers += users;
        formattedData.summary.totalSessions += sessions;
        formattedData.summary.totalPageViews += pageViews;
        formattedData.summary.avgSessionDuration += sessionDuration;
        formattedData.summary.avgBounceRate += bounceRate;

        formattedData.dailyData.push({
          date,
          users,
          sessions,
          pageViews,
          sessionDuration: sessionDuration.toFixed(2),
          bounceRate: (bounceRate * 100).toFixed(2) + '%'
        });
      });

      // Calculate averages
      const dataPoints = response.rows.length;
      if (dataPoints > 0) {
        formattedData.summary.avgSessionDuration = 
          (formattedData.summary.avgSessionDuration / dataPoints).toFixed(2);
        formattedData.summary.avgBounceRate = 
          (formattedData.summary.avgBounceRate / dataPoints * 100).toFixed(2) + '%';
      }
    }

    res.json(formattedData);
  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({ error: 'Failed to fetch analytics data' });
  }
});

// Real-time users endpoint
app.get('/api/analytics/realtime', async (req, res) => {
  try {
    const [response] = await analyticsDataClient.runRealtimeReport({
      property: `properties/${propertyId}`,
      dimensions: [
        { name: 'country' },
        { name: 'deviceCategory' }
      ],
      metrics: [
        { name: 'activeUsers' }
      ]
    });

    const result = {
      totalActiveUsers: 0,
      byCountry: {},
      byDevice: {}
    };

    if (response.rows) {
      response.rows.forEach(row => {
        const country = row.dimensionValues[0].value;
        const device = row.dimensionValues[1].value;
        const users = parseInt(row.metricValues[0].value);

        result.totalActiveUsers += users;
        
        if (!result.byCountry[country]) {
          result.byCountry[country] = 0;
        }
        result.byCountry[country] += users;

        if (!result.byDevice[device]) {
          result.byDevice[device] = 0;
        }
        result.byDevice[device] += users;
      });
    }

    res.json(result);
  } catch (error) {
    console.error('Error fetching realtime data:', error);
    res.status(500).json({ error: 'Failed to fetch realtime data' });
  }
});

// Top pages endpoint
app.get('/api/analytics/top-pages', async (req, res) => {
  try {
    const { days = 30 } = req.query;
    const dateRange = getDateRange(parseInt(days));
    
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [dateRange],
      dimensions: [
        { name: 'pagePath' }
      ],
      metrics: [
        { name: 'screenPageViews' },
        { name: 'activeUsers' },
        { name: 'averageSessionDuration' }
      ],
      limit: 10,
      orderBys: [
        {
          metric: {
            metricName: 'screenPageViews'
          },
          desc: true
        }
      ]
    });

    const pages = [];
    if (response.rows) {
      response.rows.forEach(row => {
        pages.push({
          path: row.dimensionValues[0].value,
          views: parseInt(row.metricValues[0].value),
          users: parseInt(row.metricValues[1].value),
          avgDuration: parseFloat(row.metricValues[2].value).toFixed(2)
        });
      });
    }

    res.json({ pages, dateRange });
  } catch (error) {
    console.error('Error fetching top pages:', error);
    res.status(500).json({ error: 'Failed to fetch top pages' });
  }
});

// Traffic sources endpoint
app.get('/api/analytics/sources', async (req, res) => {
  try {
    const { days = 30 } = req.query;
    const dateRange = getDateRange(parseInt(days));
    
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [dateRange],
      dimensions: [
        { name: 'sessionSource' },
        { name: 'sessionMedium' }
      ],
      metrics: [
        { name: 'sessions' },
        { name: 'activeUsers' }
      ],
      limit: 10,
      orderBys: [
        {
          metric: {
            metricName: 'sessions'
          },
          desc: true
        }
      ]
    });

    const sources = [];
    if (response.rows) {
      response.rows.forEach(row => {
        sources.push({
          source: row.dimensionValues[0].value,
          medium: row.dimensionValues[1].value,
          sessions: parseInt(row.metricValues[0].value),
          users: parseInt(row.metricValues[1].value)
        });
      });
    }

    res.json({ sources, dateRange });
  } catch (error) {
    console.error('Error fetching traffic sources:', error);
    res.status(500).json({ error: 'Failed to fetch traffic sources' });
  }
});

// Device breakdown endpoint
app.get('/api/analytics/devices', async (req, res) => {
  try {
    const { days = 30 } = req.query;
    const dateRange = getDateRange(parseInt(days));
    
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [dateRange],
      dimensions: [
        { name: 'deviceCategory' }
      ],
      metrics: [
        { name: 'activeUsers' },
        { name: 'sessions' },
        { name: 'bounceRate' }
      ]
    });

    const devices = [];
    if (response.rows) {
      response.rows.forEach(row => {
        devices.push({
          device: row.dimensionValues[0].value,
          users: parseInt(row.metricValues[0].value),
          sessions: parseInt(row.metricValues[1].value),
          bounceRate: (parseFloat(row.metricValues[2].value) * 100).toFixed(2) + '%'
        });
      });
    }

    res.json({ devices, dateRange });
  } catch (error) {
    console.error('Error fetching device data:', error);
    res.status(500).json({ error: 'Failed to fetch device data' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    propertyId,
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`Analytics backend running on http://localhost:${PORT}`);
  console.log(`GA4 Property ID: ${propertyId}`);
});